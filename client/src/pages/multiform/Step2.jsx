import React from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import { BsInfoCircle } from "react-icons/bs";

import { devices } from "./fakeDB/devices";
import { power } from "./fakeDB/power";
import { load } from "./fakeDB/load";

const Step2 = (props) => {
  return (
    <section className=' mt-3 mb-3'>
      <Form.Select
        {...props.register("device", { required: true })}
        className='w-25'
        defaultValue=''
      >
        <option disabled={true} value=''>
          Выберите наименование объекта
        </option>
        {devices.map((el) => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </Form.Select>
      <Form.Group className='center-group d-flex flex-raw mt-3'>
        <Form.Control
          {...props.register("address", { required: true })}
          type='text'
          className='w-25'
          placeholder='Введите кадастровый номер'
        />
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id='tooltip-right'>
              Местоположение объекта (устройства) должно совпадать с одним из
              адресов заявителя
            </Tooltip>
          }
        >
          <button type='button' className='empty ms-3'>
            <BsInfoCircle />
          </button>
        </OverlayTrigger>
      </Form.Group>

      <Form.Group className='d-flex flex-raw mt-3'>
        <Form.Control
          {...props.register("max_power", { required: true })}
          type='number'
          className='w-25'
          placeholder='Максимальная мощность, кВт'
        />
        <Form.Select
          {...props.register("voltage", { required: true })}
          className='w-25 ms-5'
          defaultValue=''
        >
          <option disabled={true} value=''>
            при напряжении
          </option>
          {power.map((el) => {
            return (
              <option key={el.id} value={el.value}>
                {el.value + " " + el.unit}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Select
        {...props.register("load_type", { required: true })}
        className='w-25 mt-3'
        defaultValue=''
      >
        <option disabled={true} value=''>
          Выберите характер нагрузки
        </option>
        {load.map((el) => {
          return (
            <option key={el.id} value={el.value}>
              {el.value}
            </option>
          );
        })}
      </Form.Select>
    </section>
  );
};

export default Step2;
