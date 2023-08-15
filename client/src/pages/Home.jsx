import React, { useEffect, useState, useContext } from "react";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { APPLICATION_ROUTE, LOGIN_ROUTE } from "../components/routes/utils";
import { observer } from "mobx-react-lite";
import {
  getCountApp,
  getInfo,
  getSubmittedApp,
  sendFeedback,
} from "../axios/public";
import { Form, Button } from "react-bootstrap";
import AnimatedNumber from "animated-number-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [req, setReq] = useState(0);
  const [app, setApp] = useState(0);
  const [subApp, setSubApp] = useState(0);

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    getInfo().then((data) => {
      setReq(data.count);
    });
    getCountApp().then((data) => {
      setApp(data.count);
    });
    getSubmittedApp().then((data) => {
      setSubApp(data.count);
    });
  }, [setReq, setApp, setSubApp]);

  const submitFeedback = () => {
    sendFeedback(email, question);
  };

  return (
    <div className='container mt-5'>
      <h2 className=''>Заявка на технологическое присоединение</h2>
      <div className='mt-3'>
        Подача заявки на осуществление технологического присоединения
        энергопринимающих устройств потребителей электрической энергии
      </div>
      {user.isAuth ? (
        <Button
          onClick={() => navigate(APPLICATION_ROUTE)}
          variant='outline-dark'
          type='button'
          className='w-25 mt-3'
        >
          Подать заявку
        </Button>
      ) : (
        <Button
          onClick={() => navigate(LOGIN_ROUTE)}
          variant='outline-dark'
          type='button'
          className='w-25 mt-3'
        >
          Подать заявку
        </Button>
      )}
      <h2 className='mt-5'>Основные показатели деятельности</h2>
      <div className='d-flex flex-row mt-3 text-end'>
        <div className='d-flex flex-column p-2 w-25'>
          <AnimatedNumber
            className='mt-3 fs-2 fw-bold text-center'
            value={req}
            formatValue={(value) => value.toFixed(0)}
            duration={1000}
          />
          <p className='text-center opacity-50'>
            зарегистрировано
            <br /> пользователей
          </p>
        </div>

        <div className='d-flex flex-column p-2 w-25 ms-3'>
          <AnimatedNumber
            value={app}
            className='mt-3 fs-2 fw-bold text-center'
            formatValue={(value) => value.toFixed(0)}
            duration={1000}
          />
          <p className='text-center opacity-50'>подано заявок</p>
        </div>

        <div className='d-flex flex-column p-2 w-25 ms-3'>
          <AnimatedNumber
            value={subApp}
            className='mt-3 fs-2 fw-bold text-center'
            formatValue={(value) => value.toFixed(0)}
            duration={1000}
          />
          <p className='text-center opacity-50'>принято заявок</p>
        </div>
      </div>
      <h2 className='mt-5'>Обращение в службу технической поддержки</h2>
      <Form onSubmit={submitFeedback}>
        <Form.Group className='mt-3' controlId='formEmail'>
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type='email'
            className='w-50'
            placeholder='Введите свою электронную почту'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text>
            На введенную вами электронную почту придет ответ
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-3' controlId='formQuestion'>
          <Form.Label>У вас есть вопросы?</Form.Label>
          <Form.Control
            as='textarea'
            maxLength='300'
            type='text'
            className='w-50'
            style={{ minHeight: "135px" }}
            rows='5'
            placeholder='Задайте вопрос'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </Form.Group>

        <Button type='submit' variant='outline-dark' className='w-25 mt-3 mb-5'>
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default observer(Home);
