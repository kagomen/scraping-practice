import cron from "node-cron";
import { addDataToSpreadsheet } from "../utils.js";
import { sendMail } from "../mailer/utils.js";

// cron.schedule("38 3 * * *", async () => {
//   main();
// });

main();

async function main() {
  const date = new Date().toDateString();

  try {
    await addDataToSpreadsheet();
    await sendMail(
      "処理が完了しました",
      `処理時刻：${date}\n${process.env.GS_URL}`
    );
  } catch (e) {
    await sendMail("エラーが発生しました", `エラー発生時刻：${date}\n${e}`);
  }
}
