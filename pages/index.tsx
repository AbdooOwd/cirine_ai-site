import { useState } from "react";
import Head from "next/head";

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState(""); // State to store user input
  const [resState, setResState] = useState(false);

  const generateText = async () => {
    try {
      console.log("Typing...");
      setResState(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Send user input as JSON in the request body
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`> User: ${prompt}\n> Cirine: ${data.text}`);
        setMessages([...messages, prompt, data.text]);
      } else {
        setMessages([...messages, `Error: ${data.error}`]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages([...messages, `An error occured!\n Error: ${error}`]);
    }

    setResState(false);
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
        {resState && (
          <div className="leLoading">
            <div className="realLoading"></div>
          </div>
        )}
        <div id="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${index % 2 === 0 ? "bot-msg" : "user-msg"}`}
            >
              {message}
            </div>
          ))}
        </div>
        <div id="chatting">
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Chat..."
            autoComplete="off"
            required
          />
          <button onClick={generateText}>Generate Text</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
