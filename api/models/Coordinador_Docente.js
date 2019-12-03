/**
 * Coordinador_Docente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_coordinador: {
      model: 'usuario'
    },
    id_profesor: {
      type:'string'
    },
    nombre:{
      type:'string'
    },
    comentarios: {
      collection: 'comentario',
      via: 'publicante'
    }
  }
};
