import React, {useState, useEffect, useRef} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import ProductDataService from "../services/product-data";
import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import BookingRequest from "../components/booking-request";
import QuestionForm from "../components/ask-question";
import { Box, Grid, GridItem, Image, Container, Heading, HStack, Divider, VStack, Text } from "@chakra-ui/react";
import ProfileCard from "./profileCard";


const Product = props => {
    const [product, setProduct] = useState({prices: {}, user: {}}); //maybe add better initial state, though currently the information is shown conditionally
    const [error, setError] = useState(""); //can get rid of that if redirect works
    const [showReq, setShowReq] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [images, setImages] = useState([
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ]);
    const messageRef = useRef();
    let history = useHistory();

    const deleteProduct = async () => {
        try {
            await ProductDataService.deleteProduct(product._id, props.user.uid);
            history.push("/products");
        } catch(e) {
            console.log("Failed to delete product: ", e);
        }
    };

    const onHideModal = () => {
        setShowReq(false);
        setShowQuestionForm(false); //maybe create extra function for that later
    }

    const onRequestButtonClick = () => {
        setShowReq(true);
    }

    const onAskQuestionButtonClick = () => {
        setShowQuestionForm(true);
    }

    const onChangeStartDate = (date) => {
        setStartDate(date);
        //for Datetime (not Datepicker): setStartDate(date._d);
    }

    const onChangeEndDate = (date) => {
        setEndDate(date);
        //for Datetime (not Datepicker): setEndDate(date._d);
    }

    const onSendRequest = async () => {
        try {
            const transaction = {
                uid: props.user.uid,
                productId: product._id,
                startDate: startDate,
                endDate: endDate,
            };
            await TransactionDataService.createTransaction(transaction);
            history.push("/");
        } catch(e) {
            console.log("Failed to create transaction: ", e)
        }
    }

    const onSendMessage = async () => {
        try {
            const chat = {
                uid: props.user.uid,
                productId: product._id,
                content: messageRef.current.value,
            };
            await ChatDataService.sendMessage(chat);
            history.push("/");
        } catch(e) {
            console.log("Failed to send message: ", e)
        }
    }

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
                setError("Could not find that product.");
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
            setError("Could not make images work");
            console.log("Error in product.js - getProduct: ", e);
        }
    }, [product]);


    return(
        <Container maxW="container.xl" marginTop={2}>
            <Box>
                <HStack>
                    <Box w="700px" h="470px" marginTop={2}>
                        {product.picturesFitted && <ImageGallery items={images} showPlayButton={false} thumbnailPosition="right"/>}
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
                    <Box>

                    </Box>
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