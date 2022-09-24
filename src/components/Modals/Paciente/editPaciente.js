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

export default function ModalEditPaciente({ id }) {

    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";

    const [values, setValues] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    useEffect(() => {
        Axios.get(`${baseURL}/${id}`)
            .then(json => setValues(json.data))
    }, [id])

    function patch(event) {
        event.preventDefault();
        Axios.patch(`${baseURL}/${id}`, values)
            .then(() => {
                setValues({});
            })
        alert('Atualizado com sucesso!');
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
                className="btn-icon btn-round"
                color="success"
                size="sm"
                onClick={handleShow}>
                <i className="fas fa-edit" />
            </Button>
            <Modal show={show}>
                <ModalHeader closeButton>
                    Atualizar Dados do Paciente
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => patch(event)}>
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
                                        value={values.residencia} 
                                        required={true}
                                        error={values.residencia === ''}
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