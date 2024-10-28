import React, { useEffect, useState, useRef } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const user = useSelector(state => state.user.user);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState(null); // Manage WebSocket state
  const msgRef = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  const handleSend = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ username: user || "Anonymous", text: msg, time }));
      setMsg('');
    }
  };

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Connected');
      setLoading(false);
    };

    websocket.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);
      if (Array.isArray(newMessages)) {
        // If it's an array, it means we're receiving all previous messages
        setMessages(newMessages);
      } else {
        // If it's a single message, append it to the current messages
        setMessages(prevMessages => [...prevMessages, newMessages]);
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    const current = msgRef.current
    if (current) {
      current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="top flex mt-2 justify-between mx-2 md:px-7 lg:px-48 items-center">
            <div className="user">
              {user || "Anonymous"}
            </div>
            <div className="btn">
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className='md:h-14 w-24'
              >
                Logout
              </Button>
            </div>
          </div>
          <div className='w-[90%] mx-auto text-white border border-white h-[70vh] overflow-y-auto p-4'>
            {messages.length > 0 ? messages.map((item, index) => (
              <div className='flex  justify-between items-center' key={index}>
                <div className='flex flex-wrap w-[70%]'>
                  <div>{item.username}: </div>
                  <div className='text-wrap'>{item.text}</div>
                </div>
                <span>{item.time}</span>
              </div>
            )) : <div>No messages yet.</div>}
            <div ref={msgRef}></div>
          </div>
          <div className="input absolute w-full bottom-0 p-4 md:flex md:justify-center md:gap-2">
            <FloatingLabel
              controlId="floatingInput"
              label={user || "Anonymous"}
              className="mb-3 text-black md:w-[70%]"
            >
              <Form.Control
                className='text-black'
                type="text"
                placeholder="Enter Message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
            </FloatingLabel>
            <Button
              className='h-12 w-full md:w-28 md:h-14'
              variant="outline-info"
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;