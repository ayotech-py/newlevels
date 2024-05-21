import React, { useState, useEffect, useRef } from "react";
import ChatList from "../components/ChatList";
import { useAuth } from "../components/AuthProvider";
import DateFormat from "../components/DateFormat";
import LargeLoading from "../components/LargeLoading";
import Pusher from "pusher-js";
import NoContent from "../components/NoContent";

const Chatroom = () => {
  const { user, updateUser, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatState, setChatState] = useState(false);
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const getData = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/get-customer-data/`;
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        user: username,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      updateUser(data.userData);
    } else if (response.status === 400) {
      alert("An error occured!");
    } else {
      logout();
      window.location.href = "/auth/login";
    }
  };

  useEffect(() => {
    getData();
    // Initialize Pusher
    const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
      cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
      forceTLS: true,
    });

    pusherRef.current = pusher;

    const chatroomIds = user.chat_rooms.map((chat) => chat.id); // Extract chatroom IDs from user's chats

    chatroomIds.forEach((chatId) => {
      const channel = pusher.subscribe(`chat_${chatId}`);

      channel.bind("chat_message", (data) => {
        const updatedChats = user.chats
          .filter((chat) => chat.chat_room === chatId)
          .concat(data);
        user.chats.push(data);
        const index = user.chat_rooms.findIndex((chat) => chat.id === chatId);
        const itemToMove = user.chat_rooms[index];
        user.chat_rooms.splice(index, 1);
        user.chat_rooms.unshift(itemToMove);
        updateUser(user);
        setMessages(updatedChats);
      });

      channel.bind("pusher:subscription_succeeded", () => {
        console.log(`Subscribed to chat_${chatId}`);
      });

      channel.bind("pusher:subscription_error", (status) => {
        console.error(`Subscription error for chat_${chatId}:`, status);
      });
    });

    // Connection event bindings
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

    // Cleanup on unmount
    return () => {
      chatroomIds.forEach((chatId) => {
        const channel = pusher.channel(`chat_${chatId}`);
        if (channel) {
          channel.unbind_all();
          channel.unsubscribe();
        }
      });
      pusher.disconnect();
    };
  }, []);

  /* const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
      cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
      forceTLS: true,
    });

    pusherRef.current = pusher;

    const channel = pusher.subscribe(`chat_${roomId}`);
    channelRef.current = channel;

    channel.bind("chat_message", (data) => {
      const updatedChats = user.chats
        .filter((chat) => chat.chat_room === roomId)
        .concat(data);
      user.chats.push(data);
      updateUser(user);
      setMessages(updatedChats);
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
    }; */

  const handleReconnect = () => {
    const maxReconnectAttempts = 3;
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current += 1;
      setTimeout(() => {
        pusherRef.current.connect();
      }, 1000 * reconnectAttemptsRef.current); // Exponential backoff
    } else {
      console.error("Max reconnect attempts reached");
    }
  };

  /* const reconnect = () => {
    if (!pusherRef.current) return;

    pusherRef.current.connect();
  }; */

  const sendMessage = async () => {
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/send_message/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            user: username,
          },
          body: JSON.stringify({
            room_id: roomId,
            sender: user.customer.email,
            message,
          }),
        },
      );

      if (response.ok) {
        console.log("");
      } else if (response.status === 400) {
        alert("An error occured!");
      } else if (response.status === 403) {
        alert("Session Expired!, please login again");
        logout();
        window.location.href = "/auth/login";
      }

      setMessage("");
    } catch (error) {
      alert("Error sending message:", error);
    }
  };

  const handleRoomClick = (room) => {
    setMessages(user.chats.filter((chat) => chat.chat_room === room));
    setRoomId(room);
    setShowChat(true);
  };

  return user ? (
    <div className="chatroom">
      <section className={`${showChat ? "hide-chat" : "show-chat"}`}>
        <div className="messages">
          <div className="message-head">
            <h2>Chats</h2>
          </div>
          <div className="message-list">
            {user.chat_rooms.length > 0 ? (
              user.chat_rooms.map((room) => (
                <div onClick={() => handleRoomClick(room.id)}>
                  <ChatList
                    name={
                      user.customer.email === room.member1.email
                        ? room.member2.name
                        : room.member1.name
                    }
                    product={
                      room.product
                        ? room.product.title.substring(0, 35)
                        : "New Message"
                    }
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
              ))
            ) : (
              <NoContent
                content={
                  "No message yet!, Find a product and chat with the seller."
                }
                width={"100%"}
              />
            )}
          </div>
        </div>
      </section>
      {chatState && roomId ? (
        <section className={`${showChat ? "show-chat" : "hide-chat"}`}>
          <div className="chat-messages">
            <div className="chat-messages-header">
              <i
                class="fas fa-arrow-left"
                onClick={() => {
                  setShowChat(false);
                }}
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
                  {user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                    .product
                    ? user.customer.email ===
                      user.chat_rooms.filter((chat) => chat.id === roomId)[0]
                        .member1.email
                      ? user.chat_rooms
                          .filter((chat) => chat.id === roomId)[0]
                          .product.title.substring(0, 35)
                      : user.chat_rooms
                          .filter((chat) => chat.id === roomId)[0]
                          .product.title.substring(0, 35)
                    : "New Message"}
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
        <div className={`${showChat ? "show-chat" : "hide-chat"}`}>
          <LargeLoading />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Chatroom;
