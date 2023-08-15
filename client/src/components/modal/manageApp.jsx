import React from "react";
import { Button, Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import { submittingApp } from "../../axios/adminSkills";

const manageApp = ({ show, onHide, app_number, allInfo, status }) => {
  const acceptApp = (app_id) => {
    submittingApp({ app_id }).then((data) => {
      alert(data.message);
    });
  };

  const acceptedApp = (app_number) => {
    return () => {
      acceptApp(app_number);
      onHide();
    };
  };

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Заявка №{app_number}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey='personal'
          id='uncontrolled-tab-example'
          className='mb-3'
        >
          <Tab eventKey='personal' title='Персональные данные'>
            <p>Фамилия: {allInfo?.personal_data?.surname}</p>
            <p>Имя: {allInfo?.personal_data?.name}</p>
            <p>Отчество: {allInfo?.personal_data?.patronymic}</p>
            <p>
              Адрес:{" "}
              {" г." +
                allInfo?.personal_data?.city +
                ", ул." +
                allInfo?.personal_data?.street +
                " " +
                allInfo?.personal_data?.house_number}
            </p>
            <p>Серия паспорта: {allInfo?.personal_data?.passport_serial}</p>
            <p>Номер паспорта: {allInfo?.personal_data?.passport_number}</p>
            <p>Номер телефона: {allInfo?.personal_data?.phone_number}</p>
          </Tab>
          <Tab eventKey='company' title='Сетевая компания'>
            <p>Название организации: {allInfo?.company.name}</p>
            <p>
              Адрес:{" "}
              {" г." +
                allInfo?.company.city +
                ", ул." +
                allInfo?.company.street +
                " " +
                allInfo?.company.house_number}
            </p>
            <p>Почтовый индекс: {allInfo?.company.index}</p>
            <p>Номер телефона: {allInfo?.company.phone_number}</p>
            <p>Электронная почта: {allInfo?.company.email}</p>
            <p>Сайт: {allInfo?.company?.cite}</p>
          </Tab>
          <Tab eventKey='type' title='Вид присоединения'>
            <p>Вид присоединения: {allInfo?.connection_type.reason}</p>
          </Tab>
          <Tab eventKey='device' title='Энергопринимающее устройство'>
            <p>Наименование объекта: {allInfo?.power_device.device}</p>
            <p>Кадастровый номер: {allInfo?.power_device.address}</p>
            <p>
              Максимальная мощность {allInfo?.power_device.max_power} кВт при
              напряжении {allInfo?.power_device.voltage} кВ
            </p>
            <p>Характер нагрузки: {allInfo?.power_device.load_type}</p>
          </Tab>
          <Tab eventKey='other' title='Прочие сведения'>
            <p>Способ обмена документами: {allInfo?.other_info.doc_method}</p>
            <p>
              Согласие на обработку персональных данных:{" "}
              {allInfo?.other_info.consent_processing
                ? "Получено"
                : "Не получено"}
            </p>
            <p>
              Прикрепленные файлы:{" "}
              <Link
                to={allInfo?.other_info.file}
                download={allInfo?.other_info.file}
                target='_blank'
                rel='noreferrer'
              >
                {allInfo?.other_info.file}
              </Link>
              {/* <a
                href='file:///C:Users/eaw1ch/app_vpr/backend/files/1cd6a60a-f63b-4baf-81c1-ab317f5fce7e.doc'
                download={allInfo?.other_info.file}
              >
                {allInfo?.other_info.file}
              </a> */}
            </p>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        {status ? (
          <>
            <Button variant='outline-dark' onClick={onHide}>
              Закрыть
            </Button>
          </>
        ) : (
          <>
            <Button variant='outline-dark' onClick={onHide}>
              Закрыть
            </Button>
            <Button variant='outline-dark' onClick={acceptedApp(app_number)}>
              Одобрить заявку
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default manageApp;
