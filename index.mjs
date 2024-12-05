import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.pokemon-card.com/card-search/index.php?keyword=&se_ta=&regulation_sidebar_form=XY&pg=&illust=&sm_and_keyword=true"
  );

  const images = await page.locator(".SearchResultList-box img").all(); // 取得したい要素にidやclassがない場合はxpathを使う
  for (const image of images) {
    const alt = await image.getAttribute("alt");
    const src = `https://www.pokemon-card.com${await image.getAttribute(
      "data-src"
    )}`;
    console.log({ alt, src });
  }

  await browser.close();
})();
