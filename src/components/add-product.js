import { InfoIcon } from "@chakra-ui/icons";
import { Button, Center, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import ProductDataService from "../services/product-data";

//TODO: change redirect to history.push()

//later: make location of product the location of the user by default
const AddProduct = props => { 
    const initialProductState = {
        name: "",
        desc: "",
        prices: {
            perHour: "",
            perDay: "",
        },
        address: {
            street: "",
            houseNumber: "",
            streetWithNr: "",
            zipcode: "",
            city: "",
            country: "",
        }
    };
    const [product, setProduct] = useState(initialProductState);
    const history = useHistory();
    const [files, setFiles] = useState([]);
    
    useEffect(() => {
        // async function getOldProduct() {
        //     try {
        //         if (props.updateProductId){
        //             const response = await ProductDataService.get(props.updateProductId); //I get a warning here that I don't understand very well. Maybe change it later.
        //             setProduct(response.data);//for updating a product the userId should be set correctly here
        //             if (props.user._id !== response.data.user._id){
        //                 history.push("/404");//"Not found" if a wrong user wants to update the product // maybe replace 404 with forbidden route or so later
        //             }
        //         }
        //     } catch(e) {
        //         //this catch normally should only be triggered when the productID does not exist
        //         console.log("Error trying to retrieve old product state: ", e);
        //         history.push("/404");//not perfect, because it still shows content for a short second (maybe add sth like loading until the first useEffect is completed)
        //     }
        // }
        // getOldProduct();
        if (props.user.address) {
            setProduct(product => ({...product, address: props.user.address}));
        }
        if (props.product?._id) {
            setProduct(props.product);
        }
    }, [props.updateProductId, props.user, history, props.product]);

    //should those onChange functions be async?

    const onChangeName = e => {
        e.persist();
        setProduct(product => ({...product, name: e.target.value}));
    };

    const onChangeDesc = e => {
        e.persist();
        setProduct(product => ({...product, desc: e.target.value}));
    };

    const onChangeHourPrice = e => {
        e.persist();
        setProduct(product => ({...product, prices: {...product.prices, perHour: e.target.value}}));
    };

    const onChangeDayPrice = e => {
        e.persist();
        setProduct(product => ({...product, prices: {...product.prices, perDay: e.target.value}}));
    };

    const onChangeStreetWithNr = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, streetWithNr: e.target.value}}));
    };

    const onChangeZipcode = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, zipcode: e.target.value}}));
    };

    const onChangeCity = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, city: e.target.value}}));
    };

    const onChangeCountry = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, country: e.target.value}}));
    }; //later modify the country form so we get a dropdown choice

    const onChangePictures = e => {
        setFiles(e.target.files);
    }

    //TODO: add a validity check to only upload .jpg and .png images
    const fileUploadHandler = () => {
        const fd = new FormData();
        for (const file of files){
            fd.append("image", file);
        }
        return fd;
    }

    const saveProduct = async () => {
        try {
            const fd = fileUploadHandler();//hopefully I don't run into update problems
            const blob = new Blob([JSON.stringify({product: {...product, prices: {perDay: product.prices.perDay*100, perHour: product.prices.perHour*100}}, uid: props.user.uid})], {type: "application/json"});
            fd.append("product", blob);//probably change product to blob
            if (props.product?._id){//update probably currently not working
                await ProductDataService.updateProduct(props.product?._id, fd);
                props.setIsOpen(false);
            } else {
                const response = await ProductDataService.createProduct(fd);
                //const response = await ProductDataService.createProduct({product: product, uid: props.user.uid});//was from without file transfer
                history.push(`/products/product/${response.data.productId}`);
            }
        } catch(e) {
            console.log(`Error in saving new product: ${e}`);
            alert("Failed to save product. Please check that you filled all required fields. If it still does not work, please contact us: support@trentapp.com");
        }
    };

    return(
        <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.product?._id ? <>Update Product</> : <>Add a new product</>}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Item name</FormLabel>
                        <Input placeholder="Item name" onChange={onChangeName} value={product.name}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder="Description" onChange={onChangeDesc} value={product.desc}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Price
                            <Popover placement="right">
                                <PopoverTrigger>
                                    <IconButton icon={<InfoIcon />} size="xs"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Text>Use a point for floating point numbers</Text>
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <HStack>
                            <Input type="number" step={0.01} placeholder="per Hour" onChange={onChangeHourPrice} value={product.prices.perHour}/>
                            <Input type="number" step={0.01} placeholder="per Day" onChange={onChangeDayPrice} value={product.prices.perDay}/>
                        </HStack>
                    </FormControl>
                    <Text mt={5}>Address</Text>
                    <FormControl mt={4}>
                        <Input placeholder="Street and house number" onChange={onChangeStreetWithNr} value={product.address.streetWithNr}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <HStack>
                            <Input placeholder="Zipcode" onChange={onChangeZipcode} value={product.address.zipcode}/>
                            <Input placeholder="City" onChange={onChangeCity} value={product.address.city}/>
                        </HStack>
                    </FormControl>
                    <FormControl mt={4}>
                        <Input type="country" placeholder="Country" onChange={onChangeCountry} value={product.address.country}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="files">
                            Upload pictures{" "}
                            <Popover placement="right">
                                <PopoverTrigger>
                                    <IconButton icon={<InfoIcon />} size="xs"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Text>Leave empty to keep current images, or upload all new images.</Text>
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <input type="file" id="files" name="files" accept="image/*" multiple onChange={onChangePictures}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Center w="100%">
                        <Button onClick={saveProduct} colorScheme="green" w="100%">
                            Submit
                        </Button>
                    </Center>
                    {/* <Button onClick={() => props.setIsOpen(false)}>Cancel</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddProduct;
