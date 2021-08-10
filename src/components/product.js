import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import ProductDataService from "../services/product-data";
// import ChatDataService from "../services/chat-data";
import { Box, Container, Heading, HStack, Divider, VStack, Text, Button, Center, Flex, IconButton } from "@chakra-ui/react";
import ProfileCard from "./profileCard";
import BookingCard from "./BookingCard";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";


const Product = props => {
    const [product, setProduct] = useState({prices: {}, user: {}}); //maybe add better initial state, though currently the information is shown conditionally
    // const [error, setError] = useState(""); //can get rid of that if redirect works
    // const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [images, setImages] = useState([]);
    // const messageRef = useRef();
    let history = useHistory();

    // const onSendMessage = async () => {
    //     try {
    //         const chat = {
    //             uid: props.user.uid,
    //             productId: props.product._id,
    //             content: messageRef.current.value,
    //         };
    //         await ChatDataService.sendMessage(chat);
    //         history.push("/");
    //     } catch(e) {
    //         console.log("Failed to send message: ", e)
    //     }
    // }

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
                if (newProduct.pictures){
                    for (let i = 0; i < newProduct.pictures.length; i++){
                        newProduct.pictures[i].base64 = btoa(
                           new Uint8Array(newProduct.pictures[i].data.data)
                           .reduce((data, byte) => data + String.fromCharCode(byte), '')
                       );
                   }
                }
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
    }, [product]);


    return(
        <Container maxW="container.xl" marginTop={2}>
            <Box>
                <HStack spacing="40px" align="flex-start">
                    <Box w="700px" h="470px" marginTop={2}>
                        {product.picturesFitted && product.picturesFitted.length > 0 && <ImageGallery items={images} showPlayButton={false} thumbnailPosition="right"/>}
                        <Box my={2}>
                            <HStack justify="space-between">
                                <VStack align="left">
                                    <Heading>{product.name}</Heading>
                                    <Text textAlign="left" fontWeight="bold" color="gray.500">{product.prices.perHour && <>{product.prices.perHour}€/hour </>}{product.prices.perDay && <>{product.prices.perDay}€/day </>}{product.prices.perWeek && <>{product.prices.perWeek}€/week </>}{product.prices.perMonth && <>{product.prices.perMonth}€/month </>}</Text>
                                </VStack>
                                {product.user && <ProfileCard product={product} />}
                            </HStack>
                        </Box>
                        <Divider my={3} color="gray.300"/>
                        <Heading as={"h5"} size="md">Description</Heading>
                        <Text marginTop={2}>
                            {product.desc}
                        </Text>
                    </Box>
                    <Flex>
                        {props.user._id !== product.user._id ? <>
                            <Center>
                                <VStack spacing="20px">
                                        <BookingCard user={props.user} product={product} />
                                        <Button borderRadius="lg" width="100%">Send Message</Button>
                                </VStack>
                            </Center>
                            </> : 
                            <Box py={2}>
                                <HStack spacing="10px">
                                    <IconButton title="Edit product" colorScheme="teal" size="lg" icon={<EditIcon />}/>
                                    <IconButton title="Delete product" colorScheme="red" size="lg" icon={<DeleteIcon />} onClick={deleteProduct}/>
                                </HStack>
                            </Box>}
                    </Flex>
                </HStack>
            </Box>
        </Container>
    )
}

export default Product;

// const ImageGrid = ({ photos, overallRating, ...props }: ImageGridProps) => {
//     const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  
//     const onClose = () => {
//       setIsCarouselOpen(false);
//     };
  
//     return (
//       <>
//         <CarouselModal isOpen={isCarouselOpen} onClose={onClose} />
  
//         <Grid
//           templateColumns="repeat(6, 1fr)"
//           templateRows="repeat(3, 1fr)"
//           gap={2}
//           pos="relative"
//           borderRadius="xl"
//           overflow="hidden"
//           {...props}
//         >
//           <GridImage colSpan={4} rowSpan={3} photo={photos[0]}>
//             <HStack pos="absolute" spacing={2} top={3} left={4}>
//               <IconButtonOpaque
//                 aria-label="Share listing"
//                 icon={<Icon as={FiShare} boxSize={5} />}
//               />
//               <IconButtonOpaque
//                 aria-label="Save listing"
//                 icon={<Icon as={AiOutlineHeart} boxSize={5} />}
//               />
//             </HStack>
  
//             <ButtonOpaque
//               pos="absolute"
//               bottom={3}
//               left={4}
//               rightIcon={<Icon as={AiOutlineStar} boxSize={5} />}
//             >
//               {overallRating.toFixed(2)}
//             </ButtonOpaque>
//           </GridImage>
  
//           <GridImage colSpan={2} rowSpan={1} photo={photos[1]} />
  
//           {photos
//             .slice(2, 6)
//             .concat(Array(Math.abs(4 - photos.length) || 0).fill(null))
//             .map((photo, idx) => (
//               <GridImage key={photo?.id ?? idx} photo={photo} />
//             ))}
  
//           <ButtonOpaque
//             pos="absolute"
//             bottom={3}
//             right={4}
//             leftIcon={<Icon as={HiOutlinePhotograph} boxSize={5} />}
//             onClick={() => setIsCarouselOpen((prev) => !prev)}
//           >
//             {photos.length}
//           </ButtonOpaque>
//         </Grid>
//       </>
//     );
//   };

// const GridImage = props => {
//     return (
//       <GridItem overflow="hidden" {...props}>
//         <Image src={`data:${picture.contentType};base64,${Buffer.from(picture.data.data).toString('base64')}`} />
//       </GridItem>
//     );
// };

/* <div>
{error ? <h5>{error}</h5> : (
<>
    <QuestionForm user={props.user} onHide={onHideModal} show={showQuestionForm} onSendMessage={onSendMessage} messageRef={messageRef} />
    <BookingRequest user={props.user} product={product} onHide={onHideModal} show={showReq} onSendRequest={onSendRequest} startDate={startDate} endDate={endDate} onChangeStartDate={onChangeStartDate} onChangeEndDate={onChangeEndDate}/>
    <div className="mb-4">
        <h2>{product.name}</h2>
        <p><b>Price:</b> {product.prices.perDay}€/day {product.prices.perHour && <>or {product.prices.perHour}€/hour</>}</p>
        <p><span>Description: </span>{product.desc}</p>
        {product.pictures && <ImageGallery items={product.pictures.map(picture => {thumbnail})}/>}
        {product.pictures && product.pictures.map(picture => <img height="300" width="auto" alt="" src={`data:image/png;base64,${picture.base64}`}/> )} 
        <br/><br/>
        <p>This product belongs to <Link to={`/profile/${product.user._id}`}>{product.user.name}</Link></p>
        {props.user._id === product.user._id && (<>
            <p><Link to={`/products/update/${product._id}`}>Edit product</Link></p>
            <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
        </>)}
    </div>
    <div className="mb-4">
        {props.user._id !== product.user._id && props.user._id &&
        <>
        <div className="float-end">
            <Button variant="primary" className="float-end" onClick={onRequestButtonClick}>Request product</Button>
        </div>
        <br/>
        <br/>
        <div className="float-end">
            <Button variant="primary" className="float-end" onClick={onAskQuestionButtonClick}>Ask Question</Button>
        </div>                    
        <br/>
        </>}
    </div>
</>
)}
</div> */