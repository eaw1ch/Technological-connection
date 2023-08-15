import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllApp, getInfoApplication } from "../axios/adminSkills";

import ManageApp from "../components/modal/manageApp";

const Applications = () => {
  const [manage, setManage] = useState(false);
  const [value, setValue] = useState();
  const [arr, setArr] = useState([]);
  const [allInfo, setAllInfo] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getAllApp().then((data) => {
      data.sort((a, b) => {
        return a.id - b.id;
      });
      setArr(data);
    });
  }, [setArr]);

  const getInfoApp = (user_id, type_id, company_id, device_id, info_id) => {
    getInfoApplication(user_id, type_id, company_id, device_id, info_id)
      .then((data) => {
        setAllInfo(data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  let show = arr.map((app) => {
    return (
      <div className='card col w-25' key={app.id}>
        <div className='card-body'>
          <p>Заявка №{app.id}</p>
          <p>От пользователя: {app.user}</p>
          <p>
            Статус заявки: {app.submitted === true ? "Одобрена" : "В ожидании"}
          </p>
          <Button
            onClick={() => {
              setManage(true);
              setStatus(app.submitted);
              setValue(app.id);
              getInfoApp({
                user_id: app.userId,
                type_id: app.connectionTypeId,
                company_id: app.companyId,
                device_id: app.powerDeviceId,
                info_id: app.otherInfoId,
              });
            }}
            variant='outline-dark'
          >
            Просмотреть
          </Button>
        </div>
      </div>
    );
  });

  return (
    <Container className='d-flex flex-column mt-5'>
      <div className='row row-cols-lg-4 gap-5'>{show}</div>
      <ManageApp
        status={status}
        app_number={value}
        allInfo={allInfo}
        show={manage}
        onHide={() => setManage(false)}
      />
    </Container>
  );
};

export default Applications;
