import React, { useState, useEffect, useRef } from "react";
import ChatList from "../components/ChatList";
import { useAuth } from "../components/AuthProvider";

const Chatroom = () => {
  //const [ws, setWs] = useState(null);
  const ws = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;

  const getMessages = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/messages/?room_id=${2}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ApiAuthorization: process.env.REACT_APP_API_KEY,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  const sendMessage = () => {
    /* const messageData = { message, sender: user.customer.email };
    ws.send(JSON.stringify(messageData)); */
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = { message, sender: user.customer.email };
      ws.current.send(JSON.stringify(messageData));
      setMessage(""); // Clear the input after sending
    } else {
      console.error("WebSocket is not open");
    }
  };

  const connectWebSocket = () => {
    if (ws.current) {
      return; // Prevent multiple WebSocket connections
    }

    ws.current = new WebSocket(
      `ws://localhost:8000/ws/chat/2/${user.customer.email}`,
    );

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket closed", e);
      ws.current = null; // Reset WebSocket instance on close
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const timeout = Math.min(
          1000 * Math.pow(2, reconnectAttempts.current),
          30000,
        ); // Exponential backoff with a max of 30 seconds
        reconnectAttempts.current += 1;
        setTimeout(connectWebSocket, timeout);
      } else {
        console.log("Max reconnect attempts reached");
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error", err);
      ws.current.close(); // Close the connection on error to trigger reconnection
    };
  };

  useEffect(() => {
    /* const websocket = new WebSocket(
      `ws://localhost:8000/ws/chat/2/${user.customer.email}`,
    );
    websocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      //console.log("Message:", data.message);
      console.log("Message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    setWs(websocket);
    return () => websocket.close(); */
    console.log(user.chats.filter((chat) => chat.Chatroom === 1));
    getMessages();
    connectWebSocket();
    console.log(user);
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="chatroom">
      <section className="messages">
        <div className="message-head">
          <h2>Chats</h2>
        </div>
        <div className="message-list">
          {user.chat_rooms.map((room) => (
            <ChatList
              name={
                user.customer.email === room.member1.email
                  ? room.member2.name
                  : room.member1.name
              }
              product={room.product.title}
              image={
                user.customer.email === room.member1.email
                  ? room.member2.profile_image
                  : room.member1.profile_image
              }
              message={
                user.chats
                  .filter((chat) => chat.chat_room === room.id)
                  .splice(-1)[0]["content"]
              }
              date={
                user.chats
                  .filter((chat) => chat.chat_room === room.id)
                  .splice(-1)[0]["timestamp"]
              }
            />
          ))}
        </div>
      </section>
      <section className="chat-messages">
        <div className="chat-messages-header">
          <div className="chat-image">
            <img
              src="https://res.cloudinary.com/di040wc0d/image/upload/v1/newlevels/profile_images/photo_wcnzl4"
              alt=""
              srcset=""
            />
          </div>
          <div className="chat-details">
            <p>Mike Jackson</p>
            <p className="chat-product">Apple Iphone 12 Pro Max</p>
          </div>
        </div>
        <div className="chat-messages-box" style={{ overflowY: "auto" }}>
          {messages.length > 0 ? (
            messages.map((obj) =>
              obj.sender === user.customer.email ? (
                <div className="float-right">
                  <div className="chat-sender">
                    <p className="sender-message">{obj.content}</p>
                    <p className="time">{obj.timestamp}</p>
                  </div>
                </div>
              ) : (
                <div className="chat-receiver">
                  <p className="receiver-message">{obj.content}</p>
                  <p className="time">{obj.timestamp}</p>
                </div>
              ),
            )
          ) : (
            <></>
          )}
          <div className="float-right">
            <div className="chat-sender">
              <p className="sender-message">
                I would love to know how much this Iphone 15 cost
              </p>
              <p className="time">just now</p>
            </div>
          </div>
        </div>
        <div className="message-input">
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message ..."
          ></textarea>
          <div className="chat-send-btn" onClick={sendMessage}>
            <i class="fa fa-paper-plane"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chatroom;
