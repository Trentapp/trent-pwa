import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import React from "react";

const QuestionForm = props => {
    return(
        <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Send Message to {props.lender.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea placeholder="Your message" ref={props.messageRef} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.onSendMessage}>
                        Send
                    </Button>
                    <Button onClick={() => props.setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default QuestionForm;

        // <Modal
        //     onHide={props.onHide}
        //     show={props.show}
        //     size="lg"
        //     centered
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title>QuestionForm</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <textarea type="text" ref={props.messageRef}/>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={props.onSendMessage}>Send</Button>
        //     </Modal.Footer>
        // </Modal>
