import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {socketInit, sendMessage } from '../../services/websocket';
import styles from './Chat.module.css';

function Chat({loginData}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{username:"Atul", message:"Hey, How are you?"},
        {username:"Atul", message:"Hey, How are you doing?"},
        {username:"Atul", message:"Hey, How are you?"},{username:"Atul", message:"Hey, How are you doing?"},
        {username:"Atul", message:"Hey, How are you?"},{username:"Atul", message:"Hey, How are you doing?"}]);
    const [username, setUsername] = useState('User');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(['Alice', 'Bob', 'Charlie']);

    useEffect(() => {
        const socket=socketInit(loginData?.accessToken);
       socket.on('join',(data)=>{
        console.log(data);
       })
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                setMessages((prev) => [...prev, data]);
            }
        };
    }, []);

    const handleSendMessage = () => {
        sendMessage(username, message);
        setMessage('');
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessages([]);
    };

    return (
        <div className={styles.container}>
            <Sidebar users={users} onUserSelect={handleUserSelect} />
            <div className={styles.main}>
                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <p key={index} className={styles.message}>
                            <strong>{msg.username}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <div className={styles.msgInput}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={styles.input}
                    />
                    <button className={styles.sendBtn} onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
