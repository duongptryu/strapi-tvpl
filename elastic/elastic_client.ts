import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import path from "path";

let client: Client | null = null;

function initializeESClient(): void {
  try {
    client = new Client({
      node: process.env.ELASTIC_HOST || "",
      auth: {
        username: process.env.ELASTIC_USERNAME || "",
        password: process.env.ELASTIC_PASSWORD || "",
      },
      tls: {
        ca: fs.readFileSync(
          path.join(__dirname, process.env.ELASTIC_CERT_NAME || "")
        ),
        rejectUnauthorized: false,
      },
    });
  } catch (err) {
    console.log("Error while initializing the connection to ElasticSearch.");
    console.log(err);
  }
}

async function indexData(
  itemId: Number,
  title: String,
  content: String,
  originId: String
): Promise<void> {
  try {
    await client.index({
      index: process.env.ELASTIC_INDEX_NAME,

    });

    await client.indices.refresh({ index: iName });
  } catch (err) {
    console.log("Error encountered while indexing data to ElasticSearch.");
    console.log(err);
    throw err;
  }
}

export { initializeESClient };
