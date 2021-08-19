import React from "react";
import {Modal, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

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
                <p>{t("booking-request.Specify time to borrow here")}</p>
                <div className="col-md-6 mb-3">
                    <label>{t("booking-request.Start time: ")}</label>
                    <DatePicker selected={props.startDate}
                        onChange={props.onChangeStartDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/> {/*Note: later we can easily add exclude_times and exclude_dates for times-available*/}
                </div>
                <div className="col-md-6 mb-3">
                    <label>{t("booking-request.End time: ")}</label>
                    <DatePicker selected={props.endDate}
                        onChange={props.onChangeEndDate}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"/>
                </div>
                {/*change price: so that it does not get 0 if pricePerHour is 0*/}
                <br/>
                <p><b>Preis: {props.product.prices.perHour ? Math.min(Math.ceil((props.endDate - props.startDate)/(1000*60*60*24)) * props.product.prices.perDay, Math.ceil((props.endDate - props.startDate)/(1000*60*60)) * props.product.prices.perHour) : Math.ceil((props.endDate - props.startDate)/(1000*60*60*24)) * props.product.prices.perDay}€</b></p>
                <b>Achtung: Die Option für Online-Payment ist noch nicht vorhanden, kommt aber bald. Mit dem Click auf {t("booking-request.Send Request")} stimmen sie zu den angezeigten Preis an <em>{props.product.user.name}</em> zu zahlen. Standardmäßig mit Bar. (Sie können die Transaktion vor dem Termin noch abbrechen)</b>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onSendRequest}>{t("booking-request.Send Request")}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BookingRequest;
