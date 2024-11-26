import { CREATE_CHAT,  GET_USERS_CHAT } from "./ActionType"


const BASE_API_URL = "http://localhost:8080";


export const createChat =(chatData) => async(dispatch) =>{

    try{
        const res = await fetch(`${BASE_API_URL}/api/chats/single?reqUserId=${chatData.reqUserId}&otherUserId=${chatData.otherUserId}`, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
            // Authorization: `Bearer ${chatData.token}`
        },

    
    });

        const data = await res.json();
        console.log("create chat : ", data);
        dispatch({type:CREATE_CHAT, payload:data});
        
    } catch (error){
        console.log("catch error ", error);
    }
}



export const getUsersChat =(chatData) => async(dispatch) =>{

    try{
        const res = await fetch(`${BASE_API_URL}/api/chats/user?id=${chatData.id}`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json"
            // Authorization: `Bearer ${chatData.token}`
        },

        });

        const data = await res.json();
        console.log("users chat : ", data);
        dispatch({type:GET_USERS_CHAT, payload:data});
        
    } catch (error){
        console.log("catch error ", error);
    }
}