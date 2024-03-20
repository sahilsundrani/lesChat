import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
	const { selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
		  newMessage.shouldShake = true;
		  const sound = new Audio(notificationSound);
		  sound.play();
	  
		  // Check the condition before adding the new message
		  if (
			(newMessage.senderId === selectedConversation._id &&
			  newMessage.receiverId === authUser._id) ||
			(newMessage.senderId === authUser._id &&
			  newMessage.receiverId === selectedConversation._id)
		  ) {
			sound.play();
			setMessages([...messages, newMessage]); // Add only if condition is true
		  }
		});
	  
		return () => socket?.off("newMessage");
	  }, [socket, setMessages, messages, selectedConversation._id, authUser._id]);
	  
};
export default useListenMessages;

// import React, { useEffect } from 'react'
// import  {useSocketContext} from "../context/SocketContext"
// import  useConversation from "../zustand/useConversation"

// const useListenMessages = () => {
//     const {socket} = useSocketContext();
//     const {messages, setMessages} = useConversation();

    // useEffect(() => {
	// 	socket?.on("newMessage", (newMessage) => {
	// 		newMessage.shouldShake = true;
	// 		const sound = new Audio(notificationSound);
	// 		sound.play();
	// 		setMessages([...messages, newMessage]);
	// 	});

	// 	return () => socket?.off("newMessage");
	// }, [socket, setMessages, messages]);

// }

// export default useListenMessages