/**
 * CursoController
 *
 * @description :: Server-side logic for managing cursoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		//Creates a Curso
		if(req.session.user){
			if(req.session.user.rol.nombre == "Administrador"){
					var obj = {
			num_curso: req.param('num_curso')
		}

		Curso.create(obj , function CursoCreated(err, newCurso) {
			
				if (err) {
				req.session.flash={
          err:["El curso ingresado ya existe"]
        		}
			}

			if(newCurso){
			req.session.flash={
          success:["curso se ha creado"]
       		 }
   		 }	
			res.redirect("/gestor");
		})
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}

	
	}
};
