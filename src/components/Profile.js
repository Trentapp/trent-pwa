import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";

import UserDataService from "../services/user-data";
import ReviewDataService from "../services/reviews-data";
import TransactionDataService from "../services/transaction-data";
import AddProduct from './add-product';
// import AddReview from "./add-review";
// import Review from "./Review";
import { Box, HStack, Container, Heading, VStack, Text, Divider, Avatar, IconButton, Button, Center, Stack } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { EditIcon } from '@chakra-ui/icons';

const Profile = props => {
    const initialUserState = {name: "", mail: "", inventory: []}; //later probably replace mail with email
    const [profileUser, setProfileUser] = useState(initialUserState);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(""); //Later: replace error to redirect to 404 page
    const [openReview, setOpenReview] = useState(false); //later set default to false and make check in the beginning if a transaction between the users exist, but no review yet

    useEffect(() => {
        const getUser = async id => {
            try {
                const response = await UserDataService.getProfile(id);
                setProfileUser(response.data);
            } catch(e) {
                setError("Could not find that user.");
                console.log("Error in Profile.js - getUser: ", e);
            }
        };
        const getReviews = async id => {
            try {
                const response = await ReviewDataService.findByUser(id);
                setReviews(response.data);
            } catch(e) {
                console.log("Error in Profile.js - getReviews: ", e);
            }
        };
        const checkIfOpenReview = async (userId, profileUserId) => { //this section is not well tested yet. It decide when a user is allowed to leave a review for the profileUser
            try {
                const response = await ReviewDataService.findByUser(profileUserId);
                const revs = response.data;
                const revsOfUser = revs.filter(rev => rev.posterId === props.user._id);
                if (revsOfUser.length === 0){
                    const response = await TransactionDataService.findPastTransactions(props.user.uid);
                    let pastTransactions = response.data;
                    const acceptedTransactionsWithUser = pastTransactions.filter(transaction => (transaction.status === 2 && (transaction.borrower._id === props.user._id || transaction.lender._id === props.user._id)));
                    if (acceptedTransactionsWithUser.length >= 1) {
                        setOpenReview(true);
                    }
                }
            } catch(e) {
                console.log("Error in Profile.js - checkOpenReview: ", e);
            }
        }
        getUser(props.match.params.id);//_id of user in route
        getReviews(props.match.params.id);
        if (props.user._id){
            checkIfOpenReview(props.user._id, props.match.params.id);
        }
    }, [props.match.params.id, props.user._id, props.user.uid]);

    return (
        <Container maxW="container.lg" marginTop={2}>
            {profileUser._id === props.user._id && <AddProduct user={props.user} isOpen={showAddProduct} setIsOpen={setShowAddProduct}/>}
            <Box>
                <Stack align={{base: "center", md: "flex-start"}} spacing={{base: "20px", md: "70px"}} direction={{base: "column", md: "row"}}>
                    <VStack w="200px">
                        <Box w="200px" h="200px">
                            <Avatar size="4xl" src={profileUser.picture && `data:${profileUser.picture.contentType};base64,${Buffer.from(profileUser.picture.data.data).toString('base64')}`} />
                        </Box>
                        <Box px={3}>
                            <Heading size="md" paddingTop={2}>{profileUser.name}</Heading>
                            <HStack>
                                <StarRatings rating={profileUser.rating} starRatedColor="rgb(250,200,30)" starDimension="16px" starSpacing="2px"/>
                                <Text fontWeight="bold">({profileUser.numberOfRatings})</Text>
                            </HStack>
                        </Box>
                        {profileUser._id === props.user._id && <Link to="/account-settings"><IconButton icon={<EditIcon/>} /></Link>}
                        {/* {profileUser._id === props.user._id && <Button>Upload profile picture</Button>} */}
                        {/*later add description (about me): <Text></Text> */}
                    </VStack>
                    <VStack minW={["250px", "400px"]} pb={3}>
                        <Box w="100%" paddingBottom={3}>
                            <Center><Heading size="lg">Inventory of {profileUser.name}</Heading></Center>
                            <Divider color="gray.500" />
                        </Box>
                        {profileUser._id === props.user._id && 
                            <Button width="100%" colorScheme="green" onClick={() => setShowAddProduct(true)}>
                                Add new item
                            </Button>
                        }
                        <VStack spacing="15px" paddingTop={4}>
                            {profileUser.inventory.map((product) => {
                                product.prices.perDay /= 100.0;
                                product.prices.perHour /= 100.0;
                                return (<ProductCard product={product} />)
                                }
                            )}
                        </VStack>
                    </VStack>
                </Stack>
            </Box>
        </Container>
    )
}

export default Profile;

        // <div>
        //     {error ? error : (
        //         <div>
        //             <h2>{profileUser.name}</h2>
        //             {profileUser.rating > 0 && <p>Rating: {profileUser.rating}: <StarRatings rating={profileUser.rating} starRatedColor="rgb(250,200,30)" starDimension="28px" />
        //             </p>}
        //             {profileUser.picture && <img alt="ups" src={`data:${profileUser.picture.contentType};base64,${Buffer.from(profileUser.picture.data.data).toString('base64')}`}/>}
        //             {(props.user._id === profileUser._id) && <p><Link to="/update-profile">Update Profile</Link></p>}
        //             <br/>
        //             {openReview && <AddReview ratedUserId={props.match.params.id} user={props.user}/>}
        //             <h2>Reviews</h2>
        //             {reviews.length > 0 ? reviews.map(review => <Review review={review} user={props.user} key={review._id}/>) : <p>This user has not received any reviews yet.</p>}
        //         </div>
        //     )}
        // </div>

/* <Flex borderRadius="3xl" overflow="hidden">
    {profileUser.picture && <Image src={`data:${profileUser.picture.contentType};base64,${Buffer.from(profileUser.picture.data.data).toString('base64')}`} />}
</Flex> */
