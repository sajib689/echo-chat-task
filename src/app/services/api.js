import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_ECHOGPT_API_KEY; // Make sure this is in .env.local

const BASE_URL = "https://api.echogpt.live/v1/chat/completions"; // Correct API endpoint

export const sendMessageToAI = async (messages) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: "EchoGPT", // You can change this to "EchoGPT" if needed
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("EchoGPT API Error:", error.response?.data || error.message);
    throw error;
  }
};
