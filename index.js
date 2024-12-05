import { chromium } from "@playwright/test";

(async () => {
  const url = "https://www.pokemon-card.com";
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url + "/card-search/");

  async function getData(pageNum) {
    console.log(`${pageNum}ページのデータを取得します！`);
    await page.waitForLoadState("networkidle");
    const datas = await page.locator(".SearchResultList-box img").all(); // 取得したい要素にidやclassがない場合はxpathを使う

    for (const data of datas) {
      const alt = await data.getAttribute("alt");
      const src = url + (await data.getAttribute("data-src"));
      console.log({ alt, src });
    }
  }

  let currentPage = 1;
  await getData(1);

  while (true) {
    const nextBtn = page.locator(".nextButton");
    if (currentPage > 3) {
      break;
    }
    await nextBtn.click();
    currentPage++;
    await getData(currentPage);
  }

  await browser.close();
})();
