import { Container, Center } from '@chakra-ui/layout';
import React, {useState, useEffect} from 'react';
import qs from "qs";

import PostDataService from "../services/post-data.js";
import PostCard from './PostCard.js';

export default function ViewPost(props) {
    const [defaultMsg, setDefaultMsg] = useState(null);
    const [post, setPost] = useState({});
    useEffect(() => {
        const getPost = async (postId) => {
            try {
                const response = await PostDataService.getById(postId);
                setPost(response.data);
            } catch(e) {
                console.log("Could not get post: ", e)
            }
        }
        if (props.match.params.id) {
            getPost(props.match.params.id);
        }
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.location.search) {
            const msgType = qs.parse(props.location.search, {ignoreQueryPrefix: true, delimiter: "&"}).msgType;
            if (msgType === "Yes"){
                setDefaultMsg(`Hallo ${post?.user?.name},\nDu kannst gerne das was du brauchst von mir ausleihen. Passt es dir, wenn du es um HH:MM Uhr am <Wochentag> abholst und so um HH:MM am <Wochentag> zurückbringst?\nLG\n${props.user?.name}`);
            }
        }
    }, [props.location.search, props.user, post]);

    return (
        <Container maxW="container.lg" mt={8}>
            <Center>
                <PostCard user={props.user} post={post} defaultMsg={defaultMsg} {...props}/>
            </Center>
        </Container>   
    )
}
