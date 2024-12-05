import { GoogleSpreadsheet } from "google-spreadsheet";
import env from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require("./secrets.json");

export async function init() {
  env.config();
  const doc = new GoogleSpreadsheet(process.env.GS_ID);
  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key,
  });
  await doc.loadInfo();

  return doc;
}
