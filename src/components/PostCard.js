import { CalendarIcon, ChatIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { VStack, HStack, Heading, Text, Box, IconButton, Divider, Tooltip, Center } from '@chakra-ui/react';
import React from 'react';
import {Link, useHistory} from "react-router-dom";

import ProfileCard from './profileCard';
import {items} from "./Inventory.js";
import PostDataService from "../services/post-data.js";


export default function PostCard(props) {
    const history = useHistory();

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
            <VStack align="flex-start">
                <HStack justify="space-between" w="100%">
                    <HStack>
                        <ProfileCard creator={props.post.user}/>
                        <IconButton icon={<ChatIcon />} onClick={() => history.push("/chatlink that I need to implement")} />
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
                </HStack>
                <Heading size="md">Gesuchte(r) Gegenstand/Gegenstände: {props.post.typeIds.map(tId => items[tId]).join(", ")}</Heading>
                <Text>{props.post.comment}</Text> {/* evtl das vornedran: <Text fontWeight="bold">Kommentar: </Text> */}
                <HStack>
                    <CalendarIcon color="gray.600" />
                    <Text color="gray.600">gepostet am {(new Date(props.post.timestamp)).toLocaleString("de")}</Text>
                </HStack>
            </VStack>
        </Box>
    )
}
