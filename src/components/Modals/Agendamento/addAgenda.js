import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MaskedInput from "react-text-mask";
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

import '../../../assets/css/button.css'
import DropdownHospital from 'components/Dropdown/Hospital';

export default function ModalAddAgenda() {

    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/agenda";
    const [values, setValues] = useState({});

    console.log(values);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function submit(event) {
        event.preventDefault();
        Axios.post(baseURL, values)
            .then(() => {
                setValues({});
            })
        alert('Agendado com sucesso!');
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
                className="buttonComponents buttonView px-2"
                color="info"
                md="8"
                onClick={handleShow}
            >
                Agendar Paciente
            </Button>
            <Modal show={show} >
                <ModalHeader closeButton>
                    Agendar Paciente
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => submit(event)}>
                        <Row>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label htmlFor='paciente'>Paciente</label>
                                    <input
                                        className='form-control'
                                        id='paciente'
                                        name='paciente_id'
                                        onChange={handleChange}
                                        type="number"
                                        required={true}
                                        error={values.paciente_id === ''}
                                        value={parseInt(values.paciente_id) || ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label>Data</label>
                                    <input
                                        className="form-control"
                                        name="data"
                                        type="date"
                                        required={true}
                                        onChange={handleChange}
                                        value={values.data || ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label>Status</label>
                                    <input
                                        onChange={handleChange}
                                        id='status'
                                        name='status'
                                        type='text'
                                        className='form-control'
                                        valueDefault={values.status = 'AGENDADO'}
                                        disabled={true}
                                        required={true}
                                        error={values.status === ''}
                                        value={values.status || 'AGENDADO'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='pr-1' md='12'>
                                <FormGroup>
                                    <label htmlFor='hospital'>Hospital</label>
                                    <DropdownHospital
                                        id="hospital"
                                        name="hospital_id"
                                        onChange={handleChange}
                                        type="number"
                                        required={true}
                                        value={values.hospital_id || ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label>Saída</label>
                                    <MaskedInput
                                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                        className="form-control"
                                        placeholder="Ex: 05:00"
                                        onChange={handleChange}
                                        value={values.saida || ''}
                                        type="text"
                                        name="saida"
                                        required={true}
                                        error={values.saida === ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label>Marcado</label>
                                    <MaskedInput
                                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                        className="form-control"
                                        placeholder="Ex: 07:00"
                                        onChange={handleChange}
                                        value={values.marcado || ''}
                                        type="text"
                                        name="marcado"
                                        required={true}
                                        error={values.marcado === ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='pr-1' md='4'>
                                <FormGroup>
                                    <label>Carro</label>
                                    <input
                                        onChange={handleChange}
                                        id='carro'
                                        name='carro'
                                        type='text'
                                        className='form-control'
                                        placeholder='SIM'
                                        value={values.carro || ''}
                                        error={values.carro === ''}
                                        required={true}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button className='buttonAdd buttonComponents buttonModal' type='submit'> Agendar</Button>

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