import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { showAll } from "../axios/adminSkills";

const CheckUsers = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    showAll().then((data) => {
      data.sort((a, b) => {
        return a.id - b.id;
      });
      setArr(data);
    });
  }, [setArr]);

  let show = arr.map((user) => {
    return (
      <div className='card col' key={user.id}>
        <div className='card-body'>
          <p>Id: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Роль: {user.role}</p>
          <p>
            Аккаунт:{" "}
            {user.confirmed === true ? "Подтвержден" : "Не подтвержден"}
          </p>
        </div>
      </div>
    );
  });

  return (
    <Container className='d-flex flex-column mt-5'>
      <div className='row row-cols-lg-4 gap-5'>{show}</div>
    </Container>
  );
};

export default CheckUsers;
