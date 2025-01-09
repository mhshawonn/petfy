// chatActions.js
export const createChat = (data) => {
    return {
      type: "CREATE_CHAT",
      payload: data,
    };
  };
  
  export const getUsersChat = (data) => {
    return {
      type: "GET_USERS_CHAT",
      payload: data,
    };
  };
  