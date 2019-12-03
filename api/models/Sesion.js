/**
 * Sesion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_sesion: {
      type: 'string',
    },
    logro: {
      model: 'logro'
    },
    tema:{
      type: 'string'
    },
    etapa_del_modelo:{
      type: 'string'
    },
    tecnica_de_ensenanza: {
      type: 'string'
    },
    recursos: {
      type:'string'
    },
    descripcion_de_la_actividad: {
      type: 'string'
    },
    fecha: {
      type: 'date'
    },
    curso: {
      model:'curso'
    },
    nivel:{
      model: 'nivel'
    }
  }
};
