import { VStack, HStack, Flex, Text, Avatar, Center } from '@chakra-ui/react';
import React from 'react';
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";


export default function ProfileCard(props) {
    return (
        <Flex
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            alignItems="stretch"
            p={2}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/profile/${props.product.user._id}`}>
                <HStack
                    bgColor="white"
                    w="100%"
                    
                >
                    <Center>
                    {props.product.user.picture && <Avatar src={`data:${props.product.user.picture.contentType};base64,${Buffer.from(props.product.user.picture.data.data).toString('base64')}`} />}
                    </Center>
                    <VStack>
                        <Text fontWeight="bold">
                            {props.product.user.name}
                        </Text>
                        <HStack>
                            <StarRatings rating={props.product.user.rating} starRatedColor="rgb(250,200,30)" starDimension="16px" starSpacing="2px"/><Text fontWeight="bold">({props.product.user.numberOfRatings})</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </Link>
        </Flex>
    )
}
