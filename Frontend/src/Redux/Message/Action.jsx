import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

import { uploadFileToFirebase } from "../../FirebaseService";

const BASE_API_URL = "http://localhost:8080";

export const createMessage = (messageData) => async(dispatch) => {

    try{

        if(messageData?.data?.type=="image"){

            const fileUrl = await uploadFileToFirebase(messageData.data.content);
            messageData.data.content = fileUrl;
            
            const res = await fetch(`${BASE_API_URL}/api/messages/create?senderUserId=${messageData.senderUserId}`,{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                    // Authorization: `Bearer ${messageData.token}`
                },
                body: JSON.stringify(messageData.data)
            }
            );
    
            const data = await res.json();
            console.log("message created --- ", data);
            dispatch({type:CREATE_NEW_MESSAGE, payload: data})
        }
        else{
        const res = await fetch(`${BASE_API_URL}/api/messages/create?senderUserId=${messageData.senderUserId}`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
                // Authorization: `Bearer ${messageData.token}`
            },
            body: JSON.stringify(messageData.data)
        }
        );

        const data = await res.json();
        console.log("message created --- ", data);
        dispatch({type:CREATE_NEW_MESSAGE, payload: data})
    }

    }catch(error){
        console.log("catch error", error);
    }
} 


export const getAllMessages = (reqData) => async(dispatch) => {

    try{
        const res = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}?userId=${reqData.userId}`,{
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
                // Authorization: `Bearer ${reqData.token}`
            }
        }
        )

        const data = await res.json();
        console.log("all messages ----------------- ", data);
        dispatch({type:GET_ALL_MESSAGE, payload: data})

    }catch(error){
        console.log("catch error", error);
    }
} 




