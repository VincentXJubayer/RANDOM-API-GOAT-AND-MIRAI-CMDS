const axios = require("axios");

module.exports = {
  config: {
    name: "add",
    version: "1.0",
    author: "Jubayer",
    countDown: 3,
    role: 0,
    shortDescription: { en: "Add video to API" },
    longDescription: { en: "Upload only videos to the API with a name" },
    category: "fun"
  },

  onStart: async function ({ message, args, event }) {
    const jubayerBase = "http://67.220.85.157:6051/api";

    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return message.reply("⚠️ Please reply to a video to add it!Invalid number of arguments. Usage: Reply to 1 video then type -add your name");
    }

    const attachment = event.messageReply.attachments[0];

    if (attachment.type !== "video") {
      return message.reply("❌ Only video files are supported. Please reply to a video.");
    }

    const name = args.join(" ");
    if (!name) return message.reply("⚠️ Please provide a name.");

    const url = attachment.url;
    const addedBy = event.senderID;

    try {
      const res = await axios.post(`${jubayerBase}?upload=${encodeURIComponent(name)}`, {
        url,
        addedBy
      });

      const data = res.data;
      return message.reply(
        `📩MESSAGE: Video uploaded successfully\n📛NAME: ${data.name}\n🖇URL: ${data.url}`
      );
    } catch (e) {
      return message.reply("❌ Failed to upload video: " + e.message);
    }
  }
};
