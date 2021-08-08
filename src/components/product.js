import React, {useState, useEffect, useRef} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
//import ImageGallery from 'react-image-gallery';

import ProductDataService from "../services/product-data";
import TransactionDataService from "../services/transaction-data";
import ChatDataService from "../services/chat-data";
import BookingRequest from "../components/booking-request";
import QuestionForm from "../components/ask-question";


const Product = props => {
    const [product, setProduct] = useState({prices: {}, user: {}}); //maybe add better initial state, though currently the information is shown conditionally
    const [error, setError] = useState(""); //can get rid of that if redirect works
    const [showReq, setShowReq] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showQuestionForm, setShowQuestionForm] = useState(false);
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

    return(
        <div>
            {error ? <h5>{error}</h5> : (
            <>
                <QuestionForm user={props.user} onHide={onHideModal} show={showQuestionForm} onSendMessage={onSendMessage} messageRef={messageRef} />
                <BookingRequest user={props.user} product={product} onHide={onHideModal} show={showReq} onSendRequest={onSendRequest} startDate={startDate} endDate={endDate} onChangeStartDate={onChangeStartDate} onChangeEndDate={onChangeEndDate}/>
                <div className="mb-4">
                    <h2>{product.name}</h2>
                    <p><b>Price:</b> {product.prices.perDay}€/day {product.prices.perHour && <>or {product.prices.perHour}€/hour</>}</p>
                    <p><span>Description: </span>{product.desc}</p>
                    {/*product.pictures && <ImageGallery items={product.pictures.map(picture => {thumbnail})}/> */ /*Maybe use ImageGallery later*/ }
                    {product.pictures && product.pictures.map(picture => <img height="300" width="auto" alt="" src={`data:image/png;base64,${picture.base64}`}/> )} {/*attention! for fynns pictures I would need that prefix: data:image/png;base64, // Can I use png for jpeg images when I converted them to base64? (probably not)*/}
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
        </div>
    )
}

export default Product;
