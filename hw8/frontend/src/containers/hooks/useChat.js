import { createContext, useContext, useState, useEffect } from "react";
import { message } from 'antd'

const LOCALSTORAGE_KEY = 'save-me'; // can randomly name the key.
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: () => {},
});
const client = new WebSocket('ws://localhost:4000')
client.onopen = () => console.log("Backend socket server connected!")

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    
    useEffect(() => {
        if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    const clearMessages = () => {
        sendData({type: "clear"});
    }

    const startChat = (name, to) => {
        if (!name || !to) throw new Error('Name or to required.')

        sendData({
            type: "CHAT",
            payload: { name, to },
        })
    }

    // const sendMessage = (payload) => {
    //     // ... // update messages and status
    //     // setMessages([...messages, payload]);
    //     // setStatus({type: "success", msg: "Message sent!"});
    //     console.log(payload);
    //     sendData(["input", payload]);
    // }

    const sendMessage = ({name, to, body}) => {
        if (!name || !to || !body)
            throw new Error('Name or to or body required.')
        sendData({
            type: "MESSAGE",
            payload: { name, to, body },
        })
    }

    const displayStatus = (s) => {
        if (s.msg) {
          const { type, msg } = s;
          const content = {
            content: msg, duration: 0.5 }
          switch (type) {
          case 'success':
            message.success(content)
            break
          case 'error':
          default:
            message.error(content)
            break
        }}}

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        
        switch (task) {
            case "init": {
                setMessages(payload)
                break;
            }
            case "output": {
                setMessages(() => [...messages, ...payload]); 
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            case "status": { setStatus(payload); break; }
            default: {break;}
        }
    }

    return (
        <ChatContext.Provider
        value={{
        status, me, signedIn, messages, setMe, setSignedIn,
        startChat, sendMessage, clearMessages, displayStatus
        }}
        {...props}
        />
    )
};

const useChat = () => useContext(ChatContext)

export { ChatProvider, useChat };