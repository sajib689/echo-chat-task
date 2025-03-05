

import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_ECHOGPT_API_KEY; // Store in .env file
const BASE_URL = "https://api.echogpt.live/v1/chat/completions";

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        model: "EchoGPT", // Verify the model name
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return null;
  }
};
