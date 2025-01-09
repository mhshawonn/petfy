// messageActions.js
export const createMessage = (data) => {
    return {
      type: "CREATE_MESSAGE",
      payload: data,
    };
  };
  
  export const getAllMessages = (data) => {
    return {
      type: "GET_ALL_MESSAGES",
      payload: data,
    };
  };
  