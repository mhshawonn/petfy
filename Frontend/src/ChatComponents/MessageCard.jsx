import React from 'react'

const MessageCard = ({ isReqUserMessage, content ,type}) => {
    return (
        <>
        {type === "image" &&
            <div className={` py-2 px-2 rounded-md max-w-[50%] 
                            ${isReqUserMessage ? " self-start bg-white" : " self-end bg-[#d9fdd3]"}`}>
                <img src={content} alt="image" className="w-[200px] h-[200px] object-cover"/>
            </div>
        }

        {(type ==="text" || type==null) &&
            <div className={` py-2 px-2 rounded-md max-w-[50%] 
                            ${isReqUserMessage ? " self-start bg-white" : " self-end bg-[#d9fdd3]"}`}>
            <p>{content}</p>
        </div>
        }
        </>
    )
}

export default MessageCard
