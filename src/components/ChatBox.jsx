"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessageToAI } from "../app/services/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference to scroll to the latest message
  const messageEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const newUserMessage = { role: "user", content: input };

    let updatedMessages = [...messages, newUserMessage];

    // If it's the first message, prepend the system message.
    if (messages.length === 0) {
      updatedMessages = [
        { role: "system", content: "You are a helpful assistant." },
        ...updatedMessages,
      ];
    }

    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToAI(updatedMessages);
      if (aiResponse) {
        const botMessage = { role: "bot", content: aiResponse.choices[0].message.content };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      console.error(err); // Log the error to help with debugging
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="h-full flex w-full container mx-auto mt-2">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-100 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-700">EchoGPT</h2>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4">New Chat</button>
          <nav className="mt-6 space-y-3">
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>📜</span>
              <span>History</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>🛒</span>
              <span>Store</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>🔲</span>
              <span>AI Tasks</span>
            </a>
          </nav>

          <div className="mt-6 border-t pt-4 space-y-3">
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>🛠️</span>
              <span>Support</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>💳</span>
              <span>Subscriptions</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>⚙️</span>
              <span>API Platform</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700">
              <span>💬</span>
              <span>Discord</span>
            </a>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-sm">Unlock Pro Features</p>
          <p className="text-xs text-gray-500">With statistics on your shot & profile performance available to Pros</p>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg mt-2">Upgrade to Pro</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">⚛️</span>
            </div>
            <h1 className="text-2xl font-bold mt-2">EchoGPT</h1>
            <p className="text-gray-600 max-w-md mx-auto mt-1">
              Interact with EchoGPT, an AI that reflects your input for quick ideas, summaries, or feedback.
            </p>
          </div>
        </div>

        {/* Message Area */}
        <div className="mt-4 space-y-2 flex-1 overflow-y-auto px-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              <strong>{msg.role === "user" ? "You: " : "EchoGPT: "}</strong>
              {msg.content}
            </div>
          ))}
          <div ref={messageEndRef} /> {/* Scroll reference */}
        </div>

        {/* Chat Input Area */}
        <div className="w-full border-t p-4">
          <div className="max-w-3xl mx-auto flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
            <span className="text-purple-500">⚛️</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white py-1 px-4 rounded-lg"
            >
              Send
            </button>
          </div>

          {loading && <p className="text-center text-gray-500 mt-2">AI is typing...</p>}
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </div>
      </main>
    </div>
  );
}
