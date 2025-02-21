const generateSlackModal = (trigger_id) => {
    return {
      trigger_id: trigger_id,
      view: {
        type: "modal",
        callback_id: "ai_modal_submission",
        title: {
          type: "plain_text",
          text: "Lakefront AI Modal"
        },
        blocks: [
          generateDatePickerBlock("actionId-0"),
          generateDatePickerBlock("actionId-1"),
          generateDropdownBlock("Experiment Name", "experiment_select"),
          generateDropdownBlock("Region", "region_select"),
          generateDropdownBlock("Country", "country_select"),
          generateSubmitButtonBlock("submit_experiment")
        ]
      }
    };
  };
  
  const generateDatePickerBlock = (action_id) => ({
    type: "actions",
    elements: [
      {
        type: "datepicker",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true
        },
        action_id: action_id
      }
    ]
  });
  
  const generateDropdownBlock = (label, action_id) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: label
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
        emoji: true
      },
      options: [
        generateDropdownOption("Option 0", "value-0"),
        generateDropdownOption("Option 1", "value-1"),
        generateDropdownOption("Option 2", "value-2")
      ],
      action_id: action_id
    }
  });
  
  const generateDropdownOption = (text, value) => ({
    text: {
      type: "plain_text",
      text: text,
      emoji: true
    },
    value: value
  });
  
  const generateSubmitButtonBlock = (action_id) => ({
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Submit",
          emoji: true
        },
        value: "experiment_result",
        action_id: action_id
      }
    ]
  });
  
  module.exports = { generateSlackModal };
  