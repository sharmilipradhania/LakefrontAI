const { WebClient } = require("@slack/web-api");

class SlackService {
  constructor(slackBotToken, slackChannel) {
    if (!slackBotToken || !slackChannel) {
      throw new Error("❌ Missing Slack credentials! Ensure SLACK_BOT_TOKEN and SLACK_CHANNEL_ID are set.");
    }

    this.slackBotToken = slackBotToken;
    this.slackChannel = slackChannel;
    this.slackClient = new WebClient(this.slackBotToken);

    console.log(`✅ SlackService initialized for Channel: ${this.slackChannel}`);
  }

  async sendMessage(text) {
    try {
      console.log(`✅ Sending message to Channel ID: ${this.slackChannel}`);

      const response = await this.slackClient.chat.postMessage({
        channel: this.slackChannel,
        text: text || "This is LakeFrontAI's new message",
      });

      console.log(`✅ Message sent! Timestamp: ${response.ts}`);
      await this.slackClient.reactions.add({
        channel: this.slackChannel,
        name: "eyes", // 👀 Reaction triggers UI refresh
        timestamp: response.ts,
      });

      return response.ts;
    } catch (error) {
      console.error("❌ Error sending Slack message:", error);
      throw new Error("Failed to send Slack message");
    }
  }

  async updateMessage(ts, newText) {
    try {
      console.log(`✅ Updating message with Timestamp: ${ts}`);

      const response = await this.slackClient.chat.update({
        channel: this.slackChannel,
        ts: ts,
        text: newText || "Updated message from LakeFrontAI!",
      });

      console.log("✅ Message successfully updated in Slack!");
      return "Message updated successfully!";
    } catch (error) {
      console.error("❌ Error updating Slack message:", error);
      throw new Error("Failed to update Slack message");
    }
  }
}

module.exports = SlackService;