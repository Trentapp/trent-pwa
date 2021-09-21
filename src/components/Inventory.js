import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Box, Stack, Heading, Alert, AlertIcon, Text, Button, VStack, HStack, useToast} from '@chakra-ui/react';

import UserDataService from "../services/user-data.js";

export default function Inventory(props) {
    const toast = useToast();

    const items = {
        0: 'Bierbänke und Tische',
        1: 'Liegestuhl',
        2: 'Crêpe Maker',
        3: 'Longboard',
        4: 'Partyzelt',
        5: 'Spikeball',
        6: 'Picknickdecke',
        7: 'Fondue',
        8: 'Donutmaker',
        9: 'Sandwichmaker',
        10: 'Kontaktgrill',
        11: 'Raclette',
        12: 'Aufblasbarer Pool',
        13: 'Waffeleisen',
        14: 'Kinderfahrradanhänger',
        15: 'Hängematte',
        16: 'tragbarer Sonnenschir',
        17: 'Stand-Up Paddle',
        18: 'Fahrradträger',
        19: 'Wanderstock',
        20: 'Dachbox',
        21: 'Surfbrett',
        22: 'Volleyballnetz',
        23: 'Volleyball',
        24: 'Basketball',
        25: 'Fußball',
        26: 'Kayak',
        27: 'Kanu',
        28: 'Rafting Ring',
        29: 'Schlitten',
        30: 'Handsäge',
        31: 'Stichsäge',
        32: 'Kreissäge',
        33: 'Kettensäge',
        34: 'Laubbläser',
        35: 'Freischneider/Motorsense',
        36: 'Zange',
        37: 'Rasenmäher',
        38: 'Vertikutierer',
        39: '(elektrische) Heckenschere',
        40: 'Schubkarre',
        41: 'Sackkarre',
        42: 'Bohrmaschine',
        43: 'Akkuschrauber',
        44: 'Leiter',
        45: 'Hochdruckreiniger',
        46: 'Lötkolben',
        47: 'Gerüst',
        48: 'Schleifgerät',
        49: 'Schweißgerät',
        50: 'Schraubenzieherset',
        51: 'Imbusschlüsselset',
        52: 'Schraubenschlüsselset',
        53: 'Hammer',
        54: 'Autoanhänger',
        55: 'Lautsprecher',
        56: 'Drohne',
        57: 'Action Cam',
        58: 'Gimbal',
        59: 'Mikrofon',
        60: 'Stativ',
        61: 'Softboxen ',
        62: 'Lichterkette',
        63: 'Partybeleuchtung',
        64: 'Mischpult',
        65: 'Greenscreen',
        66: 'Projektor',
        67: 'Leinwand',
        68: 'Zelt',
        69: 'Campingtisch',
        70: 'Campingstühle',
        71: 'Wanderrucksack',
        72: 'Isomatte/Luftmatratze',
        73: 'Koffer',
        74: 'Wanderstöcke',
        75: 'Schlafsack',
        76: 'Fahrradtaschen',
        77: 'Wasserfeste Beutel/Taschen',
        78: 'Wohnwagen',
        79: 'Wohnmobil',
        80: '(mobile) Matratze',
        81: 'Regenschirm'
      };
    const [loading, setLoading] = useState(false);
    const [typeIds, setTypeIds] = useState(props.user.items.map(item => item.typeId));

    const addId = typeId => {
        setTypeIds([...typeIds, typeId]);//test that
    }

    const deleteId = typeId => {
        setTypeIds(typeIds.filter(tId => !(tId == typeId)));//test that
        console.log(typeIds)
    }

    const onChangeItem = typeId => {
        console.log(typeIds)
        if (typeIds.includes(typeId)){
            deleteId(typeId);
        } else {
            addId(typeId);
        }
    }

    // useEffect(() => {
    //     if (props.user?.uid && props.user?.items){
    //         setTypeIds(props.user.items.map(item => item.typeId));
    //         props.user.items.map(item => {
    //             document.getElementById(`item${item.typeId}`).setAttribute("checked", true);
    //             return "blub";
    //         })
    //     }
    // }, [props.user?.uid]);

    const handleSubmit = async () => {
        try{
            setLoading(true);
            const response = await UserDataService.setItems(props.user.uid, typeIds);
            toast({title: "Inventar gespeichert!", status: "success", duration: 4000, isClosable: true})
            setLoading(false);
        } catch(e) {
            console.log("Failed to set Inventory: ", e);
            setLoading(false);
            //add some error messaging 
        }
    }

    // TODO: get the current inventory of a user to show when open the page
    return (
    <Box
        paddingTop={{base: "20px", md: "30px", lg: "40px"}}
        alignItems="center"
    >
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Box minW={{ base: "300px", md: "468px" }} maxW="520px">
                <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                borderRadius="xl"
                boxShadow="md"
                border="1px"
                borderColor="gray.400"
                >
                <Heading size="lg">Inventar</Heading>
                {!(props.user?.address?.city) ? <Alert status="warning">
                    <AlertIcon />
                    <Text>Bitte gib in den <Link to="/account-settings">Accounteinstellungen</Link> deine Adresse ein. Danach kannst du hier dein Inventar hochladen.</Text>
                </Alert> : 
                <>
                <Text>Bitte gib hier die Gegenstände an, die du besitzt und die du dir vorstellen könntest, jemandem auszuleihen.  und vergiss am Ende nicht auf Speichern zu drücken.</Text>
                <VStack spacing="2px" alignItems="left">
                {Object.entries(items).map(itemArr => <HStack spacing="5px">
                    <input onClick={() => onChangeItem(parseInt(itemArr[0]))} type="checkbox" id={`item${itemArr[0]}`} name={itemArr[1]} defaultChecked={typeIds.includes(parseInt(itemArr[0]))}/>
                    <label for={`item${itemArr[0]}`}>{itemArr[1]}</label>
                </HStack>)}
                </VStack>
                <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Speichern
                </Button>
                </>
                }
                </Stack>
            </Box>
        </Stack>
    </Box>
    )
}
