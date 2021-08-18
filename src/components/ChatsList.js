import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { Box, Container, Divider, Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ChatDataService from "../services/chat-data";

export default function ChatsList(props) {
    const {t, i18n} = useTranslation();

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
                    <Heading size="lg">{t("Your Chats")}</Heading>
                    <Divider color="gray.400"/>
                    <Box w="100%">
                        <VStack>
                            {chats.filter(chat => chat.product).map(chat => <Link to={`/chats/${chat._id}`}><Box w="100%" p={2} border="1px" borderRadius="lg" borderColor="gray.400" key={chat._id}>{props.user._id === chat.borrower._id ? <>{chat.lender.name}{t(" lending ")}{chat.product.name}</> : <>{chat.borrower.name}{t(" borrowing your ")}{chat.product.name}</>}</Box></Link> )}
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Container>
    )
}
