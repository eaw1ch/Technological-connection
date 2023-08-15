import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../components/routes/utils";

const Confirm = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h5>
        Заявка была успешно отправлена. <br />
        Спасибо, что выбрали нас!
      </h5>
      <Button
        className='mt-3'
        variant='dark'
        onClick={() => navigate(HOME_ROUTE)}
      >
        На главную
      </Button>
    </section>
  );
};

export default Confirm;
