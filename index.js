import { init } from "./google-spread-sheet/utils.js";
import { getData } from "./utils.js";

(async () => {
  const data = await getData();
  const doc = await init();
  const sheet = doc.sheetsByTitle["pokemon"];
  await sheet.addRows(data);
})();
