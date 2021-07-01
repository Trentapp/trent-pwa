import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { Button } from "react-bootstrap";

import UserDataService from "../services/user-data";
import ProductDataService from "../services/product-data";
import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";

const TransactionsListRow = props => {
    const [username, setUsername] = useState("");
    const [productName, setProductName] = useState("");
    const history = useHistory();

    useEffect(() => {
        const getProductName = async id => {
            try {
                const response = await ProductDataService.get(id);
                setProductName(response.data.name);
            } catch(e) {
                console.log("Error in transaction list row: ", e);
            }
        }
        const getUsername = async id => {
            try {
                const response = await UserDataService.getProfile(id);
                setUsername(response.data.name);
            } catch(e) {
                console.log("Error in transaction list row: ", e);
            }
        }
        getProductName(props.transaction.item);
        if (props.otherUserId){
            getUsername(props.otherUserId);
        }
    }, [props.otherUserId, props.transaction]);

    const onCancelRequest = async () => {
        try {
            await TransactionDataService.setTransactionStatus(props.transaction._id, props.user.uid, 1);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onRejectRequest = async () => { // is actually currently identical to onCancelRequest
        try {
            await TransactionDataService.setTransactionStatus(props.transaction._id, props.user.uid, 1);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onAcceptRequest = async () => {
        try {
            await TransactionDataService.setTransactionStatus(props.transaction._id, props.user.uid, 2);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onContactUser = async () => {
        try {
            const response = await ChatDataService.getByLenderBorrowerProduct(props.transaction.lender, props.transaction.borrower, props.transaction.item);
            history.push(`/chats/${response.data._id}`);
            window.location.reload();
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    return(
        <tr>
            {props.role && <td>{props.role}</td>}
            <td>{productName}</td>
            <td>{username} <Button onClick={onContactUser}>Contact</Button></td> {/* make a link out of username and productName */}
            <td>{props.transaction.start_date} - {props.transaction.end_date}</td>
            <td>{(props.transaction.granted === 0) ? <>❔</> : ((props.transaction.granted === 1) ? <>❌</> : <>✔️</>)}</td>
            {props.action && (props.action === "lender" ? 
                <td><Button onClick={onRejectRequest}>Reject</Button>{props.transaction.granted === 0 && <Button onClick={onAcceptRequest}>Accept</Button>}</td>
            : 
                <td><Button onClick={onCancelRequest}>Cancel booking</Button></td>
            )} {/*if props.action exists and is not lender, it is borrower*/}
        </tr>
    );
};

export default TransactionsListRow;
