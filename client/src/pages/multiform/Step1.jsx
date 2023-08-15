import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCompanies, getConnectionTypes } from "../../axios/userSkills";

const Step1 = (props) => {
  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getConnectionTypes()
      .then((data) => {
        setTypes(data);
      })
      .catch((e) => alert(e.response.data.message));
    getCompanies()
      .then((data) => {
        setCompanies(data);
      })
      .catch((e) => alert(e.response.data.message));
  }, [setTypes, setCompanies]);

  return (
    <section className='d-flex flex-raw mt-3 mb-3'>
      <Form.Select
        {...props.register("company", {
          required: { value: true },
        })}
        defaultValue=''
        className='w-25'
      >
        <option disabled={true} value=''>
          Выберите сетевую организацию
        </option>
        {companies.map((el) => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </Form.Select>

      <Form.Select
        {...props.register("reason", {
          required: { value: true },
        })}
        defaultValue=''
        className='w-25 ms-3'
      >
        <option disabled={true} value=''>
          Выберите тип подключения
        </option>
        {types.map((el) => {
          return (
            <option key={el.id} value={el.reason}>
              {el.reason}
            </option>
          );
        })}
      </Form.Select>
    </section>
  );
};

export default Step1;
