
module.exports = {

  attributes: {
    docente: {
      model: 'Usuario'
    },
    respuesta: {
      type: 'string',
    },
    pregunta: {
      model: 'Preguntas'
    },
    logro:{
      model:'Logro'
    },
    estado:{
      type : 'string' 
    }
  }
};
