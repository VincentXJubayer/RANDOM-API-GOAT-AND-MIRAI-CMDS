const axios = require("axios");

module.exports.config = {
  name: "add",
  version: "1.0",
  hasPermission: 0,
  credits: "Jubayer", // please don't change my credit :)
  description: "Add video to API",
  commandCategory: "fun",
  usages: "Reply to a video then type: add <name>",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const jubayerBase = "http://67.220.85.157:6051/api";

  if (!event.messageReply || !event.messageReply.attachment) {
    return api.sendMessage(
      "[!] Please reply to a video to add it! Usage: Reply to a video then type -add <name>",
      event.threadID,
      event.messageID
    );
  }

  const attachment = event.messageReply.attachment;

  if (attachment.type !== "video") {
    return api.sendMessage(
      "❌ Only video files are supported. Please reply to a video.",
      event.threadID,
      event.messageID
    );
  }

  const name = args.join(" ");
  if (!name) {
    return api.sendMessage(
      "[!] Please provide a name.\n-add jubayer",
      event.threadID,
      event.messageID
    );
  }

  const url = attachment.url;
  const addedBy = event.senderID;

  try {
    const res = await axios.post(`${jubayerBase}?upload=${encodeURIComponent(name)}`, {
      url,
      addedBy
    });

    const data = res.data;
    return api.sendMessage(
      `📩MESSAGE: Video uploaded successfully\n📛NAME: ${data.name}\n🖇URL: ${data.url}`,
      event.threadID,
      event.messageID
    );
  } catch (e) {
    return api.sendMessage(
      `❌ Failed to upload video: ${e.message}`,
      event.threadID,
      event.messageID
    );
  }
};
