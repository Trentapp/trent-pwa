import React, {useState, useRef} from 'react'
import { Container, Stack, Box, Center, VStack, Heading, Text, Textarea, Button, HStack, Tooltip } from '@chakra-ui/react'
import Select from 'react-select'
import { InfoIcon } from '@chakra-ui/icons';

import {items} from "./Inventory.js"
import PostDataService from "../services/post-data.js";

export default function CreatePost(props) {
    let options = Object.entries(items).map(itemArr => {return {value: itemArr[0], label: itemArr[1]}});
    const otherOption = {value: 9999, label: "Sonstiges (in Kommentar beschreiben)"};
    const commentPlacehoder = `Beschreibe hier, von wann bis wann du den Gegenstand (oder die Gegenstände) ausleihen willst. Beschreibe außerdem ggf. genauere Anforderungen oder spezifiziere das/die Produkte. Falls du etwas teures ausleihst und etwas für das Leihen zahlen würdest, schreibe auch rein, wie viel du zahlen würdest (du kannst auch gerne "auf Verhandlungsbasis" angeben).`;

    const [selected, setSelected] = useState([otherOption]);
    const [loading, setLoading] = useState(false);
    const commentRef = useRef();

    const handleChange = selectedOptions => {
        setSelected(selectedOptions);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let loc;
            if (props.user?.location?.coordinates) { //if user has set an address, we take his location (maybe change later)
                loc = props.user.location;
            } else {
                navigator.geolocation.getCurrentPosition((position) => {
                    loc = {type: "Point", coordinates: [position.coords.longitude, position.coords.latitude]};
                }, (err) => {
                    throw "Could not get location of user. Please don't block your location or enter your address in Account Settings.";
                })
            }
            const response = await PostDataService.create(props.user.uid, selected.map(s => parseInt(s.value)), commentRef.current.value, loc);
            console.log(response);
            setLoading(false);
        } catch(e) {
            console.log(`Could not create/edit Post: ${e}`);
            setLoading(false);
        }
    }

    return (
        <Container maxW="container.lg">
            <Box p={4}>
                <Center>
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
                            <Text>Kommentar:</Text><Tooltip label={commentPlacehoder}><InfoIcon/></Tooltip>
                        </HStack>
                        <Box width="100%" mt={2}>
                            <Textarea placeholder={commentPlacehoder} ref={commentRef}/>
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
                            Posten
                        </Button>
                    </VStack>
                </Center>
            </Box>
        </Container>
    )
}
