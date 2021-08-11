import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import TransactionsListRow from "./transaction-list-row";
import { Box, Button, Center, Container, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";

const Dashboard = props => {
    const [newMessagesChats, setNewMessagesChats] = useState([]);
    const [newRequests, setNewRequests] = useState([]);
    const [upcomingTransactions, setUpcomingTransactions] = useState([]);

    useEffect(() => {
        const getNewMessages = async (uid) => {
            try {
                const response = await ChatDataService.getNewMessages(uid);
                setNewMessagesChats(response.data);
            } catch(e) {
                console.log("Error in get transactions by user: ", e);
            }
        }
        const getNewRequests = async (uid) => {
            try {
                const response = await TransactionDataService.getNewRequests(uid);
                setNewRequests(response.data);
            } catch(e) {
                console.log("Error in get transactions by user: ", e);
            }
        }
        const getUpcomingTransactions = async (uid) => {
            try {
                const response = await TransactionDataService.getUpcomingTransactions(uid);
                setUpcomingTransactions(response.data);
            } catch(e) {
                console.log("Error in get transactions by user: ", e);
            }
        }
        getNewMessages(props.user?.uid);
    }, [props.user]);

    return(
        <Container maxW="container.lg">
            <Box p={4}>
                <Center>
                    <VStack spacing="2px">
                        <Heading>Dashboard</Heading>
                        <Divider color="gray.400"/>
                        <VStack align="flex-start" paddingTop={3}>
                            {newMessagesChats.length && <>
                                <Heading size="lg">Chats with new messages</Heading>
                                {newMessagesChats.map(chat => <Link to={`/chats/${chat._id}`}><Box w="100%" p={2} border="1px" borderRadius="lg" borderColor="gray.400" key={chat._id}>{props.user._id === chat.borrower._id ? <>{chat.lender.name} lending {chat.product?.name}</> : <>{chat.borrower.name} borrowing your {chat.product?.name}</>}</Box></Link> )}
                            </>}
                            <Heading size="lg">New Requests</Heading>
                            {/* get new requests (upcoming, lender and open (status=0)) */}
                            <Heading size="lg">Upcoming trents</Heading>
                            {upcomingTransactions.map(transaction => <TransactionCard user={props.user} transaction={transaction} />)}
                        </VStack>
                        <Divider color="gray.400" />
                        <Box w="100%" paddingTop={3}>
                            <HStack>
                                <Link to="/chats"><Button variant="outline">Chats</Button></Link>
                                <Link to="/transactions"><Button variant="outline">Transactions</Button></Link>
                            </HStack>
                        </Box>
                    </VStack>
                </Center>
            </Box>
        </Container>
    );
};

export default Dashboard;


        // <div>
        //     <>
        //         <h1>Dashboard</h1>
        //         <h3>You are logged in with email {props.user.mail}!</h3>
        //         <br/>
        //         <h2>Upcoming transactions</h2>
        //         {(lendTransactions.length > 0 || borrowTransactions.length > 0) ? <>
        //         {lendTransactions.length > 0 && <><h3>You lend</h3>
        //         <Table striped bordered hover>
        //             <thead>
        //                 <tr>
        //                     <th>Product</th>
        //                     <th>Borrower</th>
        //                     <th>Time</th>
        //                     <th>Verified</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {lendTransactions.filter(transaction => transaction.product).map(transaction => <TransactionsListRow user={props.user} action="lender" transaction={transaction} otherUser={transaction.borrower} key={transaction._id}/>)}
        //             </tbody>
        //         </Table>
        //         </>}
        //         {borrowTransactions.length > 0 && <><h3>You borrow</h3>
        //         <Table striped bordered hover>
        //             <thead>
        //                 <tr>
        //                     <th>Product</th>
        //                     <th>Lender</th>
        //                     <th>Time</th>
        //                     <th>Verified</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {borrowTransactions.filter(transaction => transaction.product).map(transaction => <TransactionsListRow user={props.user} action="borrower" transaction={transaction} otherUser={transaction.lender} key={transaction._id}/>)}
        //             </tbody>
        //         </Table>
        //         </>}
        //         </> : <p>You don't have any upcoming transactions.</p> }
        //         <h2>Past Transactions</h2>
        //         {pastTransactions.length > 0 ? <>
        //         <Table striped bordered hover>
        //             <thead>
        //                 <tr>
        //                     <th>Your role</th>
        //                     <th>Product</th>
        //                     <th>With User</th> 
        //                     <th>Time</th>
        //                     <th>Verified</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {pastTransactions.filter(transaction => transaction.product).map(transaction => <TransactionsListRow role={(transaction.borrower._id === props.user._id) ? "borrower" : "lender"} user={props.user} transaction={transaction} otherUser={transaction.borrower._id === props.user._id ? transaction.lender : transaction.borrower} key={transaction._id}/>)}
        //             </tbody>
        //         </Table>
        //         </> : <p>You don't have any past transactions</p> }
        //         {chats.length > 0 && <><h2>Your chats</h2>
        //         <ul className="list-group mb-5">
        //             {chats.filter(chat => chat.product).map(chat => <li className="list-group-item" key={chat._id}><Link to={`/chats/${chat._id}`}>{props.user._id === chat.borrower._id ? <>{chat.lender.name} lending {chat.product.name}</> : <>{chat.borrower.name} borrowing your {chat.product.name}</>}</Link></li> )}
        //         </ul>
        //         </>}
        //     </>
        // </div>


                // const getLendTransactions = async uid => {
        //     try {
        //         const response = await TransactionDataService.findByLender(uid);
        //         setLendTransactions(response.data);
        //     } catch(e) {
        //         console.log("Error in get transactions by lender/borrower: ", e);
        //     }
        // }
        // const getBorrowTransactions = async uid => {
        //     try {
        //         const response = await TransactionDataService.findByBorrower(uid);
        //         setBorrowTransactions(response.data);
        //     } catch(e) {
        //         console.log("Error in get transactions by lender/borrower: ", e);
        //     }
        // }
        // const getPastTransactions = async uid => {
        //     try {
        //         const response = await TransactionDataService.findPastTransactions(uid);
        //         setPastTransactions(response.data);
        //     } catch(e) {
        //         console.log("Error in get transactions by lender/borrower: ", e);
        //     }
        // }
        // const getChatsOfUser = async uid => {
        //     try {
        //         const response = await ChatDataService.getByUser(uid);
        //         setChats(response.data);
        //     } catch(e) {
        //         console.log("Error in get chats: ", e);
        //     }
        // }
        // if (props.user._id){
        //     getLendTransactions(props.user.uid);
        //     getBorrowTransactions(props.user.uid);
        //     getPastTransactions(props.user.uid);
        //     getChatsOfUser(props.user.uid);
        // }