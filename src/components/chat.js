import React, {useState, useEffect, useRef} from "react";
import {Button} from "react-bootstrap";

import ChatDataService from "../services/chat-data";

// pass in the chat id!; then check if the user is part of the chat and then get the chat and display the rest
// show it in simple boxes (google for sth like bootstrap chat)

const Message = props => {
    return(
        <div className="col-lg-6 offset-3">
        {props.message.sender === props.user._id ? (
            <div class="d-flex flex-row justify-content-end mb-4">
              <div class="p-3 me-3 border" style={{borderRadius: "15px", backgroundColor: "#fbfbfb"}}>
                <p class="small mb-0">{props.message.content}</p>
              </div>
              <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava2-bg.png" alt="avatar 1" 
                style={{width: "45px", height: "100%"}} /> {/*replace with profile photo later*/}
            </div>
        ) : (
            <div class="d-flex flex-row justify-content-start mb-4">
              <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava1-bg.png" alt="avatar 1"
                style={{width: "45px", height: "100%"}} />
              <div class="p-3 ms-3" style={{borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)"}}>
                <p class="small mb-0">{props.message.content}</p>
              </div>
            </div>
        )}
        </div>
    )
}

const Chat = props => {
    const [chat, setChat] = useState([]);
    const [otherUser, setOtherUser] = useState([]);
    const messageRef = useRef();

    useEffect(() => {
        const getChat = async chat_id => {
            try {
                const response = await ChatDataService.getById(chat_id);
                setOtherUser(response.data.lender === props.user._id ? response.data.borrower : response.data.lender);
                setChat(response.data);
            } catch(e) {
                console.log("Error in get transactions by lender/borrower: ", e);
            }
        }
        getChat(props.match.params.id);
    }, [props.match.params.id])

    const onSendMessage = async () => { //this is exactly the same code as in product; maybe connect it somehow so I don't need to change everything twice
        try {
            const chatRequest = {
                user_uid: props.user.uid,
                item_id: chat.item_id,
                content: messageRef.current.value,
            };
            await ChatDataService.sendMessage(chatRequest);
            window.location.reload();//very ugly, see how I can somehow make an instant chat out of that
        } catch(e) {
            console.log("Failed to send message: ", e)
        }
    }

    return(
    <>
        <h2>Chat with {otherUser} because of product {chat.item_id}</h2>
        {chat.messages && chat.messages.map(message => <Message user={props.user} message={message}/>)}
        <div className="col-lg-6 offset-3">
            <input type="text" ref={messageRef} />
            <Button onClick={onSendMessage}>Send</Button>
        </div>
    </>
    )
}

export default Chat;
