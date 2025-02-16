const express = require("express");
const SlackService = require("../services/slackService");

const router = express.Router();

router.post("/:username/aiagent/datacatalog/slack", async (req, res) => {
  try {
    // ✅ Extract Slack credentials from `req`
    const { slackBotToken, slackChannel } = req;

    console.log(`✅ Using Slack Token: ${slackBotToken}`);
    console.log(`✅ Sending to Slack Channel: ${slackChannel}`);

    const slackService = new SlackService(slackBotToken, slackChannel);

    // ✅ Send the message and capture the timestamp (`ts`)
    const messageTS = await slackService.sendMessage("Lakefront AI after commenting update");

    console.log(`✅ Message Sent with Timestamp: ${messageTS}`);

    // ✅ Wait 5 seconds and then update the message using `ts`
//    setTimeout(async () => {
//      try {
 //       const updateResponse = await slackService.updateMessage(messageTS, "Updated: Lakefront AI!");
//        console.log(`✅ Message updated: ${updateResponse}`);
//      } catch (updateError) {
//        console.error("❌ Failed to update message:", updateError);
//      }
//    }, 5000);

    return res.status(200).json({
      message: "Message sent and will be updated in Slack!",
      timestamp: messageTS,
    });

  } catch (error) {
    console.error("❌ Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Ensure router is properly exported
module.exports = router;