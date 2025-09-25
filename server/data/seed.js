// /server/data/seed.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import City from "../models/City.js";
import Attraction from "../models/Attraction.js";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/nihontravel";
const baseDir = path.join(process.cwd(), "data");        // when run from /server
const citiesFile = path.join(baseDir, "cities.json");
const citiesDir = path.join(baseDir, "cities");

async function connect() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB.");
}

async function importCities(citiesList, { clean = false } = {}) {
  if (!Array.isArray(citiesList)) throw new Error("cities.json must be an array");

  if (clean) {
    console.log("Cleaning cities collection...");
    await City.deleteMany({});
  }

  const cityIdMap = {};
  for (const city of citiesList) {
    const doc = await City.findOneAndUpdate(
      { name: city.name },
      { $set: { description: city.description || "", country: city.country || "Japan", lat: city.lat, lng: city.lng, images: city.images || [] } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    cityIdMap[city.name] = doc._id;
    console.log(`Upserted city: ${city.name} (${doc._id})`);
  }
  return cityIdMap;
}

async function importAttractions(cityIdMap, { clean = false } = {}) {
  if (clean) {
    console.log("Cleaning attractions collection...");
    await Attraction.deleteMany({});
  }

  const files = fs.existsSync(citiesDir) ? fs.readdirSync(citiesDir).filter(f => f.endsWith(".json")) : [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(citiesDir, file), "utf-8");
    const payload = JSON.parse(raw);

    const cityName = payload.city;
    const cityId = cityIdMap[cityName];
    if (!cityId) {
      console.warn(`Skipping ${file}: city "${cityName}" not found in DB.`);
      continue;
    }

    const items = (payload.attractions || []).map(a => ({
      ...a,
      city: cityId,
      open: a.open || "09:00",
      close: a.close || "17:00",
      duration: typeof a.duration === "number" ? a.duration : 60,
      area: a.area || "",
      entryFee: a.entryFee != null ? a.entryFee : 0,
      tags: a.tags || [],
      images: a.images || []
    }));

    if (items.length === 0) {
      console.log(`${file} has no attractions, skipping.`);
      continue;
    }

    try {
      // Use bulkWrite upsert to avoid duplicates and be idempotent
      const ops = items.map(it => ({
        updateOne: {
          filter: { city: it.city, name: it.name },
          update: { $set: it },
          upsert: true
        }
      }));
      const res = await Attraction.bulkWrite(ops, { ordered: false });
      console.log(`Processed ${file} → upserted/modified. bulkWrite result:`, { matchedCount: res.matchedCount, upsertedCount: res.upsertedCount || 0 });
    } catch (err) {
      console.error(`Error bulk writing attractions for ${file}:`, err.message || err);
    }
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const clean = argv.includes("--clean");
  const onlyCities = argv.includes("--only-cities");
  const onlyAttractions = argv.includes("--only-attractions");

  try {
    await connect();
    const citiesList = JSON.parse(fs.readFileSync(citiesFile, "utf-8"));
    let cityIdMap = {};

    if (!onlyAttractions) {
      cityIdMap = await importCities(citiesList, { clean });
    } else {
      // build map from existing DB cities
      const dbCities = await City.find({});
      for (const c of dbCities) cityIdMap[c.name] = c._id;
    }

    if (!onlyCities) {
      await importAttractions(cityIdMap, { clean });
    }

    console.log("Seeding completed.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}
main()
