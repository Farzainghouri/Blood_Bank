import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig/firebase";
import { collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment"; // Optional for time formatting

function Chat() {
  const [showList, setShowList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [storageId, setStorageId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    const getId = localStorage.getItem("user");
    setStorageId(getId);
  }, []);

  // Get list of users
  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "donar"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setShowList(arr);
  }

  // Listen to chat messages
  useEffect(() => {
    if (selectedUser) {
      const q = query(
        collection(db, "Msg"),
        where(selectedUser.uid, "==", true),
        where(storageId, "==", true)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        const sortedList = list.sort((a, b) => a.createdAt - b.createdAt); // Sort by time
        setChat(sortedList);
      });
      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [selectedUser, storageId]);

  // Send a message
  const sendMsg = async () => {
    if (message.trim() === "") return; // Prevent sending empty messages
    try {
      await addDoc(collection(db, "Msg"), {
        message,
        [storageId]: true,
        senderId: storageId,
        createdAt: Date.now(),
        [selectedUser.uid]: true,
      });
      setMessage(""); // Clear input
    } catch (e) {
      console.error("Error adding message:", e);
    }
  };

  // Logout
  const logoutBtn = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="h-fit bg-gray-100 flex">
      {/* User List Section */}
      <div className="w-1/2 bg-white shadow-lg">
        <nav className="bg-white shadow-md dark:bg-gray-900 p-4 ">
          <button onClick={handleBack}>
            <img src="data:image/png;base64,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" 
            className="w-16 " alt="" />
          </button>
          <Link to="/home" className="text-2xl font-bold text-gray-800 dark:text-white">
            Ghouri-CHAT-APP
          </Link>
          <div className="mt-6">
            <button
              onClick={logoutBtn}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="p-6 overflow-scroll h-4/6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Users</h2>
          <div className="space-y-2">
            {showList.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              showList.map((user, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-4 cursor-pointer rounded-lg hover:bg-gray-200 ${selectedUser?.uid === user.uid ? "bg-gray-300" : "bg-white"
                    }`}
                  onClick={() => setSelectedUser(user)} // Select user to chat
                >
                  <div>

                  <div className="text-lg font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-600">{user.location}</div>
                  {/* Display phone number and blood group */}
                  <div className="text-sm text-gray-500">Phone: {user.phone || "N/A"}</div>
                  </div>
                  <div className="text-sm text-black">Blood Group: {user.bloodGroup || "N/A"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 bg-gray-100 p-6 flex flex-col justify-between  h-screen">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-md">
              <h2 className="text-2xl font-bold">Chat with {selectedUser.name}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-4">
              {chat.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
              ) : (
                chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${storageId === msg.senderId ? "justify-end" : "justify-start"
                      } mb-2`}
                  >
                    <div
                      className={`p-4 max-w-xs rounded-lg ${storageId === msg.senderId ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                        }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 text-gray-200">
                        {moment(msg.createdAt).startOf("second").fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 flex items-center border-t border-gray-300">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={sendMsg}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-bold text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
