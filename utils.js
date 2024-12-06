import { chromium } from "@playwright/test";
import * as fs from "fs";
import env from "dotenv";
import { init } from "./google-spread-sheet/utils.js";

export async function getAllData() {
  env.config();
  const array = [];

  const browser = await chromium.launch(); // 実行中の処理を見たい場合は`launch({headless: false})`に設定
  const page = await browser.newPage();
  await page.goto(process.env.URL + "/card-search/");

  async function getPageData(pageNum) {
    console.log(`${pageNum}ページのデータを取得します！`);

    const datas = await page.locator(".SearchResultList-box img").all(); // 取得したい要素にidやclassがない場合はxpathを使う

    for (const data of datas) {
      const name = await data.getAttribute("alt");
      const src = process.env.URL + (await data.getAttribute("data-src"));
      array.push({ name, src });
    }
  }

  let currentPage = 1;

  while (currentPage < 4) {
    await getPageData(currentPage);
    const nextBtn = page.locator(".nextButton");
    await nextBtn.click();
    await page.waitForLoadState("networkidle");
    currentPage++;
  }

  await browser.close();

  // fs.writeFileSync(process.env.OUTPUT_FILE, JSON.stringify(array));

  return array;
}

export async function addDataToSpreadsheet() {
  const data = await getAllData();
  const doc = await init();
  const sheet = doc.sheetsByTitle["pokemon"];
  await sheet.addRows(data);
}
