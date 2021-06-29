import React, {useState, useEffect, useRef} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

import ProductDataService from "../services/product-data";
import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import BookingRequest from "../components/booking-request";
import QuestionForm from "../components/ask-question";
import Map from "../components/map.js";

const Product = props => {
    const [product, setProduct] = useState({prices: {}}); //maybe add better initial state, though currently the information is shown conditionally
    const [error, setError] = useState(""); //can get rid of that if redirect works
    const [showReq, setShowReq] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    //const [messageContent, setMessageContent] = useState("");
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
        setStartDate(date._d);
    }

    const onChangeEndDate = (date) => {
        setEndDate(date._d);
    }

    const onSendRequest = async () => {
        try {
            const transaction = {
                user_uid: props.user.uid,
                product_id: product._id,
                start_date: startDate,
                end_date: endDate,
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
                user_uid: props.user.uid,
                item_id: product._id,
                content: messageRef.current.value,
            };
            await ChatDataService.sendMessage(chat);
            history.push("/");
        } catch(e) {
            console.log("Failed to create transaction: ", e)
        }
    }

    useEffect(() => {
        const getProduct = async id => {
            try {
                const response = await ProductDataService.get(id);
                setProduct(response.data);
            } catch(e) {
                setError("Could not find that product.");
                console.log("Error in product.js - getProduct: ", e);
                history.push("/404");
            }
        };
        getProduct(props.match.params.id);
    }, [props.match.params.id, history]);

    return(
        <div>
            {error ? <h5>{error}</h5> : (
            <>
                <QuestionForm user={props.user} onHide={onHideModal} show={showQuestionForm} onSendMessage={onSendMessage} messageRef={messageRef} />
                <BookingRequest user={props.user} onHide={onHideModal} show={showReq} onSendRequest={onSendRequest} startDate={startDate} endDate={endDate} onChangeStartDate={onChangeStartDate} onChangeEndDate={onChangeEndDate}/>
                <div className="mb-4">
                    <h2>{product.name}</h2>
                    <p>Price: {product.prices.perHour}€/hour, {product.prices.perDay}€/day</p>
                    <p><span>Description: </span>{product.desc}</p>
                    {/*only shows first picture for now; the hard coded width and height is bad.*/}
                    {product.pictures && product.pictures[0] && <img height="300" width="550" alt="" src={`${product.pictures[0]}`}/>} {/*attention! for fynns pictures I would need that prefix: data:image/png;base64, // Can I use png for jpeg images when I converted them to base64? (probably not)*/}
                    <br/><br/>
                    {product.address && (
                        <>
                        <span>Address</span>
                        <p>{product.address.street} {product.address.houseNumber}</p>
                        <p>...</p>
                        <p>{product.address.country}</p>
                        </>
                    )}
                    <p>This product belongs to <Link to={`/profile/${props.user.uid}`}>[Insert Username later]</Link></p>
                    {props.user._id === product.user_id && (<>
                        <p><Link to={`/products/update/${product._id}`}>Edit product</Link></p>
                        <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
                    </>)}
                </div>
                <div className="mb-4">
                    {props.user._id !== product.user_id && 
                    <>
                    <div className="row col-2 float-end">
                        <Button variant="primary" className="float-end" onClick={onAskQuestionButtonClick}>Ask Question</Button>
                        <Button variant="primary" className="float-end" onClick={onRequestButtonClick}>Request product</Button>
                    </div>
                    
                    <br/>
                    <br/></>}
                </div>
                <div>
                    {product.location && <Map {...props} products={[product]}/>}
                </div>
            </>
            )}
        </div>
    )
}

export default Product;
