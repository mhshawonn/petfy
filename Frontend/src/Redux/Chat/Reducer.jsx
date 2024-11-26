import { CREATE_CHAT,  GET_USERS_CHAT } from "./ActionType"

const initialValue = {
    chats: [],
    createChat: null
}

export const chatReducer = (store=initialValue, {type, payload}) => {

    if(type===CREATE_CHAT){
        return { ...store, createChat: payload}
    }
    else if (type === GET_USERS_CHAT ){
        return {...store, chats:payload};
    }
    else{
        return store;
    }
}

