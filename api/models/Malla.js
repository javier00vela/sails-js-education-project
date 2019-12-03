/**
 * Malla.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    docente: {
      model: 'usuario'
    },
    asignatura: {
      type: 'string',
      required:true,
    },
    nivel: {
      model: 'nivel'
    },
    cursos: {
      collection: 'curso',
      via: 'malla',
      through: 'malla_curso'
    },
    logros: {
      collection: 'logro',
      via: 'malla'
    }
  }
};
