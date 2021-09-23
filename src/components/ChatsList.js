import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { Box, Container, Divider, Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ChatDataService from "../services/chat-data";

export default function ChatsList(props) {
    const {t} = useTranslation();

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChatsOfUser = async uid => {
            try {
                const response = await ChatDataService.getByUser(uid);
                setChats(response.data);
            } catch(e) {
                console.log("Error in get chats: ", e);
            }
        }
        if (props.user?._id){
            getChatsOfUser(props.user.uid);
        }
    }, [props.user]);

    //it actually is supposed to look like chat, but it is temporary anyways
    return (
        <Container maxW="container.sm">
            <Box marginTop={4} borderRadius="xl" border="1px" p={4} borderColor="gray.300">
                <VStack>
                    <Heading size="lg">{t("ChatsList.Your Chats")}</Heading>
                    <Divider color="gray.400"/>
                    <Box w="100%">
                        <VStack>
                            {chats.map(chat => <Link to={`/chats/${chat._id}`}><Box w="100%" p={2} border="1px" borderRadius="lg" borderColor="gray.400" key={chat._id}>Chat mit {props.user._id === chat.personA._id ? chat.personB.name : chat.personA.name}</Box></Link> )}
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Container>
    )
}
