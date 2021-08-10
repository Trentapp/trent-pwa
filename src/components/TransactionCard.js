import { VStack, Text, IconButton, Box, HStack, Center, Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { CheckIcon, QuestionIcon, CloseIcon } from '@chakra-ui/icons'

export default function TransactionCard(props) {
    return (
        <Box
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
                <Avatar src={props.transaction.product.thumbnail ? `data:${props.transaction.product.thumbnail.contentType};base64,${Buffer.from(props.transaction.product.thumbnail.data.data).toString('base64')}` : "https://via.placeholder.com/80x80?text=?"}/>
                </Center>
                <VStack>
                    <Text fontWeight="bold">
                        {props.transaction.borrower.name} borrowing {props.transaction.product.name}
                    </Text>
                    <Text color="gray.500">
                        {props.transaction.startDate.toLocaleString()} - {props.transaction.endDate.toLocaleString()}
                    </Text>
                </VStack>
                <Box px={3}>
                    {props.transaction.status === 0 ? <Tooltip label="status: to be reviewed"><QuestionIcon boxSize={6}/></Tooltip>
                        : <>{props.transaction.status === 1 ? 
                            <Tooltip label="rejected"><CloseIcon boxSize={6} /></Tooltip> :
                            <Tooltip label="accepted"><CheckIcon boxSize={6} /></Tooltip> }</>}
                </Box>
            </HStack>
        </Box>
    )
}
