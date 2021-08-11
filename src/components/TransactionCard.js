import { VStack, Text, IconButton, Box, HStack, Center, Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { CheckIcon, QuestionIcon, CloseIcon } from '@chakra-ui/icons'

import TransactionDataService from "../services/transaction-data";

export default function TransactionCard(props) {
    const onCancelRequest = async () => {
        try {
            await TransactionDataService.setTransactionStatus(props.transaction._id, props.user.uid, 1);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onAcceptRequest = async () => {
        try {
            await TransactionDataService.setTransactionStatus(props.transaction._id, props.user.uid, 2);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    return (
    <HStack>
        <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            alignItems="stretch"
            p={2}
        >
            <HStack
                bgColor="white"
                w="100%"
            >
                <Center>
                <Avatar src={props.transaction.product?.thumbnail ? `data:${props.transaction.product?.thumbnail?.contentType};base64,${Buffer.from(props.transaction.product?.thumbnail?.data?.data).toString('base64')}` : "https://via.placeholder.com/80x80?text=?"}/>
                </Center>
                <VStack>
                    <Text fontWeight="bold">
                        {props.transaction.borrower.name} borrowing {props.transaction.product?.name}
                    </Text>
                    <Text color="gray.500"> {/* attention: currently only german date format */}
                        {(new Date(props.transaction.startDate)).toLocaleString("de")} - {(new Date(props.transaction.endDate)).toLocaleString("de")}
                    </Text>
                </VStack>
                <Box px={3}>
                    {props.transaction.status === 0 ? <Tooltip label="not verified yet"><QuestionIcon boxSize={6}/></Tooltip>
                        : <>{props.transaction.status === 1 ? 
                            <Tooltip label="rejected/cancelled"><CloseIcon boxSize={6} /></Tooltip> :
                            <Tooltip label="accepted"><CheckIcon boxSize={6} /></Tooltip> }</>}
                </Box>
            </HStack>
        </Box>
        {props.transaction.status === 0 && <>
            {props.transaction.lender?._id === props.user._id ? <>
                <Tooltip label="accept"><IconButton icon={<CheckIcon boxSize={6} />} size="lg" colorScheme="green" onClick={onAcceptRequest}/></Tooltip>
                <Tooltip label="reject"><IconButton icon={<CloseIcon boxSize={6} />} size="lg" colorScheme="red" onClick={onCancelRequest}/></Tooltip>
            </> : <>
                <Tooltip label="cancel"><IconButton icon={<CloseIcon boxSize={6} />} size="lg" colorScheme="red" onClick={onCancelRequest}/></Tooltip>
            </>}
        </>}
    </HStack>
    )
}
