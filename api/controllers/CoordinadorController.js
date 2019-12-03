/**
 * CoordinadorController
 *
 * @description :: Server-side logic for managing coordinadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {
		//Load the index view for users with Coordinador rol
		

		if(req.session.user){
			if(req.session.user.rol.nombre == 'Coordinador'){
				var coordinadorDB = null;
		var docentesCoordinador= null;
		var docentesDB=[];
		var idsDocentes=[];
		var mallasDB=[];
				async.series([
			consultarCoordinador_Docente,
			consultarDocentes,
			consultarMallas
		],finalizar)
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}

		function consultarCoordinador_Docente(done) {
			console.log("Mi id de session es")
			console.log(req.session.me)
			Usuario.findOne(req.session.me)
			.populate('profesores_a_cargo')
			.exec(function (err, userFounded) {
				if (err) {
					console.log("Error al consultar usuario")
				}
				console.log("ENTRO A COORDINADORCONTROLER-> consultarCoordinador_Docente")
				//console.log(userFounded)
				coordinadorDB= userFounded
				docentesCoordinador=userFounded.profesores_a_cargo
				//console.log(docentesCoordinador)
				done()
			})
			
		}

		function consultarDocentes(done) {
			Usuario.find()
			.populate('mallas')
			.exec(function (err, usersFounded) {
				if (err) {
					console.log("Error al consultar usuarios")
				}
				for (var i = 0; i < usersFounded.length; i++) {
					for (var j = 0; j < docentesCoordinador.length; j++) {
						if (usersFounded[i].id == docentesCoordinador[j].id_profesor) {
							docentesDB.push(usersFounded[i]) 
							idsDocentes.push(usersFounded[i].id)
						}
					}	
				}
				//console.log("Los docentes de este coordinador son:")
				console.log(docentesDB)
				done()
			})
		}
		function consultarMallas(done) {
			
			Malla.find()
			.populate('nivel')
			.populate('cursos')
			.populate('logros')
			.exec(function (err, mallasFounded) {
				if (err) {
					console.log(err)
				}

				for (var i = 0; i < docentesDB.length; i++) {
					for (var j = 0; j < docentesDB[i].mallas.length; j++) {
						for (var k = 0; k < mallasFounded.length; k++) {
							if (mallasFounded[k].id==docentesDB[i].mallas[j].id) {
								mallasDB.push(mallasFounded[k])
							}
						}	
					}
				}
				console.log('============================')
				console.log("MALLAS BUSCADAS y COMPARADAS")
				console.log(mallasDB)
				console.log('============================')

				done()
			})
		}

		function finalizar() {
		
			res.view('coordinador/index', {
				coordinador: coordinadorDB , 
				docentesACargo: docentesDB , 
				mallas: mallasDB
			})
		}

	},
	agregarComentarios: function (req, res) {

		if(req.session.user){
			if(req.session.user.rol.nombre == 'Coordinador'){
			var logroDB = [];

  async.series([consultarLogro,],finalizar)
	}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}

  function consultarLogro(done){
      Logro.find({id:req.param('id')})
      .populate('malla')
      .populate('nivel')
      .populate('sesiones')
      .populate('cursos')

      .exec(function logro(err, logro){
      if (err) {
        res.send(500, {error: 'En la base de datos'})
      }

      for (var i = 0; i < logro.length; i++) {
          logroDB.push(logro[i])
        }

      done()
    })
  }

    function finalizar() {
console.log(logroDB);
 res.view('coordinador/comment', {logros:logroDB});

  }
	},
	CreateComment: function(req,res){

		if(req.session.user){
			if(req.session.user.rol.nombre == 'Coordinador'){
			console.log('va a agregar un comentario');	
		var commentObj = {
			texto : req.param('texto'),
			publicante : req.param('coordinador'),
			docente : req.param('profesor'),
			logro: req.param('logro')

		}
		Comentario.create(commentObj).exec(function(err , comment){
		if(comment){
			console.log('=========================O');
			console.log('se creo');
			console.log(comment);
			
        console.log('=========================O');
       }

		})

			 req.session.flash={
          success:['se ha creado comentario']
        }
			
		res.redirect('/showcoordinador');
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}

		
	},
	edit: function (req, res, next) {
		//Shows The view to edit users
		if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
		Usuario.findOne(req.param('id'), function userFounded(err, user) {
			Rol.findOne(user.rol).exec(function(err , rol){
			if (err) {
				return next(err)
			}
			if(!user){
				return next()
			}
			res.view('usuario/edit', {
				user: user,
				rol:rol
			})
		})
	})
		}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}
	}
};
