import React, { useState, useEffect, useMemo } from "react";
import Axios from 'axios';


import ModalAddHospital from "../../../components/Modals/Hospital/addHospital";
import ModalEditHospital from "../../../components/Modals/Hospital/editHospital";

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

import { thead } from "../../../variables/hospital";

function Hospital() {
  const baseURL = "https://api-node-paciente-postgres.herokuapp.com/hospital";
  const [hospital, setHospital] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    Axios.get(baseURL)
      .then(json => setHospital(json.data))
  }, [])

  const handleDelete = (id) => {
    Axios.delete(`${baseURL}/${id}`)
      .then(() => {
        setData(hospital => [
          ...hospital.filter(hospital => hospital.hospital_id !== id),
        ]);
      })
    alert('Registro apagado com sucesso!');
    window.location.reload(false);
  };

  const filteredHospital = useMemo(() => {
    const lowerCaseBusca = busca.toLowerCase();
    return hospital.filter(hospital => {
      return hospital.hospital_nome.toLowerCase().includes(lowerCaseBusca);
    }).map(hospital => {
      return (
        <tr key={hospital.hospital_id}>
          <td className="text-justify">{hospital.hospital_nome} </td>
          <td className="text-justify">{hospital.hospital_estado}</td>
          <td> <ModalEditHospital id={hospital.hospital_id}></ModalEditHospital> </td>
          <td className="text-left">
            <Button
              className="btn-icon btn-round buttonCancel"
              color="danger"
              size="sm"
              onClick={handleDelete.bind(this, hospital.hospital_id)}
            >
              <i className="fas fa-trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }, [busca, hospital]);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title titleHeard px-2" md="8">Tabela de Hospitais</h4>
                <ModalAddHospital />
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
                    {filteredHospital}
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
export default Hospital;