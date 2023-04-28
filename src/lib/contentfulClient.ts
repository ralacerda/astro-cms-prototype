import contentful from "contentful";

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

export const getEntries = async () => {
  console.log("Fazendo a Query");
  const query = await client.getEntries({});
  return query;
};
