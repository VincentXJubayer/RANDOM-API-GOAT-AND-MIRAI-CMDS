const axios = require("axios");

module.exports.config = {
  name: "rndm",
  version: "1.0",
  hasPermission: 0,
  credits: "Jubayer", // please Change my credit :)
  description: "Fetch a random video by name from API",
  commandCategory: "fun",
  usages: "rndm <name>",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const jubayerBase = "http://67.220.85.157:6051/api";
  const name = args.join(" ");

  if (!name) {
    return api.sendMessage(
      "[ ! ] Input Name.\nEx: rndm jubayer",
      event.threadID,
      event.messageID
    );
  }

  try {
    const res = await axios.get(`${jubayerBase}?video=${encodeURIComponent(name)}`);
    const data = res.data;

    return api.sendMessage(
      {
        body: `☆《RANDOM VIDEO》☆\n\n🎬 ${name}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${data.total}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
        attachment: await global.utils.getStreamFromURL(data.video)
      },
      event.threadID,
      event.messageID
    );
  } catch (e) {
    return api.sendMessage(
      `❌ Error: ${e.message}`,
      event.threadID,
      event.messageID
    );
  }
};
