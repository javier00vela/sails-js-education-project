/**
 * Permiso.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_permiso: {
      type: 'integer',
      required: true,
      unique: true
    },
    roles: {
      collection: 'rol',
      via: 'permiso',
      through: 'permiso_rol'
    }
  }
};
