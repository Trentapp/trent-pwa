import { HStack, Image, VStack, Text, Heading, Box, Center } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    return (
        <Box w={{base: "300px", md: "600px"}}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    borderRadius="3xl"
                    overflow="hidden"
                    boxShadow="lg"
                    w="100%"
                    align="stretch"
                >
                    {props.product.thumbnail ? <Image w={{base: "100px", md: "200px"}} h={{base: "100px", md: "200px"}} src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                        : <Image src={{base: "https://via.placeholder.com/100x100?text=No+Image+Available", md: "https://via.placeholder.com/200x200?text=No+Image+Available"}} />}
                    <VStack w="100%" py={2}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={3}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            {/* <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text> */}
                            <Text noOfLines={2}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}


export const ProductCard2 = (props) => {
    return (
        <Box w="100%" h={{base: "130px", md: "240px"}} onMouseOver={() => {console.log(props.product.name); props.setEnhanced(props.product)}} onMouseOut={() => props.setEnhanced(null)}>
            <Box _hover={{bg:"gray.100"}} h="100%">
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    overflow="hidden"
                    w="100%"
                    h="100%"
                    align="stretch"
                    
                >
                    <Center>
                    <Box marginLeft={3} borderRadius="2xl" overflow="hidden" h={{base: "100px", md: "200px"}} w={{base: "100px", md: "200px"}}>
                        {props.product.thumbnail ? <Image src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                            : <Image src={{base: "https://via.placeholder.com/100x100?text=No+Image+Available", md: "https://via.placeholder.com/200x200?text=No+Image+Available"}} />}
                    </Box>
                    </Center>
                    <VStack w="100%" py={6}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={4}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            {/* <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text> */}
                            <Text noOfLines={2}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
            </Box>
        </Box>
    )
}

export const ProductCardSmall = (props) => {
    return (
        <Box w="200px" h="67px">
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    borderRadius="xl"
                    overflow="hidden"
                    w="100%"
                    align="stretch"
                >
                    <Center>
                    <Box marginLeft={3} borderRadius="2xl" overflow="hidden" h="67px" w="67px">
                        {props.product.thumbnail ? <Image src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                            : <Image src={{base: "https://via.placeholder.com/100x100?text=No+Image+Available", md: "https://via.placeholder.com/200x200?text=No+Image+Available"}} />}
                    </Box>
                    </Center>
                    <VStack w="100%" py={2}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={3}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            {/* <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text> */}
                            <Text noOfLines={1}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}

const CardStyle = {
    position: "fixed",
    display: "block",
};

export const ProductCardFixed = (props) => {
    return (
        <Box w={{base: "300px", md: "600px"}} style={CardStyle}
            bottom="35px"
            left={{base: `${(window.innerWidth - 300)/2}px`, md: `${(window.innerWidth/2 - 600)/2}px`}}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/product/${props.product._id}`}>
                <HStack
                    bgColor="gray.50"
                    borderRadius="3xl"
                    overflow="hidden"
                    boxShadow="lg"
                    w="100%"
                    align="stretch"
                >
                    {props.product.thumbnail ? <Image w={{base: "100px", md: "200px"}} h={{base: "100px", md: "200px"}} src={`data:${props.product.thumbnail.contentType};base64,${Buffer.from(props.product.thumbnail.data.data).toString('base64')}`} />
                        : <Image src={{base: "https://via.placeholder.com/100x100?text=No+Image+Available", md: "https://via.placeholder.com/200x200?text=No+Image+Available"}} />}
                    <VStack w="100%" py={2}>
                        <Box w="100%">
                            <HStack justify="space-between" paddingLeft={2} paddingRight={3}>
                                <Heading as="h3" size="md">{props.product.name}</Heading>
                                <Heading as="h3" size="md">{props.product.prices.perDay}€/day</Heading>
                            </HStack>
                        </Box>
                        <Box w="100%" textAlign="left" px={2}>
                            {/* <Text justifyContent="flex-start" textStyle="label" marginBottom={2} color="gray.500" fontSize="xs">X meters away</Text> */}
                            <Text noOfLines={2}>{props.product.desc}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Link>
        </Box>
    )
}