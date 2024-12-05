import { init } from "./utils.js";

(async () => {
  const doc = await init();

  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells("A1:C5"); // 編集する範囲を指定

  const a1 = sheet.getCell(0, 0); // (行, 列)
  const b2 = sheet.getCellByA1("B2");
  const a5 = sheet.getCell(4, 0);

  a1.value = 100;
  a5.value = "=sum(A1:A4)";

  console.log(a5.textFormat);

  await sheet.saveUpdatedCells();
})();
