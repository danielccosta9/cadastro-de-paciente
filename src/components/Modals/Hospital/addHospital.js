import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";


import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    ModalBody,
    ModalHeader,
} from 'reactstrap';

export default function ModalAddHospital() {

    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/hospital";
    const [values, setValues] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);


    function submit(event) {
        event.preventDefault();
        Axios.post(baseURL, values)
            .then(() => {
                setValues({});
            })
        alert('Cadastrado com sucesso!');
        window.location.reload(false);
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value.toUpperCase();
        setValues(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <Button
                className="buttonComponents buttonView px-2"
                color="info"
                md="8"
                onClick={handleShow}
            >
                Cadastrar Hospital
            </Button>
            <Modal show={show}>
                <ModalHeader closeButton>
                    Cadastrar Hospital
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => submit(event)}>
                        <Row>
                            <Col className='pr-1' md='6'>
                                <FormGroup>
                                    <label>Nome</label>
                                    <input
                                        onChange={handleChange}
                                        id='nome'
                                        name='nome'
                                        type='text'
                                        className='form-control'
                                        placeholder='HOSPITAL DAS CLÍNICAS'
                                        value={values.nome}
                                        required={true}
                                        error={values.nome === ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='pr-1' md='6'>
                                <FormGroup>
                                    <label>Local</label>
                                    <input
                                        onChange={(event) => handleChange(event)}
                                        id='estado'
                                        name='estado'
                                        type='text'
                                        className='form-control'
                                        placeholder='JOAO PESSOA - PB'
                                        value={values.estado}
                                        required={true}
                                        error={values.estado === ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button className='buttonAdd buttonComponents buttonModal' type='submit'> Cadastrar</Button>

                        <Button
                            className="buttonCancel buttonComponents buttonModal"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}