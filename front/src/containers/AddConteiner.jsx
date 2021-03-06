import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, InputGroup, FormControl, Form, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/action-creators/orders";

import Alert from "../utils/Alert";

function AddContainer() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const currentOrder = useSelector((state) => state.orders);
  const history = useHistory();
  const location = useLocation();
  const route = location.pathname;
  const [lgShow, setLgShow] = useState(false);
  const [render, setRender] = useState(false);
  const [validation, setValidation] = useState("");
  const [toolToAdd, setToolToAdd] = useState("");
  const [order, setOrder] = useState({
    type: "",
  });

  const error = {
    msg: "Debes guardar una herramienta",
    key: Math.random(),
    type: "danger",
  };

  const errorType = {
    msg: "Debes seleccionar un tipo",
    key: Math.random(),
    type: "danger",
  };

  const createOk = {
    msg: "Creado con exito",
    key: Math.random(),
    type: "success",
  };

  const addTool = {
    msg: "Herramienta agregada",
    key: Math.random(),
    type: "success",
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(toolToAdd, e.target.value);
    const { value } = e.target;
    if (e.target.name === "tool") {
      setToolToAdd(value);
    } else {
      setOrder({ ...order, [e.target.name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      order.type === "" ||
      order.type === "Seleccionar" ||
      order.type === undefined
    ) {
      setValidation(errorType);
      setTimeout(function () {
        setValidation("");
      }, 1500);
    } else {
      dispatch(addOrder(order)).then((ord) => {
        if (ord === "err") {
          setValidation(errorType);
        } else {
          setValidation(createOk);
          setTimeout(function () {
            setValidation("");
            setLgShow(false);
            history.push(`/update`);
          }, 1500);
        }
      });
    }
    setOrder("");
  };

  const onSubmitTool = (e) => {
    e.preventDefault();
    if (toolToAdd === "") {
      setValidation(error);
      setTimeout(function () {
        setValidation("");
      }, 1500);
    } else {
      axios
        .post(`/api/tools/${currentUser.id}`, { toolName: toolToAdd })
        .then((tool) => {
          setValidation(addTool);
          setTimeout(function () {
            setValidation("");
            setLgShow(false);
            setRender(true);
          }, 1500);
        })
        .catch((e) => e);
    }
    setToolToAdd("");
  };

  switch (route) {
    case "/update":
      return <div className="name-ficha">{currentOrder.type}</div>;

    case "/":
      return (
        <div>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => setLgShow(true)}
          >
            <Plus size={25} />
            AGREGA UN PEDIDO
          </Button>

          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Selecciona el tipo de pedido
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  onChange={handleChange}
                  name="type"
                  as="select"
                  custom
                >
                  <option>Seleccionar</option>
                  <option>FEATURE</option>
                  <option>ERROR</option>
                </Form.Control>
              </Form.Group>
              <Button onClick={onSubmit} variant="primary" size="sm" block>
                <Plus size={25} />
                AGREGAR
              </Button>
              {validation ? (
                <Alert
                  className="alert"
                  key={validation.key}
                  message={validation.msg}
                  type={validation.type}
                />
              ) : null}
            </Modal.Body>
          </Modal>
        </div>
      );
    case "/mytools":
      return (
        <div>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => setLgShow(true)}
          >
            <Plus size={25} />
            AGREGA UNA HERRAMIENTA
          </Button>

          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Agregar una nueva herramienta
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group controlId="exampleForm.SelectCustom">
                <InputGroup className="mb-3 input-login">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Herramienta"
                    aria-label="Herramienta"
                    aria-describedby="basic-addon1"
                    name="tool"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Button onClick={onSubmitTool} variant="primary" size="sm" block>
                <Plus size={25} />
                AGREGAR
              </Button>
              {validation ? (
                <Alert
                  className="alert"
                  key={validation.key}
                  message={validation.msg}
                  type={validation.type}
                />
              ) : null}
            </Modal.Body>
          </Modal>
        </div>
      );

    default:
      return <div></div>;
  }
}
export default AddContainer;
