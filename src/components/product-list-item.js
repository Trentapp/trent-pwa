import { HStack, Image, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    return (
        <Box w="600px" h="200px">
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    borderRadius="3xl"
                    overflow="hidden"
                    boxShadow="lg"
                    w="100%"
                    align="stretch"
                >
                    {props.product.thumbnail ? <Image src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                        : <Image src="https://via.placeholder.com/200x200?text=No+Image+Available" />}
                    <VStack w="100%" py={2}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={3}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text>
                            <Text isTruncated noOfLines={2}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}


export const ProductCard2 = (props) => {
    return (
        <Box w="100%" h="220px">
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    overflow="hidden"
                    w="100%"
                    align="stretch"
                >
                    <Box marginLeft={3} borderRadius="2xl" overflow="hidden">
                        {props.product.thumbnail ? <Image src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                            : <Image src="https://via.placeholder.com/200x200?text=No+Image+Available" />}
                    </Box>
                    <VStack w="100%" py={3}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={4}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text>
                            <Text isTruncated noOfLines={2}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}

