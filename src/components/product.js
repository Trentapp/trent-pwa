import React, {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useTranslation } from "react-i18next";

import ProductDataService from "../services/product-data";
import ChatDataService from "../services/chat-data";
import { Box, Container, Heading, HStack, Divider, VStack, Text, Button, Center, IconButton, Stack } from "@chakra-ui/react";
import ProfileCard from "./profileCard";
import BookingCard from "./BookingCard";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddProduct from "./add-product";
import QuestionForm from "./ask-question";

const Product = props => {
    const {t} = useTranslation();
    const [product, setProduct] = useState({prices: {}, user: {}}); //maybe add better initial state, though currently the information is shown conditionally
    // const [error, setError] = useState(""); //can get rid of that if redirect works
    // const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showSendMessage, setShowSendMessage] = useState(false);
    const [images, setImages] = useState([]);
    const messageRef = useRef();
    let history = useHistory();

    const onSendMessage = async () => {
        try {
            const chat = {
                uid: props.user.uid,
                productId: product._id,
                content: messageRef.current.value,
            };
            const response = await ChatDataService.sendMessage(chat);
            history.push(`/chats/${response.data.chatId}`);
        } catch(e) {
            console.log("Failed to send message: ", e)
        }
    }

    const deleteProduct = async () => {
        let result = window.confirm("Are you sure you want to delete this product?");
        if (result){
            try {
                await ProductDataService.deleteProduct(product._id, props.user.uid);
                history.push("/products");
            } catch(e) {
                console.log("Failed to delete product: ", e);
            }
        }
    };

    // const onAskQuestionButtonClick = () => {
    //     setShowQuestionForm(true);
    // }

    useEffect(() => {
        const getProduct = async id => {
            try {
                const response = await ProductDataService.get(id);
                let newProduct = response.data;
                newProduct.prices.perHour /= 100.0;
                newProduct.prices.perDay /= 100.0;
                // if (newProduct.pictures){
                //     for (let i = 0; i < newProduct.pictures.length; i++){
                //         newProduct.pictures[i].base64 = btoa(
                //            new Uint8Array(newProduct.pictures[i].data.data)
                //            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                //        );
                //    }
                // }
                setProduct(newProduct);
            } catch(e) {
                console.log("Error in product.js - getProduct: ", e);
            }
        };
        getProduct(props.match.params.id);
    }, [props.match.params.id, history]);

    useEffect(() => {
        try {
            let imgs = [];
            if (product.picturesFitted){
                for (let i = 0; i < product.picturesFitted.length; i++) {
                    imgs.push({
                        original: `data:${product.picturesFitted[i].contentType};base64,${Buffer.from(product.picturesFitted[i].data.data).toString('base64')}`,
                        thumbnail: `data:${product.thumbnails[i].contentType};base64,${Buffer.from(product.thumbnails[i].data.data).toString('base64')}`
                    })
                }
                setImages(imgs)
            }
        } catch(e) {
            console.log("Error in product.js - getProduct: ", e);
        }
    }, [product?._id, product?.thumbnails, product?.picturesFitted]);


    return(
        <Container maxW="container.xl" marginTop={2}>
            {showSendMessage && <QuestionForm user={props.user} onSendMessage={onSendMessage} isOpen={showSendMessage} setIsOpen={setShowSendMessage} messageRef={messageRef} lender={product.user} />}
            <Box>
                <Stack spacing="40px" align="flex-start" direction={{base: "column", md: "row"}}>
                    <Box w={{base: "100%",md: "700px"}} h={{base: "60%", md: "470px"}} marginTop={2}>
                        {product.picturesFitted && product.picturesFitted.length > 0 && <ImageGallery items={images} showPlayButton={false} showThumbnails={false} thumbnailPosition="right"/>}
                        <Box my={2}>
                            <HStack justify="space-between">
                                <VStack align="left">
                                    <Heading>{product.name}</Heading>
                                    {/* replace following with "{t("product.free")}" if {t("product.free")}, maybe make a button or so that shows that you make it {t("product.free")} */}
                                    { (product.prices.perHour || product.prices.perDay) ? <Text textAlign="left" fontWeight="bold" color="gray.500">{product.prices.perHour !== undefined && product.prices.perHour !== 0 && <>{product.prices.perHour}€/hour </>}{product.prices.perDay !== undefined && product.prices.perDay !== 0 && <>{product.prices.perDay}€/day </>}</Text>
                                        : <Text textAlign="left" fontWeight="bold" color="gray.500">{t("product.free")}</Text>}
                                    {/*product.prices.perWeek !== undefined && <>{product.prices.perWeek}€/week </>}{product.prices.perMonth !== undefined && <>{product.prices.perMonth}€/month </>*/}
                                </VStack>
                                {product.user && <ProfileCard product={product} />}
                            </HStack>
                        </Box>
                        <Divider my={3} color="gray.300"/>
                        <Heading as={"h5"} size="md">{t("product.Description")}</Heading>
                        <Text marginTop={2}>
                            {product.desc}
                        </Text>
                    </Box>
                    <Box>
                        {props.user._id !== product.user._id ? <>
                            <Center>
                                <VStack spacing="20px">
                                        {process.env.REACT_APP_ENV === "dev" && <BookingCard user={props.user} product={product} />}
                                        <Button borderRadius="lg" width="100%" onClick={() => setShowSendMessage(true)}>{t("product.Send Message")}</Button>
                                </VStack>
                            </Center>
                            </> : 
                            <Box py={2}>
                                <HStack spacing="10px">
                                    <IconButton title="Edit product" colorScheme="teal" size="lg" icon={<EditIcon />} onClick={() => setShowEdit(true)}/>
                                    <AddProduct user={props.user} isOpen={showEdit} setIsOpen={setShowEdit} product={product} />
                                    <IconButton title="Delete product" colorScheme="red" size="lg" icon={<DeleteIcon />} onClick={deleteProduct}/>
                                </HStack>
                            </Box>}
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export default Product;

