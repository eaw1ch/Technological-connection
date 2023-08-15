import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { setAdmin } from "../../axios/adminSkills";

const SetAdmin = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addAdmin = () => {
    setAdmin({ email: value })
      .then((data) => {
        setValue("");
        onHide();
        alert(data.message);
      })
      .catch((e) => alert(e.response.data.message));
  };

  const closeMenu = () => {
    return () => {
      onHide();
      setValue("");
    };
  };

  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Назначить администратора
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type='email'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите почту пользователя"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={closeMenu()}>
          Закрыть
        </Button>
        <Button variant='outline-dark' onClick={addAdmin}>
          Назначить администратором
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetAdmin;
