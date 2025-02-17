import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import Questions from './Questions';
import swal from 'sweetalert';
import './static/style';

export const InputType = 'input';
export const RadioType = 'radio';
export const InputNumberType = 'number';
// => in the render() method of your app
const data = [
  {
    title: 'Nombre y apellido *',
    id: 'full_name',
    link: 'phone',
    type: InputType,
    i: 1
  },
  {
    title: 'Numero de whatsapp *',
    id: 'phone',
    link: 'age',
    type: InputType,
    i: 2
  },
  {
    title: '¿Cuál es tu edad?',
    id: 'age',
    link: 'objective',
    type: InputType,
    i: 3
  }/*,,
  {
    title: '¿Cuál es tu objetivo profesional?',
    id: 'objective',
    link: 'salary',
    type: RadioType,
    options: ['Crecimiento constante', 'Trabajar desde casa', 'Salario más alto'],
    i: 4
  }
  {
    title: '¿Cuál es tu salario actualmente?',
    id: 'salary',
    link: 'wish',
    type: RadioType,
    options: ['Menos de $200', 'Entre $200 y $1000', 'Más de $1000'],
    i: 5
  },
  {
    title: '¿Tienes un cambio de vida importante en el que te preparas?',
    id: 'wish',
    link: 'wishBlock',
    type: RadioType,
    options: ['Apoyar a mi familia','Mudarme a otro lugar','Salir de una deuda','Otro'],
    i: 6
  },
  {
    title: '¿Qué te impide hacer tus sueños realidad?',
    id: 'wishBlock',
    link: 'situation',
    type: RadioType,
    options: ['Tiempo','No se por donde arrancar','Dinero','Otro'],
    i: 7
  },
  {
    title: '¿Que opción que mejor se aplica a tu situación?',
    id: 'situation',
    link: 'studyTIme',
    type: RadioType,
    options: ['Estoy listo para trabajar.','Ya inicié mi camino pero me encuentro un poco perdido.','Estoy buscando cambiar de carrera.'],
    i: 8
  },
  {
    title: '¿Cuánto tiempo tienes en la semana para estudiar?',
    id: 'studyTIme',
    link: '.',
    type: RadioType,
    options: ['5 horas por semana','10 horas por semana','20 horas por semana o mas'],
    i: 9
  }*/
]

const anchorFunc = (anchor_data) => { // return array of anchor tags
  return anchor_data.map((item) => (
    item.id
  ))
}

export default function FullPage() {

  let options = {
    sectionClassName: 'section',
    anchors: anchorFunc(data),
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '50px',
    sectionPaddingBottom: '50px',
    arrowNavigation: false
  };

  const [obj, setObj] = useState({});


  const inputDataHandler = (name, value) => {
    setObj({
      ...obj,
      [name]: value
    });
  }
  const submitForm = () => {
    (async () => {
      const rawResponse = await fetch('https://public.herotofu.com/v1/5b7adbd0-0c87-11ed-9bdb-53c785fa3343', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
      const response = await rawResponse.json();
      let redirectUrl = response.redirect;
      const fullUrl = `${redirectUrl}?name=${obj.full_name}`;
      return window.location.replace(fullUrl);
    })();
  }

  const submitBtnHandler = () => {
    submitForm();  
    swal({ //show success message on completion
      title: "",
      text: "Gracías por completar la encuesta!",
      icon: "success",
      dangerMode: false,
    })
  }

  return (
    <div>
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        {
          data.map((item, i) => {
            return (
              <Section key={i} >
                <div>
                  <header className="App-header">
                    <Questions
                      item={item}
                      index={i}
                      isSubmit={i == (data.length - 1) ? true : false}
                      inputDataHandler={inputDataHandler}
                      submitBtnHandler={submitBtnHandler}
                      data={data}
                    />
                  </header>
                </div>
              </Section>
            )
          })
        }
      </SectionsContainer>
    </div>
  );
}

