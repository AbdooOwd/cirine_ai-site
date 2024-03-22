import { abdoo_data, core_data, personality } from "./config";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handler = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        { // the personality fix was coded on mobile btw (a galaxy F12)
          
          // The idea is giving the user data to the user role.
          // but then we also give the ai's personality in that user role and we use 'you'.
          // and then we make the ai say: "yes i shall respect those rules blah blah blah"
          role: "user",
          parts: [{ text: `${abdoo_data} You MUST respect these rules that define your personality: "${personality} ${core_data}"` }],
        },
        {
          role: "model",
          parts: [{ text: `Alright, I must then respect this personality.` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024, // haha (originally 2024)
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
