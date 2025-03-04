import axios from "axios";

const API_KEY = "your_api_key_here"; 
const BASE_URL = "https://api.echogpt.live/";

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chat`,
      { prompt: message },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
