import { Avatar, Box, Button, Container, Heading, HStack, Input, Flex, Text, VStack, Divider } from "@chakra-ui/react";
import React, {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";

import ChatDataService from "../services/chat-data";

// pass in the chat id!; then check if the user is part of the chat and then get the chat and display the rest
// show it in simple boxes (google for sth like bootstrap chat)

const Message = props => {
    return(
        <Box w="100%">
        {props.message.sender._id === props.user._id ? (
            <Flex justify="flex-end">
              <Flex p={2} mx={3} borderRadius="xl" bg="green.200" textAlign="center" align="center">
                <Text fontSize="sm">{props.message.content}</Text>
              </Flex>
              <Avatar src={props.message.sender.picture && `data:${props.message.sender.picture.contentType};base64,${Buffer.from(props.message.sender.picture.data.data).toString('base64')}`} />
            </Flex>
        ) : (
            <Flex justify="flex-start">
              <Avatar src={props.message.sender.picture && `data:${props.message.sender.picture.contentType};base64,${Buffer.from(props.message.sender.picture.data.data).toString('base64')}`} />
              <Flex p={2} mx={3} borderRadius="xl" bg="blue.200" textAlign="center" align="center">
                <Text fontSize="sm">{props.message.content}</Text>
              </Flex>
            </Flex>
        )}
        </Box>
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
            <Box marginTop={4} borderRadius="xl" border="1px" p={4} borderColor="gray.300">
                <VStack>
                    <Heading size="lg">Chat with {otherUser.name} about {chat.product.name}</Heading>
                    <Divider color="gray.400" />
                    <Box w="100%">
                        <VStack spacing={4}>
                            {chat.messages && chat.messages.map(message => <Message user={props.user} message={message} key={message._id}/>)}
                        </VStack>
                    </Box>
                    <HStack marginTop={4} w="100%">
                        <Input borderColor="gray.400" type="text" ref={messageRef} />
                        <Button onClick={onSendMessage}>Send</Button>
                    </HStack>
                </VStack>
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
