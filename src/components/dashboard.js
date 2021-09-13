import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import { Box, Button, Center, Container, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";

const Dashboard = props => {
    const {t} = useTranslation();

    const [newMessagesChats, setNewMessagesChats] = useState([]);
    const [newRequests, setNewRequests] = useState([]);
    const [upcomingTransactions, setUpcomingTransactions] = useState([]);

    useEffect(() => {
        const getNewMessages = async (uid) => {
            try {
                const response = await ChatDataService.getNewMessages(uid);
                setNewMessagesChats(response.data);
            } catch(e) {
                console.log("Error in getNewMessages: ", e);
            }
        }
        const getNewRequests = async (uid) => {
            try {
                const response = await TransactionDataService.getNewRequests(uid);
                setNewRequests(response.data);
            } catch(e) {
                console.log("Error in getNewRequests: ", e);
            }
        }
        const getUpcomingTransactions = async (uid) => {
            try {
                const response = await TransactionDataService.getUpcoming(uid);
                setUpcomingTransactions(response.data);
            } catch(e) {
                console.log("Error in get upcoming transactions: ", e);
            }
        }
        getNewMessages(props.user?.uid);
        getUpcomingTransactions(props.user?.uid);
        getNewRequests(props.user?.uid);
    }, [props.user]);

    return(
        <Container maxW="container.lg">
            <Box p={4}>
                <Center>
                    <VStack spacing="2px">
                        <Heading>{t("dashboard.Overview")}</Heading>
                        <Divider color="gray.400"/>
                        <Box w="100%" py={3}>
                            <HStack>
                                <Link to={`/profile/${props.user._id}`}><Button variant="outline">{t("dashboard.Your Profile")}</Button></Link>
                                <Link to="/chats"><Button variant="outline">{t("dashboard.Chats")}</Button></Link>
                                <Link to="/transactions"><Button variant="outline">{t("dashboard.Transactions")}</Button></Link>
                            </HStack>
                        </Box>
                        <Divider color="gray.400"/>
                        <VStack align="flex-start" paddingTop={3}>
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
                        </VStack>
                    </VStack>
                </Center>
            </Box>
        </Container>
    );
};

export default Dashboard;

