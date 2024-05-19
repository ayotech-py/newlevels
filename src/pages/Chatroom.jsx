import React, { useState, useEffect, useRef } from "react";
import ChatList from "../components/ChatList";
import { useAuth } from "../components/AuthProvider";
import DateFormat from "../components/DateFormat";
import LargeLoading from "../components/LargeLoading";
import Pusher from "pusher-js";

const Chatroom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [roomId, setRoomId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatState, setChatState] = useState(false);
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (roomId) {
      const pusher = new Pusher("5f083f9b2bd0c3f2b6df", {
        cluster: "eu",
        forceTLS: true,
      });

      pusherRef.current = pusher;

      const channel = pusher.subscribe(`chat_${roomId}`);
      channelRef.current = channel;

      channel.bind("chat_message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      pusher.connection.bind("connected", () => {
        setChatState(true);
        console.log("Pusher connected");
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
      });

      pusher.connection.bind("disconnected", () => {
        console.log("Pusher disconnected");
        handleReconnect();
      });

      pusher.connection.bind("error", (err) => {
        console.error("Pusher connection error:", err);
        handleReconnect();
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    }
  }, [roomId]);

  const handleReconnect = () => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      const timeout = Math.min(
        1000 * Math.pow(2, reconnectAttemptsRef.current),
        30000,
      ); // Exponential backoff with a max of 30 seconds
      reconnectAttemptsRef.current += 1;
      console.log(`Reconnecting in ${timeout / 1000} seconds...`);
      setTimeout(() => {
        console.log("Attempting to reconnect...");
        reconnect();
      }, timeout);
    } else {
      console.log("Max reconnect attempts reached");
    }
  };

  const reconnect = () => {
    if (!pusherRef.current) return;

    pusherRef.current.connect();
  };

  const sendMessage = async () => {
    const messageData = { message, sender: user.customer.email };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/send_message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_id: roomId,
            sender: user.customer.email,
            message,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage(""); // Clear the input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatroom">
      <section className={`${showChat ? "hide-chat" : "show-chat"}`}>
        <div className="messages">
          <div className="message-head">
            <h2>Chats</h2>
          </div>
          <div className="message-list">
            {user.chat_rooms.map((room) => (
              <div
                onClick={() => {
                  setMessages(
                    user.chats.filter((chat) => chat.chat_room === room.id),
                  );
                  setRoomId(room.id);
                  console.log(room.id);
                  setShowChat(true);
                }}
              >
                <ChatList
                  name={
                    user.customer.email === room.member1.email
                      ? room.member2.name
                      : room.member1.name
                  }
                  product={room.product.title.substring(0, 35)}
                  image={
                    user.customer.email === room.member1.email
                      ? room.member2.profile_image
                      : room.member1.profile_image
                  }
                  message={user.chats
                    .filter((chat) => chat.chat_room === room.id)
                    .splice(-1)[0]
                    ["content"].substring(0, 35)}
                  date={
                    user.chats
                      .filter((chat) => chat.chat_room === room.id)
                      .splice(-1)[0]["timestamp"]
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {chatState && roomId ? (
        <section className={`${showChat ? "show-chat" : "hide-chat"}`}>
          <div className="chat-messages">
            <div className="chat-messages-header">
              <i
                class="fas fa-arrow-left"
                onClick={() => setShowChat(false)}
              ></i>
              <div className="chat-image">
                <img
                  src={
                    user.customer.email ===
                    user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                      .member1.email
                      ? user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                          .member2.profile_image
                      : user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                          .member1.profile_image
                  }
                  alt=""
                  srcset=""
                />
              </div>
              <div className="chat-details">
                <p className="medium-size">
                  {user.customer.email ===
                  user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                    .member1.email
                    ? user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                        .member2.name
                    : user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                        .member1.name}
                </p>
                <p className="chat-product medium-size">
                  {user.customer.email ===
                  user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                    .member1.email
                    ? user.chat_rooms
                        .filter((chat) => chat.id === roomId)[0]
                        .product.title.substring(0, 35)
                    : user.chat_rooms
                        .filter((chat) => chat.id === roomId)[0]
                        .product.title.substring(0, 35)}
                </p>
              </div>
            </div>
            <div className="chat-messages-box" style={{ overflowY: "auto" }}>
              {messages.length > 0 ? (
                messages.map((obj) =>
                  obj.sender === user.customer.email ? (
                    <div className="float-right">
                      <div className="chat-sender">
                        <p className="sender-message">{obj.content}</p>
                        <p className="time">{DateFormat(obj.timestamp)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="chat-receiver">
                      <p className="receiver-message">{obj.content}</p>
                      <p className="time">{DateFormat(obj.timestamp)}</p>
                    </div>
                  ),
                )
              ) : (
                <></>
              )}
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
          </div>
        </section>
      ) : (
        <LargeLoading />
      )}
    </div>
  );
};

export default Chatroom;
