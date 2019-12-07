import React, { useState } from 'react';
import { Modal, Button, Col, Form } from 'react-bootstrap';

const ModalForm = (props) => {
    const [show, setsShow] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const handleClose = () => setsShow(false);

    const [selectId, setSelectId] = useState('Choose...');
    const handleIdChange = (event) => {
        // console.log(event.target.value)
        setSelectId(event.target.value);
    }

    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNewIdChange = (event) => {
        setNewId(event.target.value);
    }

    return (
        // backdrop="static" so clickscreen wont turn off Modal
        <Modal show={show} onHide={handleClose} size="sm" centered backdrop="static">
            <Modal.Header>
                <Modal.Title>{isNewUser ? 'New User' : 'Authentication'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    isNewUser ?
                        (<Form.Group as={Col} controlId="formGridState">
                            <Form.Label>LOGIN ID</Form.Label>
                            <Form.Control type="text" placeholder="enter id" value={newId} onChange={handleNewIdChange}/>
                            <br />
                            <Form.Label>DISPLAY NAME</Form.Label>
                            <Form.Control type="text" placeholder="enter name" value={newName} onChange={handleNameChange}/>
                        </Form.Group>)
                        :
                        (<Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Login as</Form.Label>
                            <Form.Control as="select" onChange={handleIdChange}>
                                <option>Choose...</option>
                                {
                                    props.allUser.map((userId, index) => {
                                        return (
                                            <option value={userId} key={index}>{userId}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>)
                }
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="Success"
                    onClick={() => {
                        if (!isNewUser) {
                            props.handleLogin(selectId);
                            handleClose();
                        }
                        else {
                            props.createNewUser(newId, newName);
                            handleClose();
                        }
                    }}
                    disabled={!isNewUser ? selectId === 'Choose...' : newName.length===0 || newId.length===0 }
                >
                    {isNewUser ? 'Confirm' : 'Login'}
                </Button>
                <Button
                    variant="Warning"
                    onClick={() => {
                        setIsNewUser(true)
                    }}
                    disabled={selectId !== 'Choose...' || isNewUser}
                >
                    Create New User
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForm; 