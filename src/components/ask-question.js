import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from 'react-i18next';

const QuestionForm = props => {
    const {t, i18n} = useTranslation();

    return(
        <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("Send Message to ")}{props.lender.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea placeholder="Your message" ref={props.messageRef} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.onSendMessage}>
                        {t("Send")}
                    </Button>
                    <Button onClick={() => props.setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default QuestionForm;

