import React, {useState, useEffect} from "react";
import {Table} from "react-bootstrap";

import TransactionDataService from "../services/transaction-data";
import TransactionsListRow from "./transaction-list-row";

const Dashboard = props => {
    const [lendTransactions, setLendTransactions] = useState([]);
    const [borrowTransactions, setBorrowTransactions] = useState([]);
    const [pastTransactions, setPastTransactions] = useState([]);

    useEffect(() => {
        const getLendTransactions = async user_id => {
            try {
                const response = await TransactionDataService.findByLender(user_id);
                setLendTransactions(response.data);
            } catch(e) {
                console.log("Error in get transactions by lender/borrower: ", e);
            }
        }
        const getBorrowTransactions = async user_id => {
            try {
                const response = await TransactionDataService.findByBorrower(user_id);
                setBorrowTransactions(response.data);
            } catch(e) {
                console.log("Error in get transactions by lender/borrower: ", e);
            }
        }
        const getPastTransactions = async user_id => {
            try {
                const response = await TransactionDataService.findPastTransactions(user_id);
                setPastTransactions(response.data);
            } catch(e) {
                console.log("Error in get transactions by lender/borrower: ", e);
            }
        }
        if (props.user){
            getLendTransactions(props.user._id);
            getBorrowTransactions(props.user._id);
            getPastTransactions(props.user._id);
        }
    }, [props.user]);

    return(
        <div>
            <h1>Dashboard</h1>
            {props.user._id && (<><h3>You are logged in with email {props.user.mail}!</h3>
                <br/>
                <h2>Upcoming transactions</h2>
                <h3>You lend</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Borrower</th>
                            <th>Time</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lendTransactions.map(transaction => <TransactionsListRow user={props.user} action="lender" transaction={transaction} otherUserId={transaction.borrower} key={transaction._id}/>)}
                    </tbody>
                </Table>
                <h3>You borrow</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Lender</th>
                            <th>Time</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowTransactions.map(transaction => <TransactionsListRow user={props.user} action="borrower" transaction={transaction} otherUserId={transaction.lender} key={transaction._id}/>)}
                    </tbody>
                </Table>
                <h2>Past Transactions</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Your role</th>
                            <th>Product</th>
                            <th>With User</th> 
                            <th>Time</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastTransactions.map(transaction => <TransactionsListRow role={(transaction.borrower == props.user._id) ? "borrower" : "lender"} user={props.user} transaction={transaction} otherUserId={transaction.borrower == props.user._id ? transaction.lender : transaction.borrower} key={transaction._id}/>)}
                    </tbody>
                </Table>
            </>)}  
        </div>
    );
};

export default Dashboard;
