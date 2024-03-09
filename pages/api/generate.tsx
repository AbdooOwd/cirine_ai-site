import Replicate from "replicate";
import { base_prompt } from "./config";

const handler = async (req, res) => {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const { prompt } = req.body;

    const output = await replicate.run(
      // This model is cool :ok_hand:
      "lucataco/dolphin-2.2.1-mistral-7b:0521a0090543fea1a687a871870e8f475d6581a3e6e284e32a2579cfb4433ecf",
      {
        input: {
          top_k: 50,
          top_p: 0.95,
          prompt: prompt, // The user's prompt
          temperature: 0.8,
          max_new_tokens: 1024,
          prompt_template: base_prompt, // The... AI's brain?
          presence_penalty: 0,
          frequency_penalty: 0,
        },
      },
    );

    if (Array.isArray(output) && output.length > 0) {
      const fullText = output.join(""); // Put thing into one string
      return res.status(200).json({ text: fullText });
    } else {
      return res.status(200).json({ error: "No choices available" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
