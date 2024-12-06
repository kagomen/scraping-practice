import cron from "node-cron";

cron.schedule("* * * * * *", () => console.log("毎秒実行"));
cron.schedule("*/3 * * * * *", () => console.log("3秒毎に実行"));
cron.schedule("* * * * *", () => console.log("毎分実行"));
cron.schedule("0 9,18 * * *", () => console.log("毎日9時と18時に実行"));
