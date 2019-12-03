/**
 * NivelController
 *
 * @description :: Server-side logic for managing nivels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		//Creates a new Nivel in the DB
		var obj = {
			nombre: req.param('nombre')
		}

		Nivel.create(obj , function NivelCreated(err, newNivel) {
				if (err) {
				req.session.flash={
          err:["El Nivel ingresado ya existe"]
        		}
			}

			if(newNivel){
			req.session.flash={
          success:["Nivel se ha creado"]
       		 }
   		 }	
			res.redirect("/gestor");
		})
	}
};
