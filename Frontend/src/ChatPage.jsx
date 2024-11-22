import React, { useState } from 'react'
// import { TbCircleDashed } from "react-icons/tb"
// import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineSearch } from "react-icons/ai"
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from "react-icons/bs"
import { ImAttachment } from "react-icons/im"
import ChatCard from './ChatComponents/ChatCard'
import MessageCard from './ChatComponents/MessageCard'
import "./ChatComponents/ChatPage.css"
import { useNavigate } from 'react-router-dom'
// import Profile from './Profile'
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import CreateGroup from './Group/CreateGroup'
import { useDispatch, useSelector } from 'react-redux'
import {  searchUser } from './Redux/Auth/Action'
import { useEffect } from 'react'
import { currentUser } from './Redux/Auth/Action'
import { createChat, getUsersChat } from './Redux/Chat/Action'
// import { createGroup } from '../Redux/Chat/Action'
import { createMessage, getAllMessages } from './Redux/Message/Action'


import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs';
// import { Client } from '@stomp/stompjs';




const ChatPage = () => {

    const [queries, setQueries] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [content, setContent] = useState("");
    const [isProfile, setIsProfile] = useState(false);
    const navigate = useNavigate();
    const [isGroup, setIsGroup] = useState(false);
    const dispatch = useDispatch();
    const { auth, chat, message } = useSelector(store => store);
    const token = localStorage.getItem("authToken"); // get token from local storage
    const [userId, setUserId]= useState(null); //added

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const [stompClient, setStompClient] = useState(null);
    const [isConnect, setIsConnect] = useState(false);
    const [messages, setMessages] = useState([]);
    

    // for real time chatting
    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        const temp = Stomp.over(socket);

        // setStompClient(temp);

        // const client = new Client({
        //     webSocketFactory: () => socket,
        //     reconnectDelay: 1000,
        //     debug: (str) => {
        //         console.log(str);
        //     },
        // });


        const headers = {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": getCookies("XSRF-TOKEN")
        }


        temp.connect(headers, onConnect, onError);
        setStompClient(temp);

        // client.onConnect = (frame) => {
        //     console.log('Connected: ' + frame);
        //     setIsConnect(true);
        //     // Subscribe to your topic here
        // };

        // client.onStompError = (frame) => {
        //     console.error('Broker reported error: ' + frame.headers['message']);
        //     console.error('Additional details: ' + frame.body);
        // };

        // client.activate();
        // setStompClient(client);
    }



    function getCookies(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    const onError = (error) => {
        console.log("stomp error-----> ", error);
        setIsConnect(false);
    }


    const onConnect=()=>{
        console.log("----------stomp connected----------");
        setIsConnect(true);
    }

    useEffect(() => {

        if(message.newMessage && stompClient){
            setMessages(prevMessages => [...prevMessages, message.newMessage]);

            console.log("new message sent ------------------ ", message.newMessage);

            stompClient.send("/app/message", {} ,JSON.stringify(message.newMessage));

            // stompClient.publish({
            //     destination: '/app/message',
            //     body: JSON.stringify(message),
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });
        
        }
        else{
            console.log("no new message");
        }

    }, [message.newMessage]);


    useEffect(() => {

        console.log("message updated ------------------ ", message.messages);
        if (message.messages) {
            setMessages(message.messages);
        }
        console.log("set messages  ------------------ ", messages);
    }, [message.messages]);


    const onMessageReceive = (payload) => {
        console.log("receive message ------------------ ", JSON.parse(payload.body));

        const receivedMessage = JSON.parse(payload.body);

        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, receivedMessage];
            console.log("updated messages ------------------ ", updatedMessages);
            return updatedMessages;
        });

    }



    useEffect(() => {
        if(isConnect && stompClient && auth.reqUser && currentChat){
            const subscription = stompClient.subscribe(`/group/${currentChat.id}`, onMessageReceive);

            console.log("subscribed---------------------");

            return () => {
                subscription.unsubscribe();
            }
        }
    }, [isConnect, stompClient, auth.reqUser, currentChat]);
    

    useEffect(() => {
        connect();
    }, []);




    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleCreateGroup = () => {

    //     setIsGroup(true);
    // }

    const handleClickOnChatCard = (other_userId) => {
        // setCurrentChat(item);
        // console.log(userId, " ---- ", item);
        dispatch(createChat({ reqUserId: userId, otherUserId: other_userId }));
        setQueries("");
    }

    const handleSearch = (keyword) => {
        dispatch(searchUser({ keyword, token }));
    }

    const handleCreateNewMessage = () => {
        dispatch(createMessage({
            senderUserId: userId,
            data: { chatId: currentChat?.id, content: content }
        }));
        console.log("new message created");
    }

    useEffect(() => {

        if(userId != null){
            dispatch(getUsersChat({ id: userId, token: token }));
        }
        else{
            console.log("no user id found to get chat");
        }
        

    }, [chat?.createChat]);

    useEffect(() => {

        if (currentChat?.id) {
            dispatch(getAllMessages({ chatId: currentChat?.id, userId: userId, token: token}));
        }

    }, [currentChat, message.newMessage])



    const handleNavigate = () => {

        // setIsProfile(true);
        console.log("navigate to profile ---- not built yet");
    }

    const handleCloseOpenProfile = () => {
        // setIsProfile(false);

        console.log("undecided whether to build or not");
    }

    // const handleLogOut = () => {
    //     dispatch(LogoutAction())
    //     navigate("/signup");
    // }

    useEffect(() => {
        if (!auth?.reqUser) {
            console.log("------no user found-----");
            navigate("../signup");
        }
    }, [auth?.reqUser, navigate]);

    useEffect(() => {

        
        //get user id from token
        if(token){
            dispatch(currentUser(token))
            setUserId(auth?.reqUser?.id);
        }
        else{
            // navigate("/signup");

            console.log("no token");
        }

        
    }, [token]);

    const handleCurrentChat = (item) => {
        setCurrentChat(item);
    }

    console.log("===============================");
    console.log("token : ", token);
    console.log("current chat", currentChat);
    console.log("messages --- ", messages);
    console.log("stomp client --- ", stompClient);
    console.log("is connect --- ", isConnect);
    console.log("auth user --- ", auth.reqUser);
    console.log("===============================");

    return (
        <div className='relative'>
            <div className=' w-full py-14 bg-[#00a884] '></div>
            <div className='flex bg-[#f0f2f5] h-[90vh]  w-[96vw] absolute left-[2vw] top-[5vh] '>
                <div className='left w-[30%] bg-[#e8e9ec] h-full '>


                    {/* Profile */}
                    {/* {isProfile && <Profile handleCloseOpenProfile={handleCloseOpenProfile} />} */}

                    {!isProfile && !isGroup &&
                        <div className='w-full'>


                            <div className='flex justify-between items-center p-3'>

                                <div className=' flex items-center space-x-3'>
                                    <img
                                        onClick={handleNavigate}
                                        className='rounded-full w-10 h-10 cursor-pointer'
                                        src='https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg'
                                        alt='' />
                                    <p>{auth.reqUser?.name}</p>
                                </div>



                                {/* <div className='space-x-3 test-2xl flex'>
                                    <TbCircleDashed
                                        className=' cursor-pointer'
                                        onClick={() => navigate("/status")} />
                                    <BiCommentDetail />

                                    <div>
                                        <BsThreeDotsVertical
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >

                                        </BsThreeDotsVertical>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                        </Menu>

                                    </div>



                                </div> */}


                            </div>
                            

                            <div className=' relative flex justify-center items-center bg-white py-4 px-3'>
                                <input className=' border-none outline-none bg-slate-200 rounded-md w-[93%] pl-7 py-2'
                                    type='text'
                                    placeholder='Search or Start new Chat'
                                    onChange={(e) => {
                                        setQueries(e.target.value)
                                        handleSearch(e.target.value)
                                    }}
                                    value={queries}
                                />

                                <AiOutlineSearch className='left-4 top-7 absolute' />
                                <div>
                                    <BsFilter className=" ml-4 text-3xl" />
                                </div>

                            </div>

                            {/* all users search */}
                            <div className=' bg-white overflow-y-scroll h-[72vh] px-3'>


                                {queries && auth?.searchUser?.filter(item => item?.id !== userId).map((item) =>
                                    <div onClick={() => handleClickOnChatCard(item?.id)}>
                                        <hr />
                                        <ChatCard
                                            name={item?.name}
                                            userImg={item?.profilePic ||
                                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                                    </div>
                                )}




                                {chat.chats.length > 0
                                    && !queries &&
                                    chat.chats?.map((item) =>
                                        <div onClick={() => handleCurrentChat(item)}>
                                            <hr />
                                            {item.isGroup ?
                                                (
                                                    <ChatCard
                                                        name={item?.chat_name}
                                                        userImg={item?.chat_image ||
                                                            'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png'}
                                                    />
                                                ) :
                                                (
                                                    <ChatCard
                                                        isChat={true}
                                                        name={
                                                            auth.reqUser?.id !== item.users[0]?.id ?
                                                                item.users[0]?.name : item.users[1]?.name
                                                        }
                                                        userImg={
                                                            auth.reqUser?.id !== item.users[0]?.id ?
                                                                item.users[0]?.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                                                : item.users[1]?.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                                        }
                                                    />
                                                )


                                            }
                                        </div>
                                    )}

                            </div>

                        </div>
                    }

                </div>

                {/* default page */}
                {!currentChat && <div className=' w-[70%] flex flex-col items-center justify-center h-full'>

                    <div className=' max-w-[70%] text-center '>
                        <img src='https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg'
                            alt=''
                            className=' blur-sm'
                        />
                        <h1 className=' text-4xl text-gray-600 pt-2'>Pet Chat</h1>
                        <p className=' my-9'>Experience the effortless connection with PetChat's friendly and intuitive interface</p>

                    </div>
                </div>}

                {/* chat part */}

                {currentChat && <div className='w-[70%] relative  bg-blue-200'>

                    <div className=' header absolute top-0 w-full bg-[#f0f2f5]'>
                        <div className='flex justify-between'>
                            <div className=' py-3 space-x-3 flex items-center px-3'>
                                <img className=' w-10 h-10 rounded-full'
                                    src={currentChat.isGroup ?
                                        currentChat?.chat_image ||
                                        "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png" :
                                        (auth.reqUser?.id !== currentChat?.users[0]?.id ?
                                            currentChat?.users[0]?.profile_pic ||
                                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                            :
                                            currentChat?.users[1]?.profile_pic ||
                                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
                                    } alt='' />
                                <p>
                                    {currentChat.isGroup ? currentChat.chat_name :
                                        (auth?.reqUser?.id === currentChat?.users[0]?.id ?
                                            currentChat.users[1]?.fullname : currentChat.users[0]?.fullname)
                                    }
                                </p>
                            </div>
                            <div className=' py-3 space-x-3 flex items-center px-3 '>
                                <AiOutlineSearch />
                                <BsThreeDotsVertical />
                            </div>
                        </div>
                    </div>


                    {/* single message section */}
                    <div className=' px-10 h-[85%] overflow-y-scroll'>
                        <div className=' space-y-1 flex flex-col justify-center mt-20 py-2'>
                            {messages?.length > 0
                                && messages?.map((item, i) =>
                                    <MessageCard isReqUserMessage={item?.user?.id === auth?.reqUser?.id} 
                                    content={item?.content} />)}
                        </div>
                    </div>


                    {/* footer part */}
                    <div className=' footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl '>

                        <div className=' flex justify-between items-center px-2 relative '>

                            <BsEmojiSmile className=' cursor-pointer' />
                            <ImAttachment />


                            <input className=' text-lg py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%] '
                                type='text' onChange={(e) => setContent(e.target.value)}
                                placeholder='Type Message'
                                value={content}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCreateNewMessage();
                                        setContent("");
                                    }
                                }}
                            ></input>

                            <BsMicFill />

                        </div>

                    </div>


                </div>}

            </div>


        </div>
    )
}

export default ChatPage