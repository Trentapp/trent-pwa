import { Box, Container, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import TransactionCard from './TransactionCard';
import TransactionDataService from "../services/transaction-data";

export default function TransactionList(props) {
    const {t, i18n} = useTranslation();

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
    <Container mawW="container.xl">
        <Box marginTop={4} borderRadius="xl" border="1px" p={4} borderColor="gray.300">
            <VStack>
                <Heading size="lg">{t("Your transactions")}</Heading>
                <Divider color="gray.400" />
                <Box w="100%">
                    <VStack spacing={4}>
                    {transactions.length ? transactions.map(transaction => <TransactionCard user={props.user} transaction={transaction} />) :
                        <Text>You don't have any transactions yet.</Text> }
                    </VStack>
                </Box>
            </VStack>
        </Box>
    </Container>
    )
}
