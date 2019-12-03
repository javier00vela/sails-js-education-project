/**
 * AdministradorController
 *
 * @description :: Server-side logic for managing administradors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var prueba = 0 ;
module.exports = {
	vincular: function (req, res) {
	if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
		user=null
		docentes=[]
		async.series([
			consultarCoordinador,
 			consultarDocentes
		],finalizar)
			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}
		

		function consultarCoordinador(done) {
			Usuario.findOne(req.param('id'), function (err, userFounded) {
				if (err) {
					return done()
				}
				user=userFounded
				done()
			})
		}

		function consultarDocentes(done) {

			Usuario.find()
			.populate('rol')
			.exec(function (err, usersFounded) {
				if (err) {
					return done()
				}
				//console.log(usersFounded);
				for (var i = 0; i < usersFounded.length; i++) {
					console.log(usersFounded[i]);
					if (usersFounded[i].rol) {
						if (usersFounded[i].rol.nombre=='Docente' || usersFounded[i].rol.nombre=='Docente Experimental' ) {
							docentes.push(usersFounded[i])
						}
					}
				}
				done()
			})
		}

		function finalizar() {
			res.view('administrador/agregarDocente', {
				layout: 'layouts/publicLayout',
				user: user,
				docentes:docentes
			})
		}
		
	},
	index: function (req, res) {
		//shows the administrator index view. The one loaded when the user logged as administrator
			if(req.session.user){
				
			if(req.session.user.rol.nombre == 'Administrador'){
		var mensaje = {error:null, datos:null, mensaje:null}
		var roles=[]
		var docentesDB=[]
		var coordinadoresDB=[]
		var administradoresDB=[]

		console.log(req.session.me);

		async.series([
			consultarRoles,
			dividirUsuarios
		],finalizar)
			}else{
				console.log('rol no encontrado');
				res.redirect("/")
			}
		}else{
			console.log('no session');
		   res.redirect("/")
		}

		

		function consultarRoles(done) {
			//Consults the Roles in the DB
			Rol.find().populate('usuarios')
			.exec(function (err, rolesDB) {
				if (err) {
					mensaje.error = "Hubo un problema al consultar roles"
					return done()
				}
				if (rolesDB.length==0) {
					mensaje.error = "No se encontraron roles roles"
					return done()
				}
				for (var i = 0; i < rolesDB.length; i++) {
					roles.push(rolesDB[i])
				}
				done()
			})
		}
		function dividirUsuarios(done) {
			//Split the users with their respective roles
			for (var i = 0; i < roles.length; i++) {
				if (roles[i].nombre=="Docente"  ) {
					docentesDB=roles[i].usuarios

				}else if (roles[i].nombre=="Coordinador") {
					coordinadoresDB=roles[i].usuarios

				}else {
					administradoresDB=roles[i].usuarios

				}
			if (roles[i].nombre=="Docente Experimental" ) {
					docenteEDB=roles[i].usuarios

				}
			}
			done()
		}
		function finalizar() {
			//Load the indexView for users with Administrator rol, and pass as paremeters the users divided by their respective rol
			if(req.param('rolAdmin')==1){
			res.view('administrador/adminCoordinador',{
				layout:'layouts/publicLayout',
				coordinadores:coordinadoresDB,
			})
			}else{
				res.view('administrador/adminDocente',{
				layout:'layouts/publicLayout',
				docentes: docentesDB,
				docentesExp: docenteEDB,
			})
			}
		}

	},
	agregardocentes:function (req, res) {
		//Method to add every Docente to the specific Coordinador.
			if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
		console.log("Entro a agregarDocentes");
		var docentes=req.param('docentes')
		console.log("Es array?");
		var content = "nombre"+req.param('id');
		console.log(content);

		if (Array.isArray(req.param('docentes'))) {
			for (var i = 0; i < docentes.length; i++) {
				var obj={
					id_coordinador:req.param('id'),
					id_profesor:docentes[i],
					nombre:req.param('nombre'+req.param('docentes')[i])
				}
				Coordinador_Docente.create(obj).exec(function (err, docente_agregado) {
					if (err) {
						return res.json(err)
					}
				})
			}
		}else {
			var id = req.param('id');
			var obj={
				id_coordinador:req.param('id'),
				id_profesor:req.param('docentes'),
				nombre:req.param('nombre'+req.param('docentes'))
			}
			Coordinador_Docente.create(obj).exec(function (err, docente_agregado) {
				if (err) {
					return res.json(err)
				}
			})
		}

		req.session.flash={
          success:["se ha agregado docentes "]
        }

		res.redirect('/showadministrador?rolAdmin=1')


			}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}
		
	},
	edit: function (req, res, next) {
		//shows the form for editing users
			if(req.session.user){
			if(req.session.user.rol.nombre == 'Administrador'){
		Usuario.findOne(req.param('id'), function userFounded(err, user) {
			if (err) {
				return next(err)
			}
			if(!user){
				return next()
			}
			res.view('usuario/edit', {
				layout: 'layouts/publicLayout',
				user: user
			})
		})
			}else{
				res.redirect("/")
				console.log('rol no encontrado');
			}
		}else{
			console.log(' no session');
		   res.redirect("/")
		}
		
	},
	consultarPreguntas:function(req,res){
		if(req.session.user){
if(req.session.user.rol.nombre == 'Administrador'){
		if(req.param('tipo')=='monitoreo'){
			 preguntas_docente.find().populate('docente').populate('logro').populate('pregunta',{tipo:'monitoreo'}).exec(function(err,preguntasM){
			 	console.log('=======================');
			 	console.log(preguntasM);
			 	console.log('=======================');
		res.view('administrador/preguntas',{preguntas:preguntasM});
				});
		}else{
		 preguntas_docente.find().populate('docente').populate('logro').populate('pregunta',{tipo:'evaluacion'}).exec(function(err,preguntasE){
		 	console.log('=======================');
		 	console.log(preguntasE);
		 	console.log('=======================');
		res.view('administrador/preguntas',{preguntas:preguntasE});
				});
		}
		}else{
				res.redirect("/")
			}
		}else{
		   res.redirect("/")
		}
	},
	 seguimientoDocentes:function(req,res){
	 	var users = [];
	 	Rol.find().populate('usuarios').exec(function (err, rolesDB) {
				res.view("administrador/seguimientoDocente",
							{user:rolesDB});
				
		})
	},
	verModificaciones:function(req, res){
		Logro.find().populate('malla' ,{docente: req.param('id')}).populate('nivel')
      .populate('sesiones')
      .populate('cursos')
      .exec(function mallasFounded(err, sesiones ){

			res.view('administrador/verModificacion',{datos:sesiones , id:req.param('id')});

				});
	},
	 verMotivos: function(req,res){
	 	motivos=[]
	 	console.log("===============VER MOTIVOS=============");
	 	console.log(req.param("id"));
		Sesion.find({id:req.param("id")}).populate("logro").exec(function (err,result){ 

			for (var i = 0; i < result.length; i++) {  		    			
					        		    			
			     motivos.push(result[i]);
			}
			console.log(motivos);
			console.log(motivos[0].logro.objetivo_general);
			console.log(motivos[0].tema);
			res.view("administrador/verMotivos",{motivosDoc:motivos})
		})
	},
	verMotivosLogro:function(req,res){
		mallaIndicada = [];
		console.log(req.param("id"));
		Logro.find({id: req.param("id")}).populate("malla").exec(function(err,result){
			mallaIndicada= result;
			console.log(result);
			
			res.view("administrador/verMotivosLogro",{logrosDoc:mallaIndicada});
		})
	},
	 seguimientoLogros: function(req,res){
	 	logros = [];
	 	Malla.find().populate("logros").populate("docente").exec(function(err,result){
	 		ogros=result;
	 		console.log(ogros);
	 		console.log("||||||||||||||||||");
	 

	 		res.view("administrador/seguimientoLogros",{logros:ogros});
	 	});

	 	
	 },
	 AdministrarPreguntas:function(req,res){

	 	if(req.param('tipo') == "monitoreo"){
	 		
	 	preguntas.find({tipo:"monitoreo"}).exec(function(err,preguntas){

	 		res.view("administrador/administrarPreguntas",{preguntas:preguntas});
	 	});
		 }else{
		 	preguntas.find({tipo:'evaluacion'}).exec(function(err,preguntas){
	
		 		res.view("administrador/administrarPreguntas",{preguntas:preguntas});
	 		});

		 }
		
	 }

};