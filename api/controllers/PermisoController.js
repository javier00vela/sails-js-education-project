/**
 * PermisoController
 *
 * @description :: Server-side logic for managing permisoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		//Creates a new Permiso in the DB
		var obj = {
			num_permiso: req.param('num_permiso')
		}

		Permiso.create(obj , function permisoCreated(err, newPermiso) {

			if (err) {
				req.session.flash={
          err:["El permiso ingresado ya existe"]
        		}
			}

			if(newPermiso){
			req.session.flash={
          success:["permiso se ha creado"]
       		 }
   		 }		
			
			res.redirect('/gestor')
		})
	}
};
