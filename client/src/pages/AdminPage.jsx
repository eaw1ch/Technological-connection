import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

import SetAdmin from "../components/modal/setAdmin";
import AddCompany from "../components/modal/addCompany";

import {
  APPLICATIONS_ROUTE,
  CHECKUSERS_ROUTE,
} from "../components/routes/utils";

import { BsHouseAdd, BsPeople, BsPersonLock, BsJournals } from "react-icons/bs";

import "./admin.scss";

const AdminPage = () => {
  const [adminVisible, setAdminVisible] = useState(false);
  const [companyVisible, setCompanyVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <Container className='d-flex flex-column mt-5'>
      <div className='d-flex flex-raw'>
        <Button
          onClick={() => navigate(CHECKUSERS_ROUTE)}
          variant={"outline-dark"}
          className='mb-3 w-50'
        >
          <p style={{ fontSize: "35px" }}>Показать всех пользователей</p>
          <BsPeople className='panel-icon' />
        </Button>

        <Button
          onClick={() => setAdminVisible(true)}
          variant={"outline-dark"}
          className='mb-3 w-50 ms-3'
        >
          <p style={{ fontSize: "35px" }}>Сделать администратором</p>
          <BsPersonLock className='panel-icon' />
        </Button>
      </div>

      <div className='d-flex flex-raw'>
        <Button
          variant={"outline-dark"}
          className='mb-3 w-50'
          onClick={() => navigate(APPLICATIONS_ROUTE)}
        >
          <p style={{ fontSize: "35px" }}>Управление заявками</p>
          <BsJournals className='panel-icon' />
        </Button>

        <Button
          onClick={() => setCompanyVisible(true)}
          variant={"outline-dark"}
          className='mb-3 w-50 ms-3'
        >
          <p style={{ fontSize: "35px" }}>Добавить организацию</p>
          <BsHouseAdd className='panel-icon' />
        </Button>
      </div>

      <SetAdmin show={adminVisible} onHide={() => setAdminVisible(false)} />
      <AddCompany
        show={companyVisible}
        onHide={() => setCompanyVisible(false)}
      />
    </Container>
  );
};

export default AdminPage;
