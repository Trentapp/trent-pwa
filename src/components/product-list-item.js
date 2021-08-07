import { HStack, Image, VStack, Text, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    return (
        <Box w="600px" h="200px" px={4} py={8}>
            <Link to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    align="stretch"
                    w="100%"
                >
                    {props.product.thumbnail ? <Image src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                        : <Image src="https://via.placeholder.com/200x200?text=No+Image+Available" />}
                    <VStack w="100%" py={2}>
                        <Box w="100%">
                            <HStack justify="space-between">
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Text textStyle="label">X meters away</Text>
                        <Text isTruncated noOfLines={2}>{props.product.desc}</Text>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}
