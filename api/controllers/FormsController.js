/**
 * CreateController
 *
 * @description :: Server-side logic for managing creates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	gestor:function(req,res){
		if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
		res.view('pages/gestor', {
			layout: 'layouts/publicLayout'
		})
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}


	},
	newUsuario:function (req, res) {
		if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
				res.view('forms/usuario', {
				layout: 'layouts/publicLayout'
				})
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}
		//Renders the form forms/usuario
		
	}


};
