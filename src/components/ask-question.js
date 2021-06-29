import React from "react";
import {Modal, Button} from "react-bootstrap";

const QuestionForm = props => {
    return(
        <Modal
            onHide={props.onHide}
            show={props.show}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>QuestionForm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea type="text" ref={props.messageRef}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onSendMessage}>Send</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuestionForm;
