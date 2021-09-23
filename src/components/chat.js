import { Avatar, Box, Button, Container, Heading, HStack, Input, Flex, Text, VStack, Divider } from "@chakra-ui/react";
import React, {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation();

    const [chat, setChat] = useState({product: ""});
    const messageRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const getChat = async (chatId, uid) => {
            try {
                const response = await ChatDataService.getById(chatId, uid);
                setChat(response.data);
            } catch(e) {
                console.log("Error in get chat by Id: ", e);
            }
        }
        getChat(props.match.params.id, props.user.uid);
    }, [props.match.params.id, props.user._id, props.user.uid, history]);

    const onSendMessage = async () => { //this is exactly the same code as in product; maybe connect it somehow so I don't need to change everything twice
        try {
            const chatRequest = {
                uid: props.user.uid,
                recipientId: props.user._id === chat.personA?._id ? chat.personB?._id : chat.personA?.id,
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
                    <Heading size="lg">{t("chat.Chat with ")}{props.user._id === chat.personA?._id ? chat.personB?.name : chat.personA?.name}</Heading>
                    <Divider color="gray.400" />
                    <Box w="100%">
                        <VStack spacing={4}>
                            {chat.messages && chat.messages.map(message => <Message user={props.user} message={message} key={message._id}/>)}
                        </VStack>
                    </Box>
                    {(chat.personA?.deleted || chat.personB?.deleted) ? <Heading marginTop={4} size="md" color="red.500">The other user was deleted. You cannot write any more messages.</Heading> :
                    <HStack marginTop={4} w="100%">
                        <Input borderColor="gray.400" type="text" ref={messageRef} />
                        <Button onClick={onSendMessage}>{t("chat.Send")}</Button>
                    </HStack>}
                </VStack>
            </Box>
        </Container>
    )
}

export default Chat;

