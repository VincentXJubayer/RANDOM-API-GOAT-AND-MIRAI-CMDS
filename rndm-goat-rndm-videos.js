const axios = require("axios");

module.exports = {
  config: {
    name: "rndm",
    version: "1.0",
    author: "Jubayer",
    countDown: 3,
    role: 0,
    shortDescription: { en: "Get random video" },
    longDescription: { en: "Fetch a random video by name from API" },
    category: "fun"
  },

  onStart: async function ({ message, args }) {
    const jubayerBase = "http://67.220.85.157:6051/api";
    const name = args.join(" ");

    if (!name) {
      return message.reply("[ ! ] Input Name.\nEx: -rndm jubayer");
    }

    try {
      const res = await axios.get(`${jubayerBase}?video=${encodeURIComponent(name)}`);
      const data = res.data;

      await message.reply({
        body: `☆《RANDOM VIDEO》☆\n\n🎬 ${name}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${data.total}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
        attachment: await global.utils.getStreamFromURL(data.video)
      });
    } catch (e) {
      return message.reply("❌ Error: " + e.message);
    }
  }
};
