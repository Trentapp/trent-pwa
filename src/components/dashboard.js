import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import PostDataService from "../services/post-data";
import { Box, Button, Center, Container, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";
import PostCard from "./PostCard";

const Dashboard = props => {
    const {t} = useTranslation();

    const [posts, setPosts] = useState([]);
    const [loc, setLoc] = useState(null);

    // const [newMessagesChats, setNewMessagesChats] = useState([]);
    // const [newRequests, setNewRequests] = useState([]);
    // const [upcomingTransactions, setUpcomingTransactions] = useState([]);

    // useEffect(() => {
    //     const getNewMessages = async (uid) => {
    //         try {
    //             const response = await ChatDataService.getNewMessages(uid);
    //             setNewMessagesChats(response.data);
    //         } catch(e) {
    //             console.log("Error in getNewMessages: ", e);
    //         }
    //     }
    //     const getNewRequests = async (uid) => {
    //         try {
    //             const response = await TransactionDataService.getNewRequests(uid);
    //             setNewRequests(response.data);
    //         } catch(e) {
    //             console.log("Error in getNewRequests: ", e);
    //         }
    //     }
    //     const getUpcomingTransactions = async (uid) => {
    //         try {
    //             const response = await TransactionDataService.getUpcoming(uid);
    //             setUpcomingTransactions(response.data);
    //         } catch(e) {
    //             console.log("Error in get upcoming transactions: ", e);
    //         }
    //     }
    //     getNewMessages(props.user?.uid);
    //     getUpcomingTransactions(props.user?.uid);
    //     getNewRequests(props.user?.uid);
    // }, [props.user]);

    useEffect(() => {
        if (!loc?.coordinates?.length){
            if (props.user?.location?.coordinates?.length) { //if user has set an address, we take his location (maybe change later)
                setLoc(props.user.location);
            } 
            else {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("position: ", position);
                    setLoc({type: "Point", coordinates: [position.coords.longitude, position.coords.latitude]});
                }, (err) => console.log("Could not get location: ", err));
            }
        }
    }, [props.user?._id]);

    useEffect(() => {
        const getFeed = async (loc) => {
            try {
                const response = await PostDataService.getAroundLocation(loc);
                setPosts(response.data);
            } catch(e) {
                console.log("Error in get upcoming transactions: ", e);
            }
        };
        
        console.log("location: ", loc);
        if (loc){
            getFeed(loc);
        }
    }, [props.user?._id, loc]);

    return(
        <Container maxW="container.lg">
            <Box p={4}>
                <Center>
                    <VStack spacing="2px">
                        <Heading>{t("dashboard.Overview")}</Heading>
                        <Divider color="gray.400"/>
                        <Box w="100%" py={3}>
                            <HStack>
                                <Link to={`/inventory`}><Button variant="outline">Inventar</Button></Link>
                                <Link to="/chats"><Button variant="outline">{t("dashboard.Chats")}</Button></Link>
                                {/* <Link to="/transactions"><Button variant="outline">{t("dashboard.Transactions")}</Button></Link> */}
                                <Link to="/borrow"><Button variant="outline">Leih etwas aus</Button></Link>
                            </HStack>
                        </Box>
                        <Divider color="gray.400"/>
                        {/* Feed */}
                        <VStack align="flex-start" paddingTop={3}>
                            {posts.length && <Box paddingTop={3} paddingBottom={3}>
                                <Heading size="lg" pb={4}>Aktuelle Posts aus deiner Umgebung</Heading>
                                <VStack align="flex-start" spacing="15px">
                                {posts.map(post => <PostCard user={props.user} post={post} />)}
                                </VStack>
                            </Box>}
                        </VStack>
                        {/* 
                            {newMessagesChats.length && <Box paddingTop={3}>
                                <Heading size="lg">{t("dashboard.Chats")} with new messages</Heading>
                                <VStack align="flex-start">
                                {newMessagesChats.map(chat => <Link to={`/chats/${chat._id}`}><Box w="100%" p={2} border="1px" borderRadius="lg" borderColor="gray.400" key={chat._id}>{props.user._id === chat.borrower._id ? <>{chat.lender.name}{t("dashboard. lending ")}{chat.product?.name}</> : <>{chat.borrower.name}{t("dashboard. borrowing your ")}{chat.product?.name}</>}</Box></Link> )}
                                </VStack>
                            </Box>}
                            {newRequests.length && <Box paddingTop={3}>
                                <Heading size="lg">{t("dashboard.New Requests")}</Heading>
                                <VStack align="flex-start">
                                {newRequests.map(transaction => <TransactionCard user={props.user} transaction={transaction} />)}
                                </VStack>
                            </Box>}
                            {upcomingTransactions.length && <Box paddingTop={3} paddingBottom={3}>
                                <Heading size="lg">{t("dashboard.Upcoming transactions")}</Heading>
                                <VStack align="flex-start">
                                {upcomingTransactions.map(transaction => <TransactionCard user={props.user} transaction={transaction} />)}
                                </VStack>
                            </Box>}
                        */}
                    </VStack>
                </Center>
            </Box>
        </Container>
    );
};

export default Dashboard;

