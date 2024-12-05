import { chromium } from "@playwright/test";
import * as fs from "fs";
import env from "dotenv";

export async function getData() {
  env.config();
  const array = [];

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.URL + "/card-search/");

  async function getData(pageNum) {
    console.log(`${pageNum}ページのデータを取得します！`);
    await page.waitForLoadState("networkidle");
    const datas = await page.locator(".SearchResultList-box img").all(); // 取得したい要素にidやclassがない場合はxpathを使う

    for (const data of datas) {
      const name = await data.getAttribute("alt");
      const src = process.env.URL + (await data.getAttribute("data-src"));
      array.push({ name, src });
    }
  }

  let currentPage = 1;
  await getData(1);

  while (true) {
    const nextBtn = page.locator(".nextButton");
    if (currentPage > 2) {
      break;
    }
    await nextBtn.click();
    currentPage++;
    await getData(currentPage);
  }

  await browser.close();

  // fs.writeFileSync(process.env.OUTPUT_FILE, JSON.stringify(array));

  return array;
}
