import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import io from "socket.io-client";


import {
  FaSearch,
  FaComment,
  FaUser,
  FaBell,
  FaEllipsisH,
  FaUserPlus,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

// Use environment variable or a config file for API URL
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

// const API_URL = "ws://localhost:5001";

const API_URL = "wss://cuddle-up-backend.onrender.com";
// Create a single socket instance to use throughout the component
let socket;

const FriendsPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [friendTyping, setFriendTyping] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [friendsMoods, setFriendsMoods] = useState([]);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // const moods = [
  //   { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
  //   { emoji: "😔", label: "Sad", color: "bg-gray-300" },
  //   { emoji: "😠", label: "Angry", color: "bg-red-400" },
  //   { emoji: "😟", label: "Worried", color: "bg-purple-300" },
  //   { emoji: "😭", label: "Crying", color: "bg-blue-300" },
  //   { emoji: "🤩", label: "Excited", color: "bg-green-300" },
  //   { emoji: "😡", label: "Anger", color: "bg-red-400" },
  //   { emoji: "😔", label: "Sadness", color: "bg-gray-300" },
  //   { emoji: "😆", label: "Excitement", color: "bg-green-300" },
  //   { emoji: "😲", label: "Surprise", color: "bg-orange-300" },
  //   { emoji: "🤢", label: "Disgust", color: "bg-green-500" },
  //   { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
  //   { emoji: "😨", label: "Fear", color: "bg-indigo-400" },
  //   { emoji: "🤗", label: "Caring", color: "bg-pink-300" },
  //   { emoji: "😤", label: "Annoyance", color: "bg-red-500" },
  //   { emoji: "😞", label: "Disappointment", color: "bg-gray-500" },
  //   { emoji: "😬", label: "Nervousness", color: "bg-yellow-500" },
  //   { emoji: "👍", label: "Approval", color: "bg-green-500" },
  //   { emoji: "🤤", label: "Desire", color: "bg-red-300" },
  //   { emoji: "🤔", label: "Curiosity", color: "bg-blue-400" },
  //   { emoji: "😌", label: "Pride", color: "bg-purple-500" },
  //   { emoji: "😕", label: "Confusion", color: "bg-gray-600" },
  //   { emoji: "🙏", label: "Gratitude", color: "bg-yellow-400" },
  //   { emoji: "❤️", label: "Love", color: "bg-red-400" },
  //   { emoji: "😂", label: "Amusement", color: "bg-teal-300" },
  //   { emoji: "😢", label: "Grief", color: "bg-blue-500" },
  //   { emoji: "😄", label: "Joy", color: "bg-yellow-500" },
  //   { emoji: "👏", label: "Admiration", color: "bg-green-400" },
  //   { emoji: "😳", label: "Embarrassment", color: "bg-pink-400" },
  //   { emoji: "👎", label: "Disapproval", color: "bg-red-600" },
  //   { emoji: "😌", label: "Relief", color: "bg-blue-300" },
  //   { emoji: "😞", label: "Remorse", color: "bg-gray-500" },
  //   { emoji: "💡", label: "Realization", color: "bg-yellow-300" },
  //   { emoji: "🌟", label: "Optimism", color: "bg-green-200" },
  //   { emoji: "😴", label: "Boredom", color: "bg-gray-400" },
  // ]

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-100" }, // Lighter yellow
    { emoji: "😔", label: "Sad", color: "bg-gray-100" }, // Lighter gray
    { emoji: "😠", label: "Angry", color: "bg-red-200" }, // Softer red
    { emoji: "😟", label: "Worried", color: "bg-purple-100" }, // Lighter purple
    { emoji: "😭", label: "Crying", color: "bg-blue-200" }, // Softer blue
    { emoji: "🤩", label: "Excited", color: "bg-green-100" }, // Softer green
    { emoji: "😡", label: "Anger", color: "bg-red-200" }, // Softer red
    { emoji: "😔", label: "Sadness", color: "bg-gray-100" }, // Lighter gray
    { emoji: "😆", label: "Excitement", color: "bg-green-200" }, // Softer green
    { emoji: "😲", label: "Surprise", color: "bg-orange-200" }, // Softer orange
    { emoji: "🤢", label: "Disgust", color: "bg-green-300" }, // Softer green
    { emoji: "😐", label: "Neutral", color: "bg-gray-200" }, // Softer gray
    { emoji: "😨", label: "Fear", color: "bg-indigo-200" }, // Softer indigo
    { emoji: "🤗", label: "Caring", color: "bg-pink-200" }, // Softer pink
    { emoji: "😤", label: "Annoyance", color: "bg-red-300" }, // Softer red
    { emoji: "😞", label: "Disappointment", color: "bg-gray-300" }, // Softer gray
    { emoji: "😬", label: "Nervousness", color: "bg-yellow-200" }, // Softer yellow
    { emoji: "👍", label: "Approval", color: "bg-green-300" }, // Softer green
    { emoji: "🤤", label: "Desire", color: "bg-red-200" }, // Softer red
    { emoji: "🤔", label: "Curiosity", color: "bg-blue-200" }, // Softer blue
    { emoji: "😌", label: "Pride", color: "bg-purple-200" }, // Softer purple
    { emoji: "😕", label: "Confusion", color: "bg-gray-300" }, // Softer gray
    { emoji: "🙏", label: "Gratitude", color: "bg-yellow-200" }, // Softer yellow
    { emoji: "❤️", label: "Love", color: "bg-red-300" }, // Softer red
    { emoji: "😂", label: "Amusement", color: "bg-teal-200" }, // Softer teal
    { emoji: "😢", label: "Grief", color: "bg-blue-300" }, // Softer blue
    { emoji: "😄", label: "Joy", color: "bg-yellow-300" }, // Softer yellow
    { emoji: "👏", label: "Admiration", color: "bg-green-200" }, // Softer green
    { emoji: "😳", label: "Embarrassment", color: "bg-pink-300" }, // Softer pink
    { emoji: "👎", label: "Disapproval", color: "bg-red-400" }, // Softer red
    { emoji: "😌", label: "Relief", color: "bg-blue-200" }, // Softer blue
    { emoji: "😞", label: "Remorse", color: "bg-gray-400" }, // Softer gray
    { emoji: "💡", label: "Realization", color: "bg-yellow-100" }, // Lighter yellow
    { emoji: "🌟", label: "Optimism", color: "bg-green-100" }, // Lighter green
    { emoji: "😴", label: "Boredom", color: "bg-gray-200" }, // Softer gray
  ];

  // Initialize socket connection once
  useEffect(() => {
    if (user) {
      // Initialize socket if not already done
      if (!socket) {
        socket = io.connect(API_URL, {
          transports: ["websocket"], // Force WebSocket
          withCredentials: true,
        });
      }

      socket.emit("user_online", user.uid);

      // Fetch initial data
      fetchFriendsAndRequests();
      fetchUnreadCounts();
      fetchFriendsMoods();

      // Clean up on unmount
      return () => {
        socket.disconnect();
        socket = null; // Reset socket reference
      };
    }
  }, [user]);

  // Set up all socket event listeners in a single useEffect
  useEffect(() => {
    if (!socket || !user) return;

    // Handle receiving messages
    const handleReceiveMessage = (messageData) => {
      // Only add the message to current conversation if it's from/to the selected friend
      if (
        selectedFriend &&
        (messageData.senderId === selectedFriend.uid ||
          messageData.receiverId === selectedFriend.uid)
      ) {
        setMessages((prev) => [...prev, messageData]);

        // Mark as read if it's from the selected friend
        if (messageData.senderId === selectedFriend.uid) {
          socket.emit("mark_as_read", {
            userId: user.uid,
            friendId: selectedFriend.uid,
          });
        }
      } else {
        // If message is not for current conversation, update unread counts
        if (messageData.senderId !== user.uid) {
          // Don't increment for messages you sent
          setUnreadCounts((prev) => ({
            ...prev,
            [messageData.senderId]: (prev[messageData.senderId] || 0) + 1,
          }));
        }
      }
    };

    // Friend typing indicator
    const handleFriendTyping = (data) => {
      setFriendTyping((prev) => ({
        ...prev,
        [data.userId]: data.isTyping,
      }));
    };

    // Friend status changes
    const handleFriendStatusChange = (data) => {
      setFriends((prev) =>
        prev.map((friend) =>
          friend.uid === data.userId
            ? { ...friend, isOnline: data.isOnline, lastSeen: data.lastSeen }
            : friend
        )
      );
    };

    // New friend request received
    const handleFriendRequestReceived = (data) => {
      // Fetch the sender's profile data
      fetchUserProfile(data.senderId).then((senderProfile) => {
        if (senderProfile) {
          setReceivedRequests((prev) => {
            // Check if already in the array to avoid duplicates
            if (prev.some((req) => req.uid === senderProfile.uid)) {
              return prev;
            }
            return [...prev, senderProfile];
          });
        }
      });
    };

    // Friend request accepted
    const handleFriendRequestAccepted = (data) => {
      // Find the friend in pending requests
      const acceptedFriend = pendingRequests.find(
        (r) => r.uid === data.accepterId
      );

      if (acceptedFriend) {
        // Add to friends list
        setFriends((prev) => {
          // Check if already in the array to avoid duplicates
          if (prev.some((friend) => friend.uid === acceptedFriend.uid)) {
            return prev;
          }
          return [...prev, acceptedFriend];
        });

        // Remove from pending requests
        setPendingRequests((prev) =>
          prev.filter((r) => r.uid !== data.accepterId)
        );
      } else {
        // If not found in pending, refresh the data
        fetchFriendsAndRequests();
      }
    };

    // Friend request declined
    const handleFriendRequestDeclined = (data) => {
      // Remove from pending
      setPendingRequests((prev) =>
        prev.filter((r) => r.uid !== data.declinerId)
      );
    };

    // socket.on("mood_update", ({ userId, mood }) => {
    //   setFriends((prevFriends) =>
    //     prevFriends.map((friend) =>
    //       friend.id === userId ? { ...friend, latestMood: mood } : friend
    //     )
    //   );
    // });
    const handleFriendsMoods = (data) => {
      setFriendsMoods((prevFriends) =>
        prevFriends.map((friend) =>
          friend.id === data.userId
            ? { ...friend, latestMood: data.mood }
            : friend
        )
      );
    };

    // Friend request canceled
    const handleFriendRequestCanceled = (data) => {
      // Remove from received
      setReceivedRequests((prev) =>
        prev.filter((r) => r.uid !== data.senderId)
      );
    };


    // const handleRemoveFriend = (data) => {
    //   setFriends((prevFriends) =>
    //     prevFriends.filter((friend) => friend.uid !== data.receiverId)
    //   );
    // };
    const handleRemoveFriend = (data) => {
      const idToRemove = data.senderId || data.receiverId;
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.uid !== idToRemove)
      );
      if (selectedFriend && selectedFriend.uid === idToRemove) {
        setSelectedFriend(null);
      }
    };
    

    // Register all event listeners
    socket.on("receive_message", handleReceiveMessage);
    socket.on("friend_typing", handleFriendTyping);
    socket.on("friend_status_change", handleFriendStatusChange);
    socket.on("friend_request_received", handleFriendRequestReceived);
    socket.on("friend_request_accepted", handleFriendRequestAccepted);
    socket.on("friend_request_declined", handleFriendRequestDeclined);
    socket.on("friend_request_canceled", handleFriendRequestCanceled);
    socket.on("update_mood", handleFriendsMoods);
    socket.on("remove_friend",handleRemoveFriend)

    // Clean up all listeners when component unmounts or dependencies change
    return () => {
      if (!socket) return;
      socket.off("receive_message", handleReceiveMessage);
      socket.off("friend_typing", handleFriendTyping);
      socket.off("friend_status_change", handleFriendStatusChange);
      socket.off("friend_request_received", handleFriendRequestReceived);
      socket.off("friend_request_accepted", handleFriendRequestAccepted);
      socket.off("friend_request_declined", handleFriendRequestDeclined);
      socket.off("friend_request_canceled", handleFriendRequestCanceled);
      socket.off("update_mood", handleFriendsMoods);
      socket.off("remove_friend",handleRemoveFriend)
    };
  }, [user, selectedFriend, pendingRequests, receivedRequests, friends]);

  // Unified API call function to reduce duplication
  const makeAuthenticatedRequest = async (
    endpoint,
    method = "GET",
    body = null
  ) => {
    if (!user) {
      throw new Error("User not logged in.");
    }

    try {
      const token = await user.getIdToken(true);

      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      if (body && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(
        `https://cuddle-up-backend.onrender.com${endpoint}`,
        options
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed with status ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error(
        `Error with ${method} request to ${endpoint}:`,
        error.message
      );
      setError(error.message);
      throw error;
    }
  };

  // https://cuddle-up-backend.onrender.com

  const fetchFriendsMoods = async () => {
    try {
      const token = await user.getIdToken(true); // Force refresh the token if expired

      const response = await fetch(
        `https://cuddle-up-backend.onrender.com/api/users/getLatestMood/${user.uid}`,

        // `http://localhost:5001/api/users/getLatestMood/${user.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach Firebase token
          },
        }
      );
      const data = await response.json();
      setFriendsMoods(data.friends);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  const fetchFriendsAndRequests = async () => {
    try {
      const data = await makeAuthenticatedRequest("/api/users/getFriendsData");
      setFriends(data.friends || []);
      setPendingRequests(data.pendingRequests || []);
      setReceivedRequests(data.receivedRequests || []);
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const fetchUnreadCounts = async () => {
    try {
      const data = await makeAuthenticatedRequest("/api/users/unread");
      setUnreadCounts(data);
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const selectFriend = async (friend) => {
    setSelectedFriend(friend);

    try {
      const data = await makeAuthenticatedRequest(
        `/api/messages/conversations/${user.uid}/${friend.uid}`
      );
      setMessages(data);

      // Mark messages as read
      socket.emit("mark_as_read", {
        userId: user.uid,
        friendId: friend.uid,
      });

      // Update unread counts
      setUnreadCounts((prev) => ({
        ...prev,
        [friend.uid]: 0,
      }));
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !selectedFriend) return;

    console.log(newMessage)

    const messageData = {
      senderId: user.uid,
      receiverId: selectedFriend.uid,
      text: newMessage,
      timestamp: new Date(),
    };

    console.log(messageData)
    // Optimistically update UI
    setMessages((prevMessages) => [...prevMessages, messageData]);

    // Send via socket
    socket.emit("send_direct_message", messageData);
    setNewMessage("");

    // Stop typing indicator
    handleTypingStop();
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      await makeAuthenticatedRequest("/api/users/sendFriendRequest", "POST", {
        receiverId,
      });

      // Update local state to reflect the sent request
      const requestedUser = users.find((u) => u.uid === receiverId);
      if (requestedUser) {
        setPendingRequests((prev) => [...prev, requestedUser]);
      }

      // Emit socket event to notify the receiver
      socket.emit("friend_request_sent", {
        senderId: user.uid,
        receiverId: receiverId,
      });
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const acceptFriendRequest = async (senderId) => {
    try {
      await makeAuthenticatedRequest("/api/users/acceptFriendRequest", "POST", {
        senderId,
      });

      // Update local state
      const newFriend = receivedRequests.find((r) => r.uid === senderId);
      if (newFriend) {
        setFriends((prev) => [...prev, newFriend]);
        setReceivedRequests((prev) => prev.filter((r) => r.uid !== senderId));
      }

      // Emit socket event
      socket.emit("friend_request_accepted", {
        accepterId: user.uid,
        senderId: senderId,
      });
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const handleRemoveFriend = async (friend) => {
    try{
      const friendId = friend.uid
      await makeAuthenticatedRequest(
        "/api/users/removeFriend",
        "POST",
        { friendId }
      );
      // const token = await user.getIdToken(true); // Force refresh the token if expired

      // const response = await fetch(
      //   'http://localhost:5001/api/users/removeFriend',

      //   // `http://localhost:5001/api/users/getLatestMood/${user.uid}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`, // Attach Firebase token
      //     },
      //     body: JSON.stringify({ friendId }) 
      //   }
      // );

      // if(!response.ok){
      //   throw new Error('Error removing friend')
      // }

      setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.uid !== friendId)
    );

    alert(`Removed ${friend.name} from your friends`)

    if (selectedFriend && selectedFriend.uid === friendId) {
      setSelectedFriend(null);
    }

    socket.emit('remove_friend', {
      senderId: user.uid,
      receiverId: friendId,
    });

    }
    catch(error){
      console.error(error)
    }
  }

  const declineFriendRequest = async (senderId) => {
    try {
      await makeAuthenticatedRequest(
        "/api/users/declineFriendRequest",
        "POST",
        { senderId }
      );

      // Update local state
      setReceivedRequests((prev) => prev.filter((r) => r.uid !== senderId));

      // Emit socket event
      socket.emit("friend_request_declined", {
        declinerId: user.uid,
        senderId: senderId,
      });
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const cancelFriendRequest = async (receiverId) => {
    try {
      await makeAuthenticatedRequest("/api/users/cancelFriendRequest", "POST", {
        receiverId,
      });

      // Update local state
      setPendingRequests((prev) => prev.filter((r) => r.uid !== receiverId));

      // Emit socket event
      socket.emit("friend_request_canceled", {
        senderId: user.uid,
        receiverId: receiverId,
      });
    } catch (error) {
      // Error already handled in makeAuthenticatedRequest
    }
  };

  const handleTyping = () => {
    if (!isTyping && selectedFriend) {
      setIsTyping(true);
      socket.emit("typing", {
        senderId: user.uid,
        receiverId: selectedFriend.uid,
        isTyping: true,
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(handleTypingStop, 2000);
  };

  const handleTypingStop = () => {
    if (selectedFriend) {
      setIsTyping(false);
      socket.emit("typing", {
        senderId: user.uid,
        receiverId: selectedFriend.uid,
        isTyping: false,
      });
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      return await makeAuthenticatedRequest(
        `/api/users/getUserProfile/${userId}`
      );
    } catch (error) {
      return null;
    }
  };

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  
    // If timestamp is already a JS Date object
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Search users functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const fetchUsers = async () => {
      try {
        const userAuth = getAuth();
        const user = userAuth.currentUser;
        const token = await user.getIdToken(true);
        const response = await axios.get(
          // "http://localhost:5001/api/users/searchUsers",

          "https://cuddle-up-backend.onrender.com/api/users/searchUsers",
          {
            params: { searchName: searchQuery },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to search users");
      }
    };

    // Add debounce to avoid too many requests
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const getUserRelationship = (userId) => {
    if (friends.some((f) => f.uid === userId)) {
      return "friend";
    } else if (pendingRequests.some((r) => r.uid === userId)) {
      return "pending";
    } else if (receivedRequests.some((r) => r.uid === userId)) {
      return "received";
    } else {
      return "none";
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };



  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-4 md:p-6 relative overflow-hidden">
    //   {/* Decorative Elements */}
    //   <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    //     <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    //     <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    //     <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    //   </div>

    //   {/* Centered Heading */}
    //   <div className="relative top-10 z-10 w-full max-w-6xl">
    //     <div className="text-center mb-6 md:mb-8">
    //       <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
    //         Friends & Chat
    //       </h1>
    //       <p className="text-sm md:text-base text-gray-600 font-light mt-1">
    //         Connect, chat, and track your emotional journey
    //       </p>
    //     </div>
    //   </div>

    //   {/* Main Layout */}
    //   <div className="flex top-10 flex-col md:flex-row gap-4 w-full max-w-6xl relative z-10">
    //     {/* Left Column - Search & Requests Status */}
    //     <div className="w-full md:w-3/12 flex flex-col space-y-4">
    //       {/* Search Section */}
    //       <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-4">
    //         <div className="flex items-center w-full p-2 rounded-lg border border-gray-200 focus-within:border-purple-400 transition-all">
    //           {isSearching && (
    //             <button
    //               onClick={clearSearch}
    //               className="text-gray-400 mr-2 hover:text-gray-600"
    //             >
    //               <FaArrowLeft />
    //             </button>
    //           )}
    //           <FaSearch className="text-gray-400 mr-2" />
    //           <input
    //             type="text"
    //             placeholder="Search friends..."
    //             className="w-full bg-transparent text-gray-700 outline-none text-sm"
    //             value={searchQuery}
    //             onChange={(e) => setSearchQuery(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       {/* Requests Status Section */}

    //       {/* Requests Sections Container */}
    //       <div className="space-y-4">
    //         {/* Requests Received Section */}
    //         <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-4">
    //           <div className="flex justify-between items-center">
    //             <h3 className="font-semibold text-gray-800 flex items-center">
    //               <FaBell className="mr-2 text-purple-500" />
    //               Requests received
    //             </h3>
    //             <div className="bg-purple-600 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-6 text-center">
    //               {receivedRequests.length}
    //             </div>
    //           </div>
    //           <div className="mt-3 overflow-y-auto max-h-40 pr-1">
    //             {receivedRequests.length > 0 ? (
    //               <div className="space-y-3">
    //                 {receivedRequests.map((request) => (
    //                   <div
    //                     key={request.uid}
    //                     className="bg-purple-50 rounded-xl p-3 border border-purple-100"
    //                   >
    //                     <p className="text-xs font-medium text-purple-800">
    //                       New Friend Request
    //                     </p>
    //                     <p className="text-xs text-gray-600 mt-1">
    //                       {request.name} wants to connect
    //                     </p>
    //                     <div className="flex gap-2 mt-2">
    //                       <button
    //                         className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
    //                         onClick={() => acceptFriendRequest(request.uid)}
    //                       >
    //                         Accept
    //                       </button>
    //                       <button
    //                         className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
    //                         onClick={() => declineFriendRequest(request.uid)}
    //                       >
    //                         Decline
    //                       </button>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             ) : (
    //               <div className="text-center py-3 text-gray-500 text-sm">
    //                 No pending requests
    //               </div>
    //             )}
    //           </div>
    //         </div>

    //         {/* Requests Sent Section */}
    //         <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-4">
    //           <div className="flex justify-between items-center">
    //             <h3 className="font-semibold text-gray-800 flex items-center">
    //               <FaBell className="mr-2 text-purple-500" />
    //               Requests sent
    //             </h3>
    //             <div className="bg-blue-500 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-6 text-center">
    //               {pendingRequests.length}
    //             </div>
    //           </div>
    //           <div className="mt-3 overflow-y-auto max-h-40 pr-1">
    //             {pendingRequests.length > 0 ? (
    //               <div className="space-y-3">
    //                 {pendingRequests.map((request) => (
    //                   <div
    //                     key={request.uid}
    //                     className="bg-purple-50 rounded-xl p-3 border border-purple-100"
    //                   >
    //                     <div className="flex justify-between items-center">
    //                       <p className="text-xs text-gray-600">
    //                         {request.name}
    //                       </p>
    //                       <span className="text-xs text-gray-400">2d ago</span>
    //                     </div>
    //                     <div className="flex gap-2 mt-2">
    //                       <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg flex items-center">
    //                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></div>
    //                         Pending
    //                       </span>
    //                       <button
    //                         className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
    //                         onClick={() => cancelFriendRequest(request.uid)}
    //                       >
    //                         Cancel
    //                       </button>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             ) : (
    //               <div className="text-center py-3 text-gray-500 text-sm">
    //                 No pending requests
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Right Column - Friends List & Chat */}
    //     <div className="w-full md:w-9/12 flex flex-col md:flex-row bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-4 gap-4">
    //       {/* Friends List Section */}
    //       <div className="w-full md:w-1/3 rounded-xl">
    //         <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
    //           <FaUser className="mr-2 text-blue-500" />
    //           {isSearching ? <>Search Results</> : <>Friends</>}
    //         </h3>
    //         <div className="space-y-3 overflow-y-auto max-h-96 pr-2">
    //           {isSearching ? (
    //             users.length > 0 ? (
    //               users.map((person) => {
    //                 const relationship = getUserRelationship(person.uid);
    //                 return (
    //                   <div
    //                     key={person.uid}
    //                     className="flex items-center p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
    //                   >
    //                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
    //                       {person.photoURL ? (
    //                         <img
    //                           src={person.photoURL}
    //                           alt="User"
    //                           className="w-12 h-12 rounded-full"
    //                         />
    //                       ) : (
    //                         <span className="text-xl">
    //                           {person.emoji || "👤"}
    //                         </span>
    //                       )}
    //                     </div>
    //                     <div className="ml-3 flex-1">
    //                       <h2 className="font-medium text-gray-800 text-sm">
    //                         {person.name}
    //                       </h2>
    //                       <div className="flex items-center mt-1">
    //                         <span className="text-xs text-gray-500">
    //                           {person.age ? `${person.age} years` : ""}{" "}
    //                           {person.city ? `• ${person.city}` : ""}
    //                         </span>
    //                       </div>

    //                       <div className="flex items-center justify-between mt-2">
    //                         {relationship === "friend" ? (
    //                           <button
    //                             className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
    //                             onClick={() => selectFriend(person)}
    //                           >
    //                             Chat
    //                           </button>
    //                         ) : relationship === "pending" ? (
    //                           <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
    //                             Request Sent
    //                           </span>
    //                         ) : relationship === "received" ? (
    //                           <div className="flex gap-2">
    //                             <button
    //                               className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
    //                               onClick={() =>
    //                                 acceptFriendRequest(person.uid)
    //                               }
    //                             >
    //                               <FaCheck className="inline mr-1" />
    //                               Accept
    //                             </button>
    //                             <button
    //                               className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
    //                               onClick={() =>
    //                                 declineFriendRequest(person.uid)
    //                               }
    //                             >
    //                               <FaTimes className="inline mr-1" />
    //                               Decline
    //                             </button>
    //                           </div>
    //                         ) : (
    //                           <button
    //                             className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
    //                             onClick={() => sendFriendRequest(person.uid)}
    //                           >
    //                             <FaUserPlus className="inline mr-1" />
    //                             Add Friend
    //                           </button>
    //                         )}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 );
    //               })
    //             ) : (
    //               <div className="text-center py-6 text-gray-500 text-sm">
    //                 No users found matching "{searchQuery}"
    //               </div>
    //             )
    //           ) : friends.length > 0 ? (
    //             friends.map((friend) => (
    //               <div
    //                 key={friend.name}
    //                 className={`flex items-center p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
    //                   selectedFriend?.id === friend.id
    //                     ? "bg-blue-50 border border-blue-200"
    //                     : ""
    //                 }`}
    //                 //   onClick={() => handleSelectFriend(friend)}
    //                 onClick={() => selectFriend(friend)}
    //               >
    //                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
    //                   {friend.photoURL ? (
    //                     <img
    //                       src={friend.photoURL}
    //                       alt="Friend"
    //                       className="w-12 h-12 rounded-full"
    //                     />
    //                   ) : (
    //                     <span className="text-xl">{friend.emoji}</span>
    //                   )}
    //                 </div>
    //                 <div className="ml-3 flex-1">
    //                   <h2 className="font-medium text-gray-800 text-sm">
    //                     {friend.name}
    //                   </h2>
    //                   <div className="flex items-center mt-1">
    //                     <span className="text-xs text-gray-500">
    //                       {friend.age} years • {friend.city}
    //                     </span>
    //                   </div>

    //                   <div className="flex items-center justify-between mt-1">
    //                     {/* <span className="text-xs text-gray-500">
    //                     Mood: {friend.mood}
    //                   </span> */}
    //                     <span
    //                       className={`text-xs rounded-full px-2 py-0.5 ${
    //                         friend.status == "active"
    //                           ? "bg-green-100 text-green-800"
    //                           : "bg-gray-100 text-gray-800"
    //                       }`}
    //                     >
    //                       {friend.status == "active" ? "Active" : "Away"}
    //                     </span>
    //                     {unreadCounts[friend.uid] > 0 && (
    //                       <span className="bg-red-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
    //                         {unreadCounts[friend.uid]}
    //                       </span>
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <div className="text-center py-6 text-gray-500 text-sm">
    //               No friends yet. Search to find people to connect with!
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Chat Section */}
    //       <div className="w-full md:w-2/3 rounded-xl border-l border-gray-100 md:pl-4 mt-4 md:mt-0 flex flex-col h-full">
    //         <div className="flex items-center justify-between mb-3">
    //           <h3 className="font-semibold text-gray-800 flex items-center">
    //             <FaComment className="mr-2 text-pink-500" />
    //             Chat
    //           </h3>
    //           {selectedFriend && (
    //             <button className="text-gray-400 hover:text-gray-600">
    //               <FaEllipsisH />
    //             </button>
    //           )}
    //         </div>

    //         {selectedFriend ? (
    //           <div className="flex flex-col h-96">
    //             <div className="bg-gray-50 rounded-t-xl p-3 flex items-center border-b border-gray-100">
    //               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
    //                 {selectedFriend.photoURL ? (
    //                   <img
    //                     src={selectedFriend.photoURL}
    //                     alt="Friend"
    //                     className="w-10 h-10 rounded-full"
    //                   />
    //                 ) : (
    //                   <span>{selectedFriend.emoji || "😊"}</span>
    //                 )}
    //               </div>
    //               <div className="ml-3">
    //                 <h2 className="font-medium text-gray-800 text-sm">
    //                   {selectedFriend.name}
    //                 </h2>
    //                 <div className="flex items-center gap-1">
    //                   <span
    //                     className={`w-2 h-2 rounded-full ${
    //                       selectedFriend.status == "active"
    //                         ? "bg-green-500"
    //                         : "bg-gray-300"
    //                     }`}
    //                   ></span>
    //                   <span className="text-xs text-gray-500">
    //                     {selectedFriend.status == "active"
    //                       ? "Online"
    //                       : "Offline"}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* <div className="flex-1 bg-gray-50 p-3 overflow-y-auto"> */}
    //             <div
    //               id="chatContainer"
    //               className="flex-1 bg-gray-50 p-3 overflow-y-auto max-h-[300px] md:max-h-[400px]"
    //             >
    //               {messages.length > 0 ? (
    //                 <div className="space-y-3">
    //                   {messages.map((message, index) => (
    //                     <div
    //                       key={index}
    //                       className={`flex ${
    //                         message.senderId == user.uid
    //                           ? "justify-end"
    //                           : "justify-start"
    //                       }`}
    //                     >
    //                       <div
    //                         className={` p-3 rounded-2xl ${
    //                           message.senderId == user.uid
    //                             ? "rounded-tr-none bg-blue-500"
    //                             : "rounded-tl-none bg-white"
    //                         }  shadow-sm max-w-xs`}
    //                       >
    //                         <p
    //                           className={`${
    //                             message.senderId == user.uid
    //                               ? "text-white"
    //                               : "text-gray-800"
    //                           } text-sm`}
    //                         >
    //                           {message.text}
    //                         </p>
    //                         <p
    //                           className={`text-xs ${
    //                             message.senderId === user.uid
    //                               ? "text-blue-100"
    //                               : "text-gray-500"
    //                           } text-gray-400 text-right mt-1`}
    //                         >
    //                           {formatTime(message.timestamp)}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   ))}
    //                   <div ref={messagesEndRef} />
    //                   {friendTyping[selectedFriend.uid] && (
    //                     <div className="flex justify-start mb-3">
    //                       <div className="max-w-xs rounded-xl p-3 bg-gray-100 text-gray-800">
    //                         <div className="flex space-x-1">
    //                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    //                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
    //                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               ) : (
    //                 <div className="h-full flex items-center justify-center">
    //                   <div className="text-center">
    //                     <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
    //                       <FaComment className="text-blue-500 text-xl" />
    //                     </div>
    //                     <h3 className="mt-3 text-gray-600 font-medium">
    //                       Start a conversation
    //                     </h3>
    //                     <p className="text-sm text-gray-500 mt-1">
    //                       Say hello to {selectedFriend.name}
    //                     </p>
    //                   </div>
    //                 </div>
    //               )}
    //             </div>

    //             <div className="bg-white border border-gray-200 rounded-xl flex items-center p-2 mt-2">
    //               <input
    //                 type="text"
    //                 placeholder="Type your message..."
    //                 className="flex-1 bg-transparent outline-none text-sm px-2"
    //                 value={newMessage}
    //                 onChange={(e) => setNewMessage(e.target.value)}
    //                 onKeyUp={handleTyping}
    //               />
    //               <button
    //                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-4 py-2 text-sm font-medium"
    //                 onClick={(e) => sendMessage(e)}
    //               >
    //                 Send
    //               </button>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="h-80 flex items-center justify-center bg-gray-50 rounded-xl">
    //             <div className="text-center p-6">
    //               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
    //                 <FaComment className="text-gray-400 text-xl" />
    //               </div>
    //               <h3 className="text-gray-500 font-medium">
    //                 {/* No conversation selected */}
    //                 Select a friend to start chatting
    //               </h3>
    //               <p className="text-gray-400 text-sm mt-1">
    //                 {/* Choose a friend from the list to start chatting */}
    //                 Choose from your friends list or search for new people to
    //                 connect with
    //               </p>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-3 md:p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 md:w-64 h-40 md:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 md:w-64 h-40 md:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-40 md:w-64 h-40 md:h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Centered Heading */}
      <div className="relative z-10 w-full max-w-6xl mb-4">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Friends & Chat
          </h1>
          <p className="text-xs md:text-base text-gray-600 font-light mt-1">
            Connect, chat, and track your emotional journey
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 w-full max-w-6xl relative z-10">
        {/* Left Column - Search & Requests Status */}
        <div className="w-full lg:w-3/12 flex flex-col space-y-3 md:space-y-4">
          {/* Search Section */}
          <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-3 md:p-4">
            <div className="flex items-center w-full p-2 rounded-lg border border-gray-200 focus-within:border-purple-400 transition-all">
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 mr-2 hover:text-gray-600"
                >
                  <FaArrowLeft />
                </button>
              )}
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full bg-transparent text-gray-700 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Requests Sections Container */}
          <div className="space-y-3 md:space-y-4">
            {/* Requests Received Section */}
            <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-3 md:p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center text-sm md:text-base">
                  <FaBell className="mr-2 text-purple-500" />
                  Requests received
                </h3>
                <div className="bg-purple-600 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-6 text-center">
                  {receivedRequests.length}
                </div>
              </div>
              <div className="mt-3 overflow-y-auto max-h-40 pr-1">
                {receivedRequests.length > 0 ? (
                  <div className="space-y-3">
                    {receivedRequests.map((request) => (
                      <div
                        key={request.uid}
                        className="bg-purple-50 rounded-xl p-3 border border-purple-100"
                      >
                        <p className="text-xs font-medium text-purple-800">
                          New Friend Request
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {request.name} wants to connect
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
                            onClick={() => acceptFriendRequest(request.uid)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                            onClick={() => declineFriendRequest(request.uid)}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 text-gray-500 text-xs md:text-sm">
                    No pending requests
                  </div>
                )}
              </div>
            </div>

            {/* Requests Sent Section */}
            <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-3 md:p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center text-sm md:text-base">
                  <FaBell className="mr-2 text-purple-500" />
                  Requests sent
                </h3>
                <div className="bg-blue-500 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-6 text-center">
                  {pendingRequests.length}
                </div>
              </div>
              <div className="mt-3 overflow-y-auto max-h-40 pr-1">
                {pendingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.uid}
                        className="bg-purple-50 rounded-xl p-3 border border-purple-100"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-600">
                            {request.name}
                          </p>
                          <span className="text-xs text-gray-400">2d ago</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></div>
                            Pending
                          </span>
                          <button
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                            onClick={() => cancelFriendRequest(request.uid)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 text-gray-500 text-xs md:text-sm">
                    No pending requests
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Friends List & Chat */}
        <div className="w-full lg:w-9/12 flex flex-col md:flex-row bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-3 md:p-4 gap-3 md:gap-4">
          {/* Friends List Section */}
          <div className="w-full md:w-1/3 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2 md:mb-3 flex items-center text-sm md:text-base">
              <FaUser className="mr-2 text-blue-500" />
              {isSearching ? <>Search Results</> : <>Friends</>}
            </h3>
            <div className="space-y-2 md:space-y-3 overflow-y-auto max-h-48 sm:max-h-64 md:max-h-96 pr-1">
              {isSearching ? (
                users.length > 0 ? (
                  users.map((person) => {
                    const relationship = getUserRelationship(person.uid);
                    return (
                      <div
                        key={person.uid}
                        className="flex items-center p-2 md:p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
                          {person.photoURL ? (
                            <img
                              src={person.photoURL}
                              alt="User"
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                            />
                          ) : (
                            <span className="text-xl">
                              {person.emoji || "👤"}
                            </span>
                          )}
                        </div>
                        <div className="ml-2 md:ml-3 flex-1">
                          <h2 className="font-medium text-gray-800 text-xs md:text-sm">
                            {person.name}
                          </h2>
                          <div className="flex items-center mt-0.5 md:mt-1">
                            <span className="text-xs text-gray-500">
                              {person.age ? `${person.age} years` : ""}{" "}
                              {person.city ? `• ${person.city}` : ""}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-1 md:mt-2">
                            {relationship === "friend" ? (
                              <button
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => selectFriend(person)}
                              >
                                Chat
                              </button>
                            ) : relationship === "pending" ? (
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                Request Sent
                              </span>
                            ) : relationship === "received" ? (
                              <div className="flex gap-2">
                                <button
                                  className="px-2 md:px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
                                  onClick={() =>
                                    acceptFriendRequest(person.uid)
                                  }
                                >
                                  <FaCheck className="inline mr-1" />
                                  Accept
                                </button>
                                <button
                                  className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                                  onClick={() =>
                                    declineFriendRequest(person.uid)
                                  }
                                >
                                  <FaTimes className="inline mr-1" />
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <button
                                className="px-2 md:px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
                                onClick={() => sendFriendRequest(person.uid)}
                              >
                                <FaUserPlus className="inline mr-1" />
                                Add Friend
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-4 md:py-6 text-gray-500 text-xs md:text-sm">
                    No users found matching "{searchQuery}"
                  </div>
                )
              ) : friends.length > 0 ? (
                friends.map((friend) => (
                  <div
                    key={friend.name}
                    className={`flex items-center p-2 md:p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50 
                ${
                  // selectedFriend?.uid === friend.uid
                  //   ? "bg-blue-50 border border-blue-200"
                  //   : ""

                  //  moods.find((m) => m.label === friendsMoods.find((f) => f.id === friend.uid).latestMood).color

                  (() => {
                    const friendMood = friendsMoods.find(
                      (f) => f.id === friend.uid
                    );
                  

                    if (!friendMood) return "bg-blue-50 border border-blue-200";

                    const moodObj = moods.find(
                      (m) => m.label === friendMood.latestMood
                    );
                
                    const borderIntensity = moodObj?.color.match(/\d+/); // Extract number from class (e.g., "200" from "bg-yellow-200")
                    const borderColor = borderIntensity
                      ? `border-${moodObj.color.split("-")[1]}-${
                          borderIntensity * 4
                        }`
                      : "";
                 

                    return (
                      moodObj?.color || "bg-blue-50 border border-blue-200"
                    );
                  })()
                }
                
                `}
                    onClick={() => selectFriend(friend)}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
                      {friend.photoURL ? (
                        <img
                          src={friend.photoURL}
                          alt="Friend"
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                        />
                      ) : (
                        // <span className="text-lg md:text-xl">{friend.emoji}</span>
                        <span className="text-xl">
                          {(() => {
                            // Find the friend's mood object based on their latest mood
                            const friendMood = friendsMoods.find(
                              (f) => f.id === friend.uid
                            );
                            const mood = moods.find(
                              (m) => m.label === friendMood?.latestMood
                            );

                            // If a mood is found, display its emoji, otherwise default to "👤"
                            return mood ? mood.emoji : "👤";
                          })()}
                        </span>
                      )}
                    </div>
                    <div className="ml-2 md:ml-3 flex-1">
                      <h2 className="font-medium text-gray-800 text-xs md:text-sm">
                        {friend.name}
                      </h2>
                      <div className="flex items-center mt-0.5 md:mt-1">
                        <span className="text-xs text-gray-500">
                          {/* {friend.age} years • {friend.city} */}
                          Latest mood:{" "}
                          <span className="text-slate-950">
                            {friendsMoods.find((f) => f.id === friend.uid)
                              ?.latestMood || "No mood available"}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs rounded-full px-2 py-0.5 ${
                            friend.status == "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {friend.status == "active" ? "Active" : "Away"}
                        </span>
                        {unreadCounts[friend.uid] > 0 && (
                          <span className="bg-red-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                            {unreadCounts[friend.uid]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 md:py-6 text-gray-500 text-xs md:text-sm">
                  No friends yet. Search to find people to connect with!
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="w-full md:w-2/3 rounded-xl border-t mt-3 pt-3 md:border-t-0 md:border-l md:mt-0 md:pt-0 md:pl-4 flex flex-col h-full border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center text-sm md:text-base">
                <FaComment className="mr-2 text-pink-500" />
                Chat
              </h3>
              {selectedFriend && (
                <button className="text-gray-400 hover:text-gray-600 bg-red-200 w-28 text-sm rounded-md" onClick={() => {
                  const confirmRemove = window.confirm(`Are you sure you want to remove ${selectedFriend.name} from your friends?`);
                  if (confirmRemove) {
                    handleRemoveFriend(selectedFriend);
                  }
                }}>
                  {/* <FaEllipsisH /> */}
                  Remove friend
                </button>
              )}
            </div>

            {selectedFriend ? (
              <div className="flex flex-col h-64 sm:h-80 md:h-96">
                <div className="bg-gray-50 rounded-t-xl p-2 md:p-3 flex items-center border-b border-gray-100">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md">
                    {selectedFriend.photoURL ? (
                      <img
                        src={selectedFriend.photoURL}
                        alt="Friend"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-base md:text-lg">
                        {selectedFriend.emoji || "😊"}
                      </span>
                    )}
                  </div>
                  <div className="ml-2 md:ml-3">
                    <h2 className="font-medium text-gray-800 text-xs md:text-sm">
                      {selectedFriend.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                          selectedFriend.status == "active"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span className="text-xs text-gray-500">
                        {selectedFriend.status == "active"
                          ? "Online"
                          : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  id="chatContainer"
                  className="flex-1 bg-gray-50 p-2 md:p-3 overflow-y-auto"
                >
                  {messages.length > 0 ? (
                    <div className="space-y-2 md:space-y-3">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.senderId == user.uid
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-2 md:p-3 rounded-2xl ${
                              message.senderId == user.uid
                                ? "rounded-tr-none bg-blue-500"
                                : "rounded-tl-none bg-white"
                            } shadow-sm max-w-[75%] md:max-w-xs`}
                          >
                            <p
                              className={`${
                                message.senderId == user.uid
                                  ? "text-white"
                                  : "text-gray-800"
                              } text-xs md:text-sm`}
                            >
                              {message.text}
                            </p>
                            <p
                              className={`text-[10px] md:text-xs ${
                                message.senderId === user.uid
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              } text-right mt-1`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                      {friendTyping[selectedFriend.uid] && (
                        <div className="flex justify-start mb-2 md:mb-3">
                          <div className="max-w-xs rounded-xl p-2 md:p-3 bg-gray-100 text-gray-800">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                          <FaComment className="text-blue-500 text-lg md:text-xl" />
                        </div>
                        <h3 className="mt-2 md:mt-3 text-gray-600 font-medium text-sm md:text-base">
                          Start a conversation
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          Say hello to {selectedFriend.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl flex items-center p-2 mt-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none text-xs md:text-sm px-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyUp={handleTyping}
                  />
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium"
                    onClick={(e) => sendMessage(e)}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-50 rounded-xl">
                <div className="text-center p-3 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaComment className="text-gray-400 text-lg md:text-xl" />
                  </div>
                  <h3 className="text-gray-500 font-medium text-sm md:text-base">
                    Select a friend to start chatting
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">
                    Choose from your friends list or search for new people to
                    connect with
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
