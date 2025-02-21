const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/:username/aiagent/datacatalog/slack", async (req, res) => {
  try {
    // ✅ Extract Slack credentials from request body
    const { slackWebhookUrl } = req.body; // Webhook URL should be passed in the request body

    if (!slackWebhookUrl) {
      return res.status(400).json({ error: "Slack Webhook URL is required!" });
    }

    console.log(`✅ Using Slack Webhook: ${slackWebhookUrl}`);

    // ✅ Block Kit Message
    const slackMessage = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Lakefront AI after commenting update*"
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🚀 *Status:* The AI agent has been updated successfully!"
          }
        }
      ]
    };

    // ✅ Send cURL request using Axios
    const response = await axios.post(slackWebhookUrl, slackMessage, {
      headers: { "Content-Type": "application/json" }
    });

    console.log(`✅ Slack Response: ${response.status} ${response.statusText}`);

    return res.status(200).json({
      message: "Message sent to Slack successfully!",
      slackResponse: response.data
    });

  } catch (error) {
    console.error("❌ Error sending message to Slack:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
