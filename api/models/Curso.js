/**
 * Curso.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_curso: {
      type: 'string',
      required: true
    },
    mallas: {
      collection: 'malla',
      via: 'curso',
      through: 'malla_curso'
    },
    cursos: {
      collection: 'logro',
      via: 'curso',
      through: 'sesion'
    },
  }
};
