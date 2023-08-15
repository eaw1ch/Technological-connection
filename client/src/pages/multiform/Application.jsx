import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./app.scss";

import { PROFILE_ROUTE } from "../../components/routes/utils";

import { application, checkProfile } from "../../axios/userSkills";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirm from "./Confirm";

const Application = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkProfile()
      .then((data) => {
        return;
      })
      .catch((e) => {
        navigate(PROFILE_ROUTE);
        alert(e.response.data.message);
      });
  }, [navigate]);

  const MAX_STEP = 3;
  const [formStep, setFormStep] = useState(0);
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "all" });

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const prevFormStep = () => {
    if (formStep > 0) {
      setFormStep((cur) => cur - 1);
    }
  };

  const renderButton = () => {
    if (formStep > MAX_STEP - 1) {
      return undefined;
    } else if (formStep === MAX_STEP - 1) {
      return (
        <button disabled={!isValid} className='btn btn-dark mb-3' type='submit'>
          Подать заявку
        </button>
      );
    } else {
      return (
        <button
          disabled={!isValid}
          onClick={completeFormStep}
          className='btn btn-dark mb-3'
          type='button'
        >
          Далее
        </button>
      );
    }
  };
  const [app, setApp] = useState();
  const submitForm = async (values) => {
    window.alert(JSON.stringify(values, null, 2));
    console.log(values);
    completeFormStep();

    const formData = new FormData();

    formData.append("type", getValues("reason"));
    formData.append("doc_method", getValues("doc_method"));
    formData.append("consent_processing", getValues("consent_processing"));
    formData.append("device", getValues("device"));
    formData.append("address", getValues("address"));
    formData.append("max_power", getValues("max_power"));
    formData.append("voltage", getValues("voltage"));
    formData.append("load_type", getValues("load_type"));
    formData.append("companyName", getValues("company"));
    formData.append("file", getValues("file")[0]);

    await application(formData)
      .then((data) => {
        setApp(data.application);
      })
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-3'>Подача заявки на технологическое присоединение</h2>
      <Form className='mt-5' onSubmit={handleSubmit(submitForm)}>
        <div className='step-count d-flex'>
          {formStep < MAX_STEP && formStep !== 0 && (
            <div>
              <svg
                className='text-secondary'
                style={{ width: "35px" }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                onClick={prevFormStep}
              >
                <path
                  fillRule='evenodd'
                  d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}

          {formStep < MAX_STEP && (
            <div className='text-secondary ms-2 fs-5'>
              Шаг {formStep + 1} из {MAX_STEP}
            </div>
          )}
        </div>

        {formStep === 0 && <Step1 register={register} />}
        {formStep === 1 && <Step2 register={register} />}
        {formStep === 2 && <Step3 register={register} />}
        {formStep === 3 && <Confirm />}
        {renderButton()}
      </Form>
    </div>
  );
};

export default Application;
