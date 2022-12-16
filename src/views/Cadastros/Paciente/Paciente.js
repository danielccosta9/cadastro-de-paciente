import React, { useState, useEffect, useMemo } from "react";
import Axios from 'axios';

import ModalAddPaciente from "../../../components/Modals/Paciente/addPaciente"
import ModalEditPaciente from "../../../components/Modals/Paciente/editPaciente";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Row,
  Col,
} from "reactstrap";

import "../../../assets/css/button.css";
import "../../../assets/css/styles.css";

// core components
import PanelHeader from "../../../components/PanelHeader/PanelHeader.js";

import { thead } from "../../../variables/paciente.js";

function Paciente() {
  const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";
  console.log(baseURL);
  const [paciente, setPaciente] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    Axios.get(baseURL)
      .then(json => setPaciente(json.data))
  }, [])

  const handleDelete = (id) => {
    Axios.delete(`${baseURL}/${id}`)
      .then(() => {
        setData(paciente => [
          ...paciente.filter(paciente => paciente.paciente_id !== id),
        ]);
      })
    alert('Registro apagado com sucesso!');
  };


  const filteredpaciente = useMemo(() => {
    const lowerCaseBusca = busca.toLowerCase();
    return paciente.filter(paciente => {
      return paciente.paciente_nome.toLowerCase().includes(lowerCaseBusca);
    }).map(paciente => {
      return (
        <tr key={paciente.paciente_id}>
          <td className="text-justify">{paciente.paciente_nome} </td>
          <td className="text-justify">{paciente.paciente_cpf}</td>
          <td className="text-justify">{paciente.paciente_nascimento}</td>
          <td className="text-justify">{paciente.paciente_telefone}</td>
          <td className="text-justify">{paciente.paciente_cormobidade}</td>
          <td className="text-justify">{paciente.paciente_residencia}</td>
          <td className="text-justify"> <ModalEditPaciente id={paciente.paciente_id}></ModalEditPaciente> </td>
          <td className="text-left">
            <Button
              className="btn-icon btn-round buttonCancel"
              color="danger"
              size="sm"
              onClick={handleDelete.bind(this, paciente.paciente_id)}
            >
              <i className="fas fa-trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }, [busca, paciente]);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title titleHeard px-2" md="8">Tabela de Pacientes</h4>
                <ModalAddPaciente />
                <form>
                  <InputGroup className="no-border">
                    <Input
                      placeholder="Pesquisar..."
                      value={busca}
                      onChange={(ev) => setBusca(ev.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
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
                    {filteredpaciente}
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
export default Paciente;