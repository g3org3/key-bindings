import React, { useState } from "react";
import { createOnKeyDownBinding } from "key-bidings";

export default () => {
  const { inputProps, addToChat, messages } = useChat();
  const onKeyDown = createOnKeyDownBinding({
    "*-Enter": e => {
      e.preventDefault();
      console.log("saving...");
      addToChat();
    }
  });

  return (
    <div className="container">
      <h4>chatroom 👨🏻‍💻</h4>
      <textarea
        className="form-control"
        onKeyDown={onKeyDown}
        {...inputProps}
      />
      {!messages.length && (
        <p class="empty">press cmd-enter or ctrl-enter to add a message</p>
      )}
      {messages.map(message => (
        <pre className="message">{message}</pre>
      ))}
    </div>
  );
};

// --------------------------------------------
function useChat() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const inputProps = {
    value: message,
    onChange: e => setMessage(e.target.value)
  };
  const addToChat = () => {
    setHistory([message, ...history]);
    setMessage("");
  };
  return { inputProps, addToChat, messages: history };
}
