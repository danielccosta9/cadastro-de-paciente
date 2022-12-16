import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";
import MaskedInput from "react-text-mask";

import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    ModalBody,
    ModalHeader,
} from 'reactstrap';

export default function ModalAddPaciente() {

    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";
    const [values, setValues] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function submit(event) {
        event.preventDefault();
        Axios.post(baseURL, values)
            .then(() => {
                setValues({});
            })
        alert('Cadastrado com sucesso!');
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
                Cadastrar Paciente
            </Button>
            <Modal show={show}>
                <ModalHeader closeButton>
                    Cadastrar Paciente
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => submit(event)}>
                        <Row>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>Nome</label>
                                    <input 
                                        onChange={handleChange}
                                        id='nome' 
                                        name='nome' 
                                        type='text' 
                                        className='form-control'
                                        placeholder='Ex: João da Silva'
                                        value={values.nome}
                                        required={true}
                                        error={values.nome === ''} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>CPF</label>
                                    <MaskedInput
                                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                        className="form-control"
                                        placeholder="Ex: 123.456.789-10"
                                        onChange={handleChange}
                                        value={values.cpf || ''}
                                        type="text"
                                        name="cpf"
                                        required={true}
                                        error={values.cpf === ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>Data de Nascimento</label>
                                    <MaskedInput
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        onChange={(event) => handleChange(event)}
                                        id='nascimento' 
                                        name='nascimento'
                                        type="text"
                                        placeholder='09/09/2022'
                                        className='form-control'
                                        value={values.nascimento} 
                                        required={true}
                                        error={values.nascimento === ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>Telefone</label>
                                    <MaskedInput
                                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        className="form-control"
                                        placeholder="Ex: (83) 12345-6789"
                                        onChange={handleChange}
                                        value={values.telefone || ''}
                                        type="text"
                                        name="telefone"
                                        required={true}
                                        error={values.telefone === ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>Cormobidades</label>
                                    <input 
                                        onChange={(event) => handleChange(event)}
                                        id='cormobidades' 
                                        name='cormobidade' 
                                        type='text' 
                                        className='form-control'
                                        placeholder='Ex: Diabetes'
                                        value={values.cormobidade} 
                                        required={true}
                                        error={values.cormobidade === ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className='px-1' md='6'>
                                <FormGroup>
                                    <label>Residencia</label>
                                    <input 
                                        onChange={(event) => handleChange(event)}
                                        id='residencia' 
                                        name='residencia' 
                                        type='text' 
                                        className='form-control'
                                        placeholder='Ex: Zona Rural'
                                        value={values.residencia} 
                                        required={true}
                                        error={values.residencia === ''}
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