import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";

import UserDataService from "../services/user-data";
import ProductDataService from "../services/product-data";

const TransactionsListRow = props => {
    const [username, setUsername] = useState("");
    const [productName, setProductName] = useState("");

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
        getUsername(props.otherUserId);
    }, [props.otherUserId, props.transaction]);

    const onCancelRequest = async () => {
        try {
            const text = "TODO";
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onRejectRequest = async () => {
        try {
            const text = "TODO";
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    const onAcceptRequest = async () => {
        try {
            const text = "TODO";
        } catch(e) {
            console.log("Error in transaction list row: ", e);
        }
    }

    return(
        <tr>
            <td>{productName}</td>
            <td>{username}</td> {/* make a link out of username and productName */}
            <td>{props.transaction.start_date} - {props.transaction.end_date}</td>
            <td>{(props.transaction.granted === 0) ? <>❔</> : ((props.transaction.granted === 1) ? <>❌</> : <>✔️</>)}</td>
            {props.action && (props.action === "lender" ? 
                <td><Button>Reject</Button><Button>Accept</Button></td>
            : 
                <td><Button>Cancel booking</Button></td>
            )} {/*if props.action exists and is not lender, it is borrower*/}
        </tr>
    );
};

export default TransactionsListRow;
