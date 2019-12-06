import React, { useState } from 'react';
import { Modal, Button, Col, Form } from 'react-bootstrap';

const ModalForm = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const [selectValue, setSelectValue] = useState('Choose...');
    const handleChange = (event) => {
        // console.log(event.target.value)
        setSelectValue(event.target.value);
    }

    return (
        // backdrop="static" so clickscreen wont turn off Modal
        <Modal show={show} onHide={handleClose} size="sm" centered backdrop="static">
            <Modal.Header>
                <Modal.Title>Authentication</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Login as</Form.Label>
                    <Form.Control as="select" onChange={handleChange}>
                        <option>Choose...</option>
                        {
                            props.allUser.map((userId, index) => {
                                return (
                                    <option value={userId} key={index}>{userId}</option>
                                );
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="Success"
                    onClick={() => {
                        props.handleLogin(selectValue);  
                        handleClose()
                    }}
                    disabled={selectValue==='Choose...'}
                >
                    Login
                </Button>
                <Button
                    variant="Warning"
                    onClick={() => {
                        props.handleLogin(selectValue);  
                        handleClose()
                    }}
                    disabled={selectValue!=='Choose...'}
                >
                    Create new user
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForm; 