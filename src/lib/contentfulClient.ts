import contentful from "contentful";
import fs from "node:fs";
import path from "node:path";

if (!import.meta.env.CONTENTFUL_SPACE_ID) {
  throw new Error("Missing Contentful space id");
}

if (!import.meta.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("Missing Contentful access token");
}

const space_id = import.meta.env.CONTENTFUL_SPACE_ID as string;
const access_token = import.meta.env.CONTENTFUL_ACCESS_TOKEN as string;

export const client = contentful.createClient({
  space: space_id,
  accessToken: access_token,
});

export async function getEntries() {
  const cacheFolder = ".cache";
  const cacheName = "entries.json";
  const cacheFile = path.join(cacheFolder, cacheName);

  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder, { recursive: true });
  }

  // Check if "caching" file exists
  if (fs.existsSync(cacheFile)) {
    console.log("Using local cache");
    // Read data from file
    const raw = fs.readFileSync(cacheFile);
    return JSON.parse(raw.toString());
  } else {
    console.log("Cache not found, making API call");
    // Make API call and write to file
    const response = await client.getEntries({});
    // Write projects to "caching" file
    fs.writeFileSync(cacheFile, JSON.stringify(response));
    return response;
  }
}
