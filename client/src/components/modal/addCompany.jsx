import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addCompany } from "../../axios/adminSkills";

const AddCompany = ({ show, onHide }) => {
  const { watch, register, handleSubmit, getValues, reset } = useForm({
    mode: "all",
  });

  const closeMenu = () => {
    return () => {
      onHide();
      reset();
    };
  };

  const submitForm = () => {
    addCompany({
      name: getValues("name"),
      index: getValues("index"),
      city: getValues("city"),
      street: getValues("street"),
      house_number: getValues("house_number"),
      email: getValues("email"),
      phone_number: getValues("phone_number"),
      cite: getValues("cite"),
    })
      .then((data) => {
        onHide();
        reset();
        alert(data.message);
      })
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить компанию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-raw'>
        <Form style={{ width: "50%" }}>
          <Form.Control
            type='text'
            {...register("name", {
              required: { value: true },
            })}
            placeholder={"Введите название компании"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("index", {
              required: { value: true },
            })}
            placeholder={"Введите индекс"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("city", {
              required: { value: true },
            })}
            placeholder={"Введите город"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("street", {
              required: { value: true },
            })}
            placeholder={"Введите улицу"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("house_number", {
              required: { value: true },
            })}
            placeholder={"Введите номер дома"}
          />
          <Form.Control
            className='mt-3'
            type='email'
            {...register("email", {
              required: { value: true },
            })}
            placeholder={"Введите электронную почту"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("phone_number", {
              required: { value: true },
            })}
            placeholder={"Введите номер телефона"}
          />
          <Form.Control
            className='mt-3'
            type='text'
            {...register("cite", {
              required: { value: false },
            })}
            placeholder={"Введите адрес сайта"}
          />
        </Form>
        <div className='ms-5'>
          <h5 className='mb-3'>О компании</h5>
          {JSON.stringify(watch().name)?.length > 2 && (
            <pre>{"<<" + watch().name + ">>"}</pre>
          )}
          {JSON.stringify(watch().city)?.length > 2 && (
            <pre>
              {"Адрес: " +
                watch().city +
                ", " +
                watch().street +
                " " +
                watch().house_number}
            </pre>
          )}

          {JSON.stringify(watch().index)?.length > 2 && (
            <pre>{"Почтовый индекс: " + watch().index}</pre>
          )}

          <h5 className='mb-3'>Контакты</h5>
          {JSON.stringify(watch().email)?.length > 2 && (
            <pre>{"Электронная почта: " + watch().email}</pre>
          )}
          {JSON.stringify(watch().phone_number)?.length > 2 && (
            <pre>{"Телефон: " + watch().phone_number}</pre>
          )}
          {JSON.stringify(watch().cite)?.length > 2 && (
            <pre>{"Сайт: " + watch().cite}</pre>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={closeMenu()}>
          Закрыть
        </Button>
        <Button variant='outline-dark' onClick={handleSubmit(submitForm)}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCompany;
