import React, { useState, useEffect } from "react";
import Axios from 'axios';


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

import "../assets/css/button.css";
import "../assets/css/styles.css";

// core components

import PanelHeader from "components/PanelHeader/PanelHeader";

import { thead } from "../variables/agendados.js";

function Agendados() {
    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/agenda";
    const [agenda, setAgenda] = useState([]);

    useEffect(() => {
        Axios.get(baseURL)
            .then(json => setAgenda(json.data))
    }, [])

    const handleDelete = (id) => {
        Axios.delete(`${baseURL}/${id}`)
            .then(() => {
                setData(agenda => [
                    ...agenda.filter(agenda => agenda.agenda_id !== id),
                ]);
            })
        alert('Viagem realizada com sucesso!');
        window.location.reload(false);
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h4 className="title titleHeard px-2" md="8">Pacientes Agendados</h4>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead className="text-primary">
                                        <tr>
                                            {thead.map((prop, key) => {
                                                if (key === thead.length - 1)
                                                    return (
                                                        <th key={key} className="text-right">
                                                            {prop}
                                                        </th>
                                                    );
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agenda.map((agenda) => {
                                            if (agenda.agenda_status === 'AGENDADO') {
                                                return (
                                                    <tr key={agenda.agenda_id}>
                                                        <td>{agenda.paciente_nome} </td>
                                                        <td>{agenda.paciente_cpf}</td>
                                                        <td>{agenda.paciente_telefone}</td>
                                                        <td>{agenda.agenda_saida}</td>
                                                        <td>{agenda.agenda_marcado}</td>
                                                        <td>{agenda.hospital_nome}</td>
                                                        <td>
                                                            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(agenda.agenda_data).getTime() + 24 * 60 * 60 * 1000)}
                                                        </td>
                                                        <td>{agenda.agenda_carro}</td>
                                                        <td className="text-left">
                                                            <Button
                                                                className="btn-icon btn-round"
                                                                color="success"
                                                                size="sm"
                                                                onClick={handleDelete.bind(this, agenda.agenda_id)}
                                                            >
                                                                <i className="fas fa-check" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default Agendados;