import { init } from "./utils.js";

(async () => {
  const doc = await init();
  // await doc.addSheet({ title: "pokemon", headerValues: ["name", "src"] });

  const sheet = doc.sheetsByTitle["pokemon"];
  const rows = await sheet.addRows([
    {
      name: "スボミー",
      src: "https://www.pokemon.com",
    },
    {
      name: "ギラティナ",
      src: "https://www.pokemon.com",
    },
    {
      name: "ドラパルト",
      src: "https://www.pokemon.com",
    },
  ]);

  // row.save();
})();
