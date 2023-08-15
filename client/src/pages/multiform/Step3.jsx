import React from "react";
import { Form } from "react-bootstrap";

const Step3 = (props) => {
  return (
    <section className=' mt-3 mb-3'>
      <Form.Select
        {...props.register("doc_method", { required: true })}
        type='text'
        className='w-25'
        defaultValue=''
        placeholder='Адрес'
      >
        <option disabled={true} value=''>
          Выберите способ обмена документами
        </option>
        <option value='Электронное взаимодействие'>
          Электронное взаимодействие
        </option>
        <option value='Выдать лично'>Выдать лично</option>
      </Form.Select>

      <Form.Group className='mt-3'>
        <Form.Control
          {...props.register("file", { required: true })}
          type='file'
          id='file'
          className='w-25'
          placeholder='Загрузите файл'
        />
        <Form.Text className='w-25'>
          Согласие всех сособственников (их уполномоченных представителей) на
          присоединение к сетям сетевой организации
        </Form.Text>
      </Form.Group>

      <Form.Group className='d-flex flex-raw w-50 mt-3'>
        <Form.Check
          {...props.register("consent_processing", { required: true })}
          type='checkbox'
          className='mt-1'
        />
        <Form.Text className='ms-2'>
          Согласие на обработку персональных данных, сетевой организацией и
          субъектом розничного рынка, с которым имеется намерение заключить
          договор, обеспечивающий продажу электроэнергии на розничном рынке
        </Form.Text>
      </Form.Group>
    </section>
  );
};

export default Step3;
