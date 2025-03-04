import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="h-80 overflow-y-auto p-2 border border-gray-700 rounded-lg">
        {messages.map((msg, index) => (
          <p key={index} className={`p-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 text-black rounded-l-lg"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 p-2 rounded-r-lg">Send</button>
      </div>
    </div>
  );
}
