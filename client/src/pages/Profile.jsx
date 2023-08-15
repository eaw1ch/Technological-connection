import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { Button, Container, Image, Form } from "react-bootstrap";
import profileIcon from "../assets/nofoto.png";
import { getPersonalData, setPersonalData } from "../axios/userSkills";

const Profile = () => {
  const { user } = useContext(Context);

  const [userData, setUserData] = useState({
    surname: "",
    name: "",
    patronymic: "",
    phone_number: "",
    passport_serial: "",
    passport_number: "",
    city: "",
    street: "",
    house_number: 0,
  });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getPersonalData()
      .then((response) => {
        setUserData({
          surname: response.data.surname,
          name: response.data.name,
          patronymic: response.data.patronymic,
          phone_number: response.data.phone_number,
          passport_serial: response.data.passport_serial,
          passport_number: response.data.passport_number,
          city: response.data.city,
          street: response.data.street,
          house_number: response.data.house_number,
        });
      })
      .catch((e) => alert(e.response.data.message));
  }, [setUserData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setPersonalData(
      userData.surname,
      userData.name,
      userData.patronymic,
      userData.phone_number,
      userData.passport_serial,
      userData.passport_number,
      userData.city,
      userData.street,
      userData.house_number
    )
      .then((response) => {
        alert(response.message);
      })
      .catch((e) => alert(e.response.data.message));
  };

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    setChecked(isChecked);
  };

  return (
    <Container className='d-flex flex-column mt-3 p-4'>
      <div className='d-flex flex-column'>
        <Image
          src={profileIcon}
          alt='avatar'
          className='rounded-circle'
          style={{ width: "150px" }}
          fluid
        />
        <h4 className='mt-2'>Пользователь</h4>
        <p>Роль: {user.role}</p>
      </div>

      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
        <Form.Group className='d-flex flex-column'>
          <Form.Label className='mt-3'>
            <h3>Общая информация о пользователе</h3>

            <label htmlFor='surname'>
              Фамилия
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.surname || ""}
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='name'>
              Имя
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='patronymic'>
              Отчество
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.patronymic || ""}
                onChange={(e) =>
                  setUserData({ ...userData, patronymic: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='phone_number'>
              Номер телефона
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.phone_number || ""}
                onChange={(e) =>
                  setUserData({ ...userData, phone_number: e.target.value })
                }
                required
              />
            </label>
          </Form.Label>
        </Form.Group>

        <Form.Group className='d-flex flex-column'>
          <Form.Label>
            <h4>Документ, удостоверяющий личность</h4>

            <label htmlFor='passport_seria'>
              Серия
              <Form.Control
                className=' mt-1'
                type='text'
                value={userData.passport_serial || ""}
                onChange={(e) =>
                  setUserData({ ...userData, passport_serial: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='passport_number'>
              Номер
              <Form.Control
                className=' mt-1'
                type='text'
                value={userData.passport_number || ""}
                onChange={(e) =>
                  setUserData({ ...userData, passport_number: e.target.value })
                }
                required
              />
            </label>
          </Form.Label>
        </Form.Group>

        <Form.Group className='d-flex flex-column'>
          <Form.Label>
            <h4>Адрес места регистрации</h4>

            <label htmlFor='city'>
              Город
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.city || ""}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='street'>
              Улица
              <Form.Control
                className='mt-1'
                type='text'
                value={userData.street || ""}
                onChange={(e) =>
                  setUserData({ ...userData, street: e.target.value })
                }
                required
              />
            </label>
            <label className='ms-3' htmlFor='home_number'>
              Номер дома
              <Form.Control
                className='mt-1'
                type='number'
                value={userData.house_number || 0}
                onChange={(e) =>
                  setUserData({ ...userData, house_number: e.target.value })
                }
                required
              />
            </label>
          </Form.Label>
        </Form.Group>

        <Form.Group className='d-flex flex-row' controlId='formCheckbox'>
          <Form.Check
            type='checkbox'
            className='mt-1'
            value={checked}
            onChange={handleChange}
          />
          <Form.Text className='w-50 ms-2'>
            Нажимая кнопку «Сохранить», я даю свое согласие на обработку моих
            персональных данных, в соответствии с Федеральным законом от
            27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для
            целей, определенных в Согласии на обработку персональных данных
          </Form.Text>
        </Form.Group>

        <Button disabled={!checked} type='submit' className='btn btn-dark w-25'>
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default observer(Profile);
