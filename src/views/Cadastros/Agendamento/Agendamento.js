import React, { useState, useEffect, useMemo } from "react";
import Axios from 'axios';


import ModalAgendarPaciente from "../../../components/Modals/Agendamento/addAgenda";

// reactstrap components
import {
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

import { thead } from "../../../variables/agenda.js";

function Paciente() {
  const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";
  console.log(baseURL);
  const [paciente, setpaciente] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    Axios.get(baseURL)
      .then(json => setpaciente(json.data))
  }, [])

  const filteredpaciente = useMemo(() => {
    const lowerCaseBusca = busca.toLowerCase();
    return paciente.filter(paciente => {
      return paciente.paciente_nome.toLowerCase().includes(lowerCaseBusca);
    }).map(paciente => {
      return (
        <tr key={paciente.paciente_id}>
          <td className="text-justify">{paciente.paciente_id}</td>
          <td className="text-justify">{paciente.paciente_nome} </td>
          <td className="text-justify">{paciente.paciente_cpf}</td>
          <td className="text-justify">{paciente.paciente_nascimento}</td>
          <td className="text-justify">{paciente.paciente_telefone}</td>
          <td className="text-justify">{paciente.paciente_cormobidade}</td>
          <td className="text-justify">{paciente.paciente_residencia}</td>
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
                <h4 className="title titleHeard px-2" md="8">Agendamento de Pacientes</h4>
                <ModalAgendarPaciente id={paciente.paciente_id}/>
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