import { Box, Container, Divider, Heading, VStack } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';

import TransactionCard from './TransactionCard';
import TransactionDataService from "../services/transaction-data";

export default function TransactionList(props) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async uid => {
            try {
                const response = await TransactionDataService.findByUser(uid);
                setTransactions(response.data);
            } catch(e) {
                console.log("Error in get transactions by user: ", e);
            }
        }
        getTransactions(props.user?.uid);
    }, [props.user?.uid])

    return (
        <Container maxW="container.lg">
            <Heading size="lg">Your transactions</Heading>
            <Divider color="gray.400" />
            <VStack>
                {transactions.map(transaction => <TransactionCard user={props.user} transaction={transaction} />)}
            </VStack>
        </Container>
    )
}
