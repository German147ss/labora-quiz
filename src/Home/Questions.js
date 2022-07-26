import React, { useState, useEffect } from 'react';
import { Input, Icon, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { InputNumberType, InputType, RadioType } from './FullPage';

export default function Questions({
  item,
  index,
  isSubmit,
  inputDataHandler,
  submitBtnHandler
}) {
  const [value, setValue] = useState({
  });

  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("0").focus();
  }, []);

  const clickHandler = (item) => {
    location.href = `#${item.link}`;
    setTimeout(() => {
      if (!item.options) {
        document.getElementById(item.i.toString()).focus();
      }
    }, 1100);
  };

  const inputHandler = (e, item) => {
    
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
      inputDataHandler(e.target.name, e.target.value);
    
  };

  const submitHandler = () => {
    submitBtnHandler();
  };

  const radioButtonClicked = (e, item) => {
    inputHandler(e, item);
    clickHandler(item)
  }

  return (
    <div >
      <div className="title">
        <h2>
          <span className="count">
            {index + 1} &nbsp;
            <Icon type="arrow-right" />
          </span>&nbsp;
          <span className="title">
            {item.title}
          </span>
        </h2>
      </div>
      {(() => {
        if (item.options) {
          return item.options.map((option) => (
            <div
              className="typeform-radio">
              <input 
                  id={option}
                  type="radio"
                  name={item.id} 
                  key={index}
                  value={option} 
                  defaultChecked={false}
                  onClick={(e) => radioButtonClicked(e, item)}
              /> <label htmlFor={option}
              >{option}</label>
            </div>
          ));          
        } else {
          return (
            <Input
              placeholder="Escribe tu respuesta..."
              name={item.id}
              id={String(index)}
              className="typeform-input"
              onPressEnter={() => clickHandler(item)}
              onChange={
                (e) => inputHandler(e, item) 
              }
            />
          )
        }
      })()}
      <br />
      {
        isSubmit ?
          <Button id="submit-btn" onClick={submitHandler}>
            ENVIAR
          </Button>
          :
          <div>
            <Button
              hidden={isMobile}
              icon="check"
              id="enter-btn"
              onClick={() => clickHandler(item)}
            >
              SIGUIENTE
            </Button>
            <span className="press-enter"> pulsa <span className="bold">Enter</span></span>
          </div>
      }
    </div>
  );
}
