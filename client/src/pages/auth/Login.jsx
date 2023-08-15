import React from "react";
import { REGISTER_ROUTE } from "../../components/routes/utils";
import { Container, Form, Button, Row, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight / 1.2 }}
    >
      <Card style={{ width: "700px" }} className='p-5'>
        <h2 className='m-auto mb-3'>Авторизация</h2>
        <Form className='d-flex flex-column'>
          <Form.Floating className='mb-3'>
            <Form.Control
              type='email'
              placeholder='Введите ваш email...'
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <label htmlFor='floatingInputCustom'>Электронная почта</label>
          </Form.Floating>
          <Form.Floating className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Введите ваш пароль...'
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <label htmlFor='floatingInputCustom'>Пароль</label>
          </Form.Floating>
          <Row className='d-flex justify-content-between pl-3 pr-3'>
            <div>
              Нет аккаунта?{" "}
              <NavLink style={{ color: "black" }} to={REGISTER_ROUTE}>
                Зарегистрироваться
              </NavLink>
            </div>
            <Button
              type='submit'
              variant={"outline-dark"}
              className='mt-3 align-items-end'
              onClick={props.authFunction}
            >
              Войти
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
