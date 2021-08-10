import { Avatar, Box, Button, Container, Heading, Input } from "@chakra-ui/react";
import React, {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";

import ChatDataService from "../services/chat-data";

// pass in the chat id!; then check if the user is part of the chat and then get the chat and display the rest
// show it in simple boxes (google for sth like bootstrap chat)

const Message = props => {
    return(
        <div className="col-lg-6 offset-3">
        {props.message.sender._id === props.user._id ? (
            <div className="d-flex flex-row justify-content-end mb-4">
              <div className="p-3 me-3 border" style={{borderRadius: "15px", backgroundColor: "#fbfbfb"}}>
                <p className="small mb-0">{props.message.content}</p>
              </div>
              <Avatar src={props.message.sender.picture && `data:${props.message.sender.picture.contentType};base64,${Buffer.from(props.message.sender.picture.data.data).toString('base64')}`} />
            </div>
        ) : (
            <div className="d-flex flex-row justify-content-start mb-4">
              <Avatar src={props.message.sender.picture && `data:${props.message.sender.picture.contentType};base64,${Buffer.from(props.message.sender.picture.data.data).toString('base64')}`} />
              <div className="p-3 ms-3" style={{borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)"}}>
                <p className="small mb-0">{props.message.content}</p>
              </div>
            </div>
        )}
        </div>
    )
}

const Chat = props => {
    const [chat, setChat] = useState({product: ""});
    const [otherUser, setOtherUser] = useState([]);
    const messageRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const getChat = async (chatId, uid) => {
            try {
                const response = await ChatDataService.getById(chatId, uid);
                setOtherUser(response.data.lender._id === props.user._id ? response.data.borrower : response.data.lender);
                setChat(response.data);
            } catch(e) {
                console.log("Error in get transactions by lender/borrower: ", e);
            }
        }
        getChat(props.match.params.id, props.user.uid);
    }, [props.match.params.id, props.user._id, props.user.uid, history]);

    const onSendMessage = async () => { //this is exactly the same code as in product; maybe connect it somehow so I don't need to change everything twice
        try {
            const chatRequest = {
                uid: props.user.uid,
                chatId: chat._id,
                content: messageRef.current.value,
            };
            await ChatDataService.sendMessage(chatRequest);
            window.location.reload();//very ugly, see how I can somehow make an instant chat out of that
        } catch(e) {
            console.log("Failed to send message: ", e)
        }
    }

    return(
        <Container mawW="container.xl">
            <Box>
                <Heading>Chat with {otherUser.name} about {chat.product.name}</Heading>
                <Box>
                    {chat.messages && chat.messages.map(message => <Message user={props.user} message={message} key={message._id}/>)}
                </Box>
                <Box>
                    <Input type="text" ref={messageRef} />
                    <Button onClick={onSendMessage}>Send</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Chat;


    // <>
    //     <h2>Chat with {otherUser.name} because of product {chat.product.name}</h2>
    //     {chat.messages && chat.messages.map(message => <Message user={props.user} message={message} key={message._id}/>)}
    //     <div className="col-lg-6 offset-3">
    //         <input type="text" ref={messageRef} />
    //         <Button onClick={onSendMessage}>Send</Button>
    //     </div>
    // </>
