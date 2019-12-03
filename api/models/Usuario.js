/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },
    apellido: {
      type: 'string',
      required: true
    },
    nit: {
      type: 'string'
    },
    correo: {
      type: 'email',
      required: true,
      unique: true
    },
    rol: {
      model: 'rol'
    },
    profesores_a_cargo: {
      collection: 'coordinador_Docente',
      via: 'id_coordinador'
    },
    mallas: {
      collection: 'malla',
      via: 'docente'
    }
  }
};
