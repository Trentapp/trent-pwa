import React, {useState, useEffect} from 'react'
import { IconButton, Container, Stack, Box, Center, VStack, Heading, Text, Textarea, Button, HStack, Alert, AlertIcon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react'
import {useHistory, Link} from "react-router-dom"
import Select from 'react-select'
import { InfoIcon } from '@chakra-ui/icons'

import {items} from "./Inventory.js"
import PostDataService from "../services/post-data.js"

export default function CreatePost(props) {
    let options = Object.entries(items).map(itemArr => {return {value: itemArr[0], label: itemArr[1]}});
    const commentPlaceholder = `Beschreibe hier, von wann bis wann du den Gegenstand (oder die Gegenstände) ausleihen willst. Beschreibe außerdem ggf. genauere Anforderungen oder spezifiziere das/die Produkte. Falls du etwas teures ausleihst und etwas für das Leihen zahlen würdest, schreibe auch rein, wie viel du zahlen würdest (du kannst auch gerne "auf Verhandlungsbasis" angeben).`;
    
    const lastOption = {value: 9999, label: "Sonstiges (in Kommentar beschreiben)"}; // is also included in options
    const [selected, setSelected] = useState([lastOption]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const history = useHistory();

    useEffect(() => {
        const getPost = async postId => {
            try {
                const response = await PostDataService.getById(postId);
                setComment(response.data.comment);
                setSelected(response.data.typeIds.map(tId => {return {value: tId, label: items[tId]}}));
            } catch(e) {
                console.log("could not get post: ", e);
            }
        }
        if (props.match.params.id) {
            getPost(props.match.params.id);
        }
    }, [props.match.params.id]);

    const handleChange = selectedOptions => {
        setSelected(selectedOptions);
    }

    const deletePost = async () => {
        if (props.match.params.id) {
            try {
                setLoading(true);
                let result = window.confirm("Bist du sicher, dass du den Post löschen möchtest?");
                if (result) {
                    await PostDataService.deletePost(props.match.params.id, props.user.uid);
                    history.push("/");
                }
            } catch(e){
                console.log("Failed to delete post: ", e);
            }
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let loc;
            if (props.user?.location?.coordinates) { //if user has set an address, we take his location (maybe change later)
                loc = props.user.location;
            } 
            else {
                throw Error("Location not defined")
                // navigator.geolocation.getCurrentPosition((position) => {
                //     loc = {type: "Point", coordinates: [position.coords.longitude, position.coords.latitude]};
                // }, (err) => {
                //     throw "Could not get location of user. Please don't block your location or enter your address in Account Settings.";
                // })
            }
            if (props.match.params?.id) {
                await PostDataService.update(props.match.params.id, props.user.uid, selected.map(s => parseInt(s.value)), comment, loc);
            } else {
                await PostDataService.create(props.user.uid, selected.map(s => parseInt(s.value)), comment, loc);
            }
            setLoading(false);
            history.push("/dashboard");
        } catch(e) {
            console.log(`Could not create/edit Post: ${e}`);
            setLoading(false);
        }
    }

    return (
        <Container maxW="container.lg">
            <Box p={4}>
                <Center>
                    {!props.user?.location?.coordinates?.length ? <Alert status="warning">
                        <AlertIcon />
                        <Text>Bitte gib in den <Link to="/account-settings" style={{color: "#1111dd"}}>Accounteinstellungen</Link> deine Adresse ein, um eine Ausleihanfrage zu senden.</Text>
                    </Alert> : <>
                    <VStack spacing="20px">
                        <Heading>Erstelle einen Post um etwas auszuleihen!</Heading>
                        <Text fontSize="lg">Trent-User in deiner Umgebung, die den Gegenstand den du ausleihen willst besitzen, werden benachrichtigt und setzen sich dann mit dir in Verbindung.</Text>
                        <Stack direction={{base: "column", md: "row"}} paddingTop={2}>
                            <Text fontSize="md" paddingTop={2}>Benötigte(r) Gegenstand/Gegenstände: </Text>
                            <Box minW="180px">
                                <Select isMulti value={selected} onChange={handleChange} options={options}/>
                            </Box>
                        </Stack>
                        <Box w="100%">
                        <HStack>
                            <Text>Kommentar:</Text> {/* <Tooltip label={commentPlaceholder}><InfoIcon/></Tooltip> */}
                            <Popover placement="right">
                                <PopoverTrigger>
                                    <IconButton size="sm" icon={<InfoIcon/>} />
                                </PopoverTrigger>
                                <PopoverContent >
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>{commentPlaceholder}</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                        <Box width="100%" mt={2}>
                            <Textarea placeholder={commentPlaceholder} value={comment} onChange={(e) => setComment(e.target.value)}/>
                        </Box>
                        </Box>
                        <Button
                            type="submit"
                            variant="solid"
                            colorScheme="teal"
                            width={{base: "100%", md: "100%"}}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {props.match.params?.id ? "Änderungen speichern" : "Posten"}
                        </Button>
                        {props.match.params.id && <>
                            <Button
                            type="submit"
                            variant="solid"
                            colorScheme="red"
                            width={{base: "100%", md: "100%"}}
                            onClick={deletePost}
                            disabled={loading}
                            >
                                Delete Post
                            </Button>
                        </>}
                    </VStack>
                    </>}
                </Center>
            </Box>
        </Container>
    )
}
