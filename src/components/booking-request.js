import React from "react";
import {Modal, Button} from "react-bootstrap";
import Datetime from "react-datetime";

const BookingRequest = props => {


    return(
        <Modal
            onHide={props.onHide}
            show={props.show}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Booking Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Specify time to borrow here</p>
                <div className="col-md-6">
                    <label>Start time</label>
                    <Datetime value={props.startDate} onChange={props.onChangeStartDate}/>
                </div>
                <div className="col-md-6">
                    <label>End time</label>
                    <Datetime value={props.endDate} onChange={props.onChangeEndDate}/>
                </div>
                <p>probably some more information</p>
                <p>Calculate price dynamically here</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onSendRequest}>Send Request</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BookingRequest;
