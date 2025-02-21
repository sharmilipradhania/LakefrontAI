const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// ✅ Route for handling Slack messages
router.post("/:username/aiagent/datacatalog/slackMessage", async (req, res) => {
  try {
    // ✅ Extract Slack data from request
    const { user_name, text, response_url } = req.body; // Extract Slack's response_url

    if (!response_url) {
      return res.status(400).json({ error: "Invalid Slack request: response_url missing" });
    }

    console.log(`✅ Received data from Slack`);
    console.log(`👤 User: ${user_name}`);
    console.log(`💬 Message: ${text}`);
    console.log(`🔗 Response URL: ${response_url}`);

    // ✅ Create a Block Kit message response
    const slackResponse = {
      response_type: "in_channel", // Make response visible to all users
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `👋 *Hello, ${user_name}!*`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `💡 *You said:* "${text}"`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🚀 *Lakefront AI is processing your request...*`
          }
        }
      ]
    };

    // ✅ Send response back to Slack using response_url
    const slackPostResponse = await axios.post(response_url, slackResponse, {
      headers: { "Content-Type": "application/json" }
    });

    console.log(`✅ Slack Response Status: ${slackPostResponse.status} ${slackPostResponse.statusText}`);

    return res.status(200).json({
      message: "Response sent back to Slack successfully!",
      slackResponse: slackPostResponse.data
    });

  } catch (error) {
    console.error("❌ Error sending response to Slack:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Route for handling Slack form data
router.post("/:username/:email/aiagent/datacatalog/slackFormData", async (req, res) => {
  try {
    // ✅ Extract form data sent from Slack
    const { user_name, text, response_url, channel_id, team_id } = req.body;

    if (!response_url) {
      return res.status(400).json({ error: "Slack Webhook URL is required!" });
    }

    console.log("✅ Received Form Data from Slack:");
    console.log(`👤 User: ${user_name}`);
    console.log(`💬 Text: ${text}`);
    console.log(`📡 Channel ID: ${channel_id}`);
    console.log(`🏢 Team ID: ${team_id}`);
    console.log(`🔗 Response URL: ${response_url}`);

    // ✅ Send immediate acknowledgment response
    res.status(200).send("Received your request, processing...");

    // ✅ Send a follow-up message using response_url
    const slackFollowUpMessage = {
      response_type: "in_channel",
      text: `Hello *${user_name}*! 🚀 You said: "${text}"`,
    };

    await axios.post(response_url, slackFollowUpMessage, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Follow-up message sent to Slack successfully!");

  } catch (error) {
    console.error("❌ Error handling Slack form data:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
