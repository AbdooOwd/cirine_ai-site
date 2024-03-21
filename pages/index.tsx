import { useState } from "react";
import Head from "next/head";

const Home = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [prompt, setPrompt] = useState(""); // State to store user input

  const generateText = async () => {
    try {
      setGeneratedText("Typing...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Send user input as JSON in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedText(data.text);
      } else {
        setGeneratedText(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setGeneratedText(`An error occured!\nError: ${error}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setPrompt("");
      generateText();
    }
  };

  return (
    <div>
      <Head>
        <title>Cirine AI By AbdooOwd</title>
      </Head>

      <div className="whole">
        <h1>
          Cirine AI <span style={{ fontSize: "0.7rem" }}>By AbdooOwd</span>
        </h1>
        <div className="generated-text">{generatedText}</div>
        <div id="chatting">
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Chat..."
            required
          />
          <button onClick={generateText}>Generate Text</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
