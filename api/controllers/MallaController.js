/**
 * MallaController
 *
 * @description :: Server-side logic for managing Mallas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function (req, res) {
		//shows the form to create a new Malla in forms/Malla
		var usuarioDB = null
		var nivelesDB =[]
		var cursosDB = []

		async.series([
			consultarUsuario,
			consultarNiveles,
			consultarCursos,
		],finalizar)

		function consultarUsuario(done) {
			Usuario.findOne(req.param('id'))
			.exec(function (err, userFounded) {
				if (err) {
					return res.json(err)
				}
				if (!userFounded) {
					return res.json("Usuario no encontrado")
				}
				usuarioDB = userFounded
				done()
			})
		}

		function consultarNiveles(done) {
			Nivel.find()
			.exec(function (err, nivelesFounded) {
				if (err) {
					return res.json(err)
				}
				if (!nivelesFounded) {
					return res.json("niveles no encontrados")
				}
				for (var i = 0; i < nivelesFounded.length; i++) {
					nivelesDB.push(nivelesFounded[i])
				}
				done()
			})
		}


		function consultarCursos(done) {
			Curso.find()
			.exec(function (err, cursosFounded) {
				if (err) {
					return res.json(err)
				}


				if (!cursosFounded) {
					return res.json("cursos no encontrados")
				}
				for (var i = 0; i < cursosFounded.length; i++) {
					cursosDB.push(cursosFounded[i])
				}
				done()
			})
		}


		function finalizar() {
			res.view('forms/malla', {
				usuario:usuarioDB,
				niveles:nivelesDB,
				cursos: cursosDB
			})
		}
	},
	create:function (req, res) {
		//Creates de Malla input in the DB
		
		var mensaje = {error:null, datos:null, mensaje:null}
		mallaobj={
			docente:req.param('id'),
			asignatura:req.param('asignatura'),
			nivel:req.param('nivel'),
			cursos:req.param('cursos'),
			logros:[]
		}

		Malla.create(mallaobj, function mallaCreated(err, NewMalla) {
					   if (err) {
        req.session.flash={
          err:["no se ha creado la  malla"]
            }
      }

      if(NewMalla){
      req.session.flash={
          success:["se ha creado la malla"]
           }
       }  

			res.redirect('/showadministrador?rolAdmin=2')
		})
	}
};
