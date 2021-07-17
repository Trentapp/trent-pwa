import React from "react";
import {useHistory} from "react-router-dom";
import { Button } from "react-bootstrap";

import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";

const TransactionsListRow = props => {
    const history = useHistory();

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
            const response = await ChatDataService.getByLenderBorrowerProduct(props.transaction.lender._id, props.transaction.borrower._id, props.transaction.product._id, props.user.uid);
            history.push(`/chats/${response.data._id}`);
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    return(
        <tr>
            {props.role && <td>{props.role}</td>}
            <td>{props.transaction.product.name}</td>
            <td>{props.otherUser.name} <Button onClick={onContactUser}>Contact</Button></td> {/* make a link out of username and productName */}
            <td>{props.transaction.startDate} - {props.transaction.endDate}</td>
            <td>{(props.transaction.status === 0) ? <>❔</> : ((props.transaction.status === 1) ? <>❌</> : <>✔️</>)}</td>
            {props.action && (props.action === "lender" ? 
                <td><Button onClick={onRejectRequest}>Reject</Button>{props.transaction.status === 0 && <Button onClick={onAcceptRequest}>Accept</Button>}</td>
            : 
                <td><Button onClick={onCancelRequest}>Cancel booking</Button></td>
            )}
        </tr>
    );
};

export default TransactionsListRow;
