const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { generateSlackModal } = require("./slackModalHelper");

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
router.post("/:username/aiagent/datacatalog/slackFormData", async (req, res) => {
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

// ✅ Route to handle Slack interactions & open a modal
router.post("/:username/aiagent/datacatalog/slackExperiment", async (req, res) => {
  try {
    const { trigger_id } = req.body;

    if (!trigger_id) {
      return res.status(400).json({ error: "trigger_id is required for interactive modals!" });
    }

    console.log("✅ Received Slack interaction with trigger_id:", trigger_id);

    const modalRequest = generateSlackModal(trigger_id);

    // ✅ Call Slack API to Open a Modal
    const slackToken = "xoxb-8414593201270-8420243535637-7Aor6CE3dGlJV6KBMAl55XCO"; // Replace with your bot token

    const slackResponse = await axios.post("https://slack.com/api/views.open", modalRequest, {
      headers: {
        Authorization: `Bearer ${slackToken}`,
        "Content-Type": "application/json"
      }
    });

    console.log("✅ Modal Open Response:", slackResponse.data);
    res.status(200).json({ message: "Modal opened successfully!" });

  } catch (error) {
    console.error("❌ Error handling Slack interaction:", error.response?.data || error.message);
    res.status(500).send("Internal server error");
  }
});


router.post("/slack/interactions", async (req, res) => {
  try {
    const payload = JSON.parse(req.body.payload);
    console.log("✅ Received modal submission:", payload);

    // ✅ Extract Slack data from request
//    const {  response_url } = req.body.payload; // Extract Slack's response_url
    const response_url = 'https://hooks.slack.com/services/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';
    console.log("✅ Response Url:", response_url);
    if (payload.type === "view_submission") {
      const selectedExperiment = payload.view.state.values.experiment_select.selected_option.value;
      const selectedRegion = payload.view.state.values.region_select.selected_option.value;
      const selectedCountry = payload.view.state.values.country_select.selected_option.value;
      const selectedDate1 = payload.view.state.values["actionId-0"].datepicker_action.selected_date;
      const selectedDate2 = payload.view.state.values["actionId-1"].datepicker_action.selected_date;

      console.log(`📝 Submitted: Experiment=${selectedExperiment}, Region=${selectedRegion}, Country=${selectedCountry}, Dates: ${selectedDate1}, ${selectedDate2}`);

      // ✅ Respond to Slack IMMEDIATELY to prevent timeout
      res.status(200).json({ response_action: "clear" });

      // ✅ (Optional) Send a follow-up message
      const followUpMessage = {
        response_type: "in_channel",
        text: `🌍 Experiment: *${selectedExperiment}*, Region: *${selectedRegion}*, Country: *${selectedCountry}*, Dates: *${selectedDate1}* & *${selectedDate2}*`
      };

      await axios.post(response_url, followUpMessage, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("✅ Follow-up message sent successfully!");
    } else {
      res.status(400).json({ error: "Invalid interaction type" });
    }
  } catch (error) {
    console.error("❌ Error handling modal submission:", error);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;