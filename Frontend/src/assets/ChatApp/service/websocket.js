// hooks/useWebSocket.js
import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const useWebSocket = (token, currentChat, onMessageReceive) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnect, setIsConnect] = useState(false);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const temp = Stomp.over(socket);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookies("XSRF-TOKEN"),
    };

    temp.connect(headers, 
      () => setIsConnect(true),
      (error) => {
        console.error("WebSocket error:", error);
        setIsConnect(false);
      }
    );
    setStompClient(temp);
  };

  useEffect(() => {
    connect();
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isConnect && stompClient && currentChat) {
      const subscription = stompClient.subscribe(
        `/group/${currentChat.id}`,
        onMessageReceive
      );
      return () => subscription.unsubscribe();
    }
  }, [isConnect, stompClient, currentChat]);

  return { stompClient, isConnect };
};