/**
 * Logro.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    malla: {
      model:'malla'
    },
    num_logro: {
      type: 'integer'
    },
    objetivo_general: {
      type: 'string'
    },
     estrategia_ensenianza: {
      type: 'string'
    },
    referentes_teoricos: {
      type: 'string'
    },
    numero_sesiones: {
      type: 'integer'
    },
    sesiones: {
      collection: 'sesion',
      via: 'logro'
    },
    fecha_inicio: {
      type: 'date'
    },
    fecha_final: {
      type: 'date'
    },
    evaluacion: {
      type: 'string'
    },
    observacion_docente: {
      type: 'string'
    },
    periodo:{
      type: 'string'
    },
    nivel: {
      collection: 'nivel',
      via: 'logro',
      through: 'sesion'
    },
    cursos: {
      collection: 'curso',
      via: 'logro',
      through: 'sesion'
    },
    sesion: {
      model: 'sesion'
    },
     cantidad_evaluacion: {
      type: 'integer'
    }
  }
};
