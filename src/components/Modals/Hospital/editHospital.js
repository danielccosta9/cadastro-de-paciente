import React, { useState, useEffect } from 'react';
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

export default function ModalEditPaciente({ id }) {

    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/hospital";
    const [values, setValues] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    console.log(id);

    useEffect(() => {
        Axios.get(`${baseURL}/${id}`)
            .then((response) => {
                setValues(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])


    function patch(event) {
        event.preventDefault();
        Axios.patch(`${baseURL}/${id}`, values)
            .then(() => {
                setValues({});
            })
        alert('Atualizado com sucesso!');
        handleClose();
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value.toUpperCase();
        setValues(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <Button
                className="btn-icon btn-round"
                color="success"
                size="sm"
                onClick={handleShow}>
                <i className="fas fa-edit" />
            </Button>
            <Modal show={show}>
                <ModalHeader tton>
                    Atualizar Dados do Hospital
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => patch(event)}>
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
                                        value={values.estado}
                                        required={true}
                                        error={values.estado === ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button className='buttonAdd buttonComponents buttonModal' type='submit'> Atualizar</Button>

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