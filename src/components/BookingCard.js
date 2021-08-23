import { Box, Button, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next';

import TransactionDataService from "../services/transaction-data";

export default function BookingCard(props) {
    const {t} = useTranslation();
    
    const [startDate, setStartDate] = useState(null);//useState(new Date());
    const [endDate, setEndDate] = useState(null);//useState(new Date());
    const history = useHistory();

    const calcPrice = () => {
        if (props.product.prices.perHour && props.product.prices.perDay){
            return Math.min(Math.ceil((endDate - startDate)/(1000*60*60*24)) * props.product.prices.perDay, Math.ceil((endDate - startDate)/(1000*60*60)) * props.product.prices.perHour);
        } else if (props.product.prices.perDay) {
            return Math.ceil((endDate - startDate)/(1000*60*60*24)) * props.product.prices.perDay;
        } else if (props.product.prices.perHour) {
            return Math.ceil((endDate - startDate)/(1000*60*60)) * props.product.prices.perHour;
        }
        return 0;
    }

    const onChangeStartDate = (date) => {
        if (endDate === null || endDate < date){
            setEndDate(date.getTime() + 2*60*60*1000);//defaulting to a borrowing time of two hours
        }
        setStartDate(date);
        //for Datetime (not Datepicker): setStartDate(date._d);
    }

    const onChangeEndDate = (date) => {
        setEndDate(date);
        //for Datetime (not Datepicker): setEndDate(date._d);
    }

    const onBookRequest = async () => {
        try {
            const transaction = {
                uid: props.user.uid,
                productId: props.product._id,
                startDate: startDate,
                endDate: endDate,
            };
            await TransactionDataService.createTransaction(transaction);
            history.push("/dashboard");
        } catch(e) {
            console.log("Failed to create transaction: ", e)
        }
    }

    return (
        <Flex
            border="1px"
            borderColor="gray.200"
            borderRadius="3xl"
            boxShadow="lg"
            p={2}>
            <Box px={4} paddingTop={1}>
                <Heading size="md">{t("BookingCard.Choose time to borrow")}</Heading>
                <Box marginTop={4} border="1px" borderColor="gray.300">
                    <DatePicker selected={startDate}
                        placeholderText="Start Date"
                        onChange={onChangeStartDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/> {/*Note: later we can easily add exclude_times and exclude_dates for times-available*/}
                </Box>
                <Box marginTop={2} border="1px" borderColor="gray.300">
                    <DatePicker selected={endDate}
                        placeholderText="End Date"
                        onChange={onChangeEndDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/>
                </Box>
                <Text fontWeight="bold" my={3}>Price: {calcPrice()}€</Text>
                <Button w="100%" borderRadius="lg" display="flex" onClick={onBookRequest} bgGradient="linear(to-br, pink.500, red.500)" color="white" _hover={{ bgGradient:"linear(to-br, pink.600, red.600)" }}>Send booking request</Button>
            </Box>
        </Flex>
    )
}


//temporary
export const BookingCardSoon = (props) => {
    const {t} = useTranslation();
    
    const [startDate, setStartDate] = useState(null);//useState(new Date());
    const [endDate, setEndDate] = useState(null);//useState(new Date());
    const history = useHistory();

    const calcPrice = () => {
        if (props.product.prices.perHour && props.product.prices.perDay){
            return Math.min(Math.ceil((endDate - startDate)/(1000*60*60*24)) * props.product.prices.perDay, Math.ceil((endDate - startDate)/(1000*60*60)) * props.product.prices.perHour);
        } else if (props.product.prices.perDay) {
            return Math.ceil((endDate - startDate)/(1000*60*60*24)) * props.product.prices.perDay;
        } else if (props.product.prices.perHour) {
            return Math.ceil((endDate - startDate)/(1000*60*60)) * props.product.prices.perHour;
        }
        return 0;
    }

    const onChangeStartDate = (date) => {
        if (endDate === null || endDate < date){
            setEndDate(date.getTime() + 2*60*60*1000);//defaulting to a borrowing time of two hours
        }
        setStartDate(date);
        //for Datetime (not Datepicker): setStartDate(date._d);
    }

    const onChangeEndDate = (date) => {
        setEndDate(date);
        //for Datetime (not Datepicker): setEndDate(date._d);
    }

    const onBookRequest = async () => {
        try {
            const transaction = {
                uid: props.user.uid,
                productId: props.product._id,
                startDate: startDate,
                endDate: endDate,
            };
            await TransactionDataService.createTransaction(transaction);
            history.push("/dashboard");
        } catch(e) {
            console.log("Failed to create transaction: ", e)
        }
    }

    return (
        <Flex
            border="1px"
            borderColor="gray.200"
            borderRadius="3xl"
            boxShadow="lg"
            p={2}>
            <Box px={4} paddingTop={1}>
                <Heading size="md">{t("Booking Coming Soon")}</Heading>
                <Box marginTop={4} border="1px" borderColor="gray.300">
                    <DatePicker selected={startDate}
                        placeholderText="Start Date"
                        onChange={onChangeStartDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/> {/*Note: later we can easily add exclude_times and exclude_dates for times-available*/}
                </Box>
                <Box marginTop={2} border="1px" borderColor="gray.300">
                    <DatePicker selected={endDate}
                        placeholderText="End Date"
                        onChange={onChangeEndDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/>
                </Box>
                <Text fontWeight="bold" my={3}>Price: {calcPrice()}€</Text>
                <Tooltip label="This functionality is not implemented yet. If you need something, please contact the lender by chat.">
                <Button w="100%" borderRadius="lg" display="flex" bgGradient="linear(to-br, pink.500, red.500)" color="white" _hover={{ bgGradient:"linear(to-br, pink.600, red.600)" }}>Booking Coming Soon</Button>
                </Tooltip>
            </Box>
        </Flex>
    )
}
