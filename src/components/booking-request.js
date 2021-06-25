import React from "react";
import {Modal} from "react-bootstrap";


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
                    Start time
                </div>
                <div className="col-md-6">
                    End time
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
