import Replicate from "replicate";
import { abdoo_data, core_data, personality } from "./config";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handler = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: abdoo_data }],
        },
        {
          role: "model",
          parts: [{ text: `${personality} ${core_data}` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2024, // haha
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const output = response.text();
    console.log(output);

    return res.status(200).json({ text: output });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
