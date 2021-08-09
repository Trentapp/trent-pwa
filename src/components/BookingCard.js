import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function BookingCard() {
    return (
        <Flex
            border="1px"
            borderColor="gray.200"
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="lg"
            alignItems="stretch"
            p={2}>
            <Box w="450px" h="300px">
                Hi
            </Box>
        </Flex>
    )
}
