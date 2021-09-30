import React, {useRef, useState} from 'react';
import { CalendarIcon, ChatIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { VStack, HStack, Stack, Heading, Text, Box, IconButton, Divider, Tooltip } from '@chakra-ui/react';
import { useHistory} from "react-router-dom";

import ProfileCard from './profileCard';
import {items} from "./Inventory.js";
import PostDataService from "../services/post-data.js";
import ChatDataService from "../services/chat-data.js";
import QuestionForm from "./ask-question.js";

export default function PostCard(props) {
    const history = useHistory();

    const messageRef = useRef();
    const [messageOpen, setMessageOpen] = useState(false);

    const onSendMessage = async () => {
        try {
            const chatRequest = {
                uid: props.user.uid,
                recipientId: props.post.user._id,
                content: messageRef.current.value,
            };
            const response = await ChatDataService.sendMessage(chatRequest);
            history.push(`/chats/${response.data.chatId}`);
        } catch(e) {
            console.log("Could not send Message: ", e);
        }
    }

    const closePost = async () => {
        try {
            await PostDataService.setStatus(props.post._id, props.user.uid, 1);
            window.location.reload();
        } catch(e) {
            console.log("Could not close Post: ", e);
        }
    }

    const cancelPost = async () => {
        try {
            await PostDataService.setStatus(props.post._id, props.user.uid, 2);
            window.location.reload();
        } catch(e) {
            console.log("Could not cancel Post: ", e);
        }
    }

    return (
        <Box
            w={{base: "300px", md:"700px"}}
            borderRadius="xl"
            border="1px"
            borderColor="gray.400"
            overflow="hidden"
            boxShadow="lg"
            alignItems="stretch"
            p={4}
        >
            <QuestionForm messageRef={messageRef} user={props.user} isOpen={messageOpen} recipient={props.post.user} onSendMessage={onSendMessage} />
            <VStack align="flex-start">
                <Stack direction={{base: "column", md: "row"}} justify="space-between" w="100%">
                    <HStack>
                        <ProfileCard creator={props.post.user}/>
                        <IconButton icon={<ChatIcon />} onClick={() => setMessageOpen(true)} />
                    </HStack>
                    <HStack>
                        <Box borderRadius="lg" bg={props.post.status === 0 ? "green.500" : (props.post.status === 1 ? "blue.400" : "red.400")} px={3} py={2}>
                            <Text fontSize="lg" fontWeight="bold">{props.post.status === 0 ? "Aktiv" : (props.post.status === 1 ? "Abgeschlossen" : "Abgebrochen")}</Text>
                        </Box>
                        {props.user._id === props.post.user._id && props.post.status === 0 && <>
                            <Tooltip label="Post schließen (wenn du jemanden gefunden hast, der dir das was du brauchst, ausleiht)"><IconButton onClick={closePost} icon={<CheckIcon />} /></Tooltip>
                            <Tooltip label="Anfrage abbrechen (du brauchst die Gegenstände doch nicht mehr)"><IconButton onClick={cancelPost} icon={<CloseIcon />} /></Tooltip>
                            <Divider orientation="vertical" color="gray.400"/>
                            <Tooltip label="Post editieren"><IconButton onClick={() => history.push(`/editPost/${props.post._id}`)} icon={<EditIcon />} /></Tooltip>
                        </>}
                        {/* maybe add "reopen" option later */}
                    </HStack>
                </Stack>
                <Heading size="md">Suche: {props.post.typeIds.map(tId => items[tId]).join(", ")}</Heading>
                <Text>{props.post.comment}</Text> {/* evtl das vornedran: <Text fontWeight="bold">Kommentar: </Text> */}
                <HStack>
                    <CalendarIcon color="gray.600" />
                    <Text color="gray.600">gepostet am {(new Date(props.post.timestamp)).toLocaleString("de")}</Text>
                </HStack>
            </VStack>
        </Box>
    )
}
