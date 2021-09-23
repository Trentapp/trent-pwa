import { VStack, HStack, Flex, Text, Avatar, Center } from '@chakra-ui/react';
import React from 'react';
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";


export default function ProfileCard(props) { //pass in creator for posts or products
    return (
        <Flex
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            alignItems="stretch"
            p={2}>
            {/* <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/profile/${props.creator._id}`}> */}
                <HStack
                    bgColor="white"
                    w="100%"
                >
                    <Center>
                    <Avatar src={props.creator.picture && `data:${props.creator.picture.contentType};base64,${Buffer.from(props.creator.picture.data.data).toString('base64')}`} />
                    </Center>
                    <VStack>
                        <Text fontWeight="bold">
                            {props.creator.name}
                        </Text>
                        {/* <HStack>
                            <StarRatings rating={props.creator.rating} starRatedColor="rgb(250,200,30)" starDimension="16px" starSpacing="2px"/><Text fontWeight="bold">({props.creator.numberOfRatings})</Text>
                        </HStack> */}
                    </VStack>
                </HStack>
            {/* </Link> */}
        </Flex>
    )
}
