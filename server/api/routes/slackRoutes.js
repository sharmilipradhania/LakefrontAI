const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/:username/aiagent/datacatalog/slack", async (req, res) => {
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

module.exports = router;
