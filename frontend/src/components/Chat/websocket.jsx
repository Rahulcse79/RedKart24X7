import { useEffect, useRef } from 'react';

const url = "ws://localhost:4000";

const useWebSocket = ( onMessage, action, user) => {
  const socket = useRef(null);

  useEffect(() => {
    if (!action) {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
        console.log('WebSocket disconnected due to action=false');
      }
      return;
    }

    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log('Connected to WebSocket server');

      if (user) {
        socket.current.send(JSON.stringify({ type: 'user_connect', payload: user }));
      }
    };

    socket.current.onmessage = (event) => {
      console.log('Message from server:', event.data);
      if (onMessage) onMessage(event.data);
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
        console.log('WebSocket connection closed due to cleanup');
      }
    };
  }, [url, action, user, onMessage]);

  const sendMessage = (msg) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(msg);
    } else {
      console.log('WebSocket is not open.');
    }
  };

  return { sendMessage };
};

export default useWebSocket;
