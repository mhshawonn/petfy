
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

const BASE_API_URL = "http://localhost:8080";


//not used
export const register = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json();

        if (resData.jwt) {
            localStorage.setItem("token", resData.jwt);
        }

        console.log("register ", resData);
        dispatch({ type: REGISTER, payload: resData });

    } catch (error) {
        console.log("caught error ", error);
    }
}



//not used
export const login = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json();

        if (resData.jwt) {
            localStorage.setItem("token", resData.jwt);
        }

        console.log("login ", resData);
        dispatch({ type: LOGIN, payload: resData });

    } catch (error) {
        console.log("caught error ", error);
    }
}



//this one needed to be fixed
export const currentUser = (token) => async (dispatch) => {

    // console.log(" current user id : ", id);

    try {
        const res = await fetch(`${BASE_API_URL}/user/get_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        })

        const resData = await res.json();
        console.log("current User ", resData);
        dispatch({ type: REQ_USER, payload: resData });

    } catch (error) {
        console.log("caught error ", error);
    }
}




//this one needed to be fixed
export const searchUser = (data) => async (dispatch) => {
    console.log("searchUser invoked, data --> "  + data);
    try {
        const res = await fetch(`${BASE_API_URL}/user/search?name=${data.keyword}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${data.token}`
            },

        })

        const resData = await res.json();
        console.log("search User ", resData);
        dispatch({ type: SEARCH_USER, payload: resData });

    } catch (error) {
        console.log("caught error ", error);
    }
}


export const updateUser = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`
            },

        })

        const resData = await res.json();
        console.log("current User ", resData);
        dispatch({ type: UPDATE_USER, payload: resData });

    } catch (error) {
        console.log("caught error ", error);
    }
}


export const LogoutAction = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: REQ_USER, payload: null });
}


