import { useState, useRef, useEffect } from "react";
import "./App.css";

const contactsData = [
  { id: 1, name: "Pavan Sir", lastMsg: "Code completed?", online: true },
  { id: 2, name: "Rahul", lastMsg: "npm install done", online: true },
  { id: 3, name: "Sneha", lastMsg: "Send me App.jsx", online: false },
  { id: 4, name: "College Group", lastMsg: "Tomorrow class?", online: false },
];

const initialMessages = {
  1: [
    { id: 1, text: "Hi Sir, chat-app started?", from: "them" },
    { id: 2, text: "Yes, starting problem solved!", from: "me" },
  ],
  2: [{ id: 1, text: "Bro, npm error fixed?", from: "them" }],
  3: [{ id: 1, text: "Hey, share code", from: "them" }],
  4: [{ id: 1, text: "Everyone submit project", from: "them" }],
};

export default function App() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, from: "me" };
    setMessages({
      ...messages,
      [selectedChat]: [...(messages[selectedChat] || []), newMsg],
    });
    setInput("");

    // Auto reply after 1 sec
    setTimeout(() => {
      const reply = { id: Date.now() + 1, text: "Got it! Nice chat app 👍", from: "them" };
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), reply],
      }));
    }, 1000);
  };

  const currentContact = contactsData.find(c => c.id === selectedChat);

  return (
    <div className="whatsapp-container">
      <div className="sidebar">
        <div className="sidebar-header">WhatsApp Chat</div>
        {contactsData.map(contact => (
          <div
            key={contact.id}
            className={`contact ${selectedChat === contact.id ? "active" : ""}`}
            onClick={() => setSelectedChat(contact.id)}
          >
            <div className="avatar">{contact.name[0]}</div>
            <div className="contact-info">
              <b>{contact.name}</b>
              <span>{contact.lastMsg}</span>
            </div>
            {contact.online && <div className="dot"></div>}
          </div>
        ))}
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <div className="avatar">{currentContact.name[0]}</div>
          <div>
            <b>{currentContact.name}</b>
            <p>{currentContact.online ? "online" : "offline"}</p>
          </div>
        </div>

        <div className="chat-messages">
          {(messages[selectedChat] || []).map(m => (
            <div key={m.id} className={`msg ${m.from}`}>
              {m.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}