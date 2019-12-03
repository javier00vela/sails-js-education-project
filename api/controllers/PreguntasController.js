module.exports = {
	create: function (req, res) {
		//Creates a new Permiso in the DB
		var obj = {
			pregunta: req.param('pregunta'),
			tipo: req.param('tipo'),
      estado : true
		}

		preguntas.create(obj , function preguntasCreated(err, newPregunta) {

			if (err) {
				req.session.flash={
          err:["La pregunta ingresado ya existe"]
        		}
			}

			if(newPregunta){
			req.session.flash={
          success:["pregunta se ha creado"]
       		 }
   		 }		
			
			res.redirect('/gestor')
		})
	},
delete:function(req,res){

preguntas_docente.update(req.param('id') , {estado : false} ).exec(function(err, pregunta) {

if (err) {
				req.session.flash={
          err:["La pregunta no se ha eliminado "]
        		}
			}

			if(pregunta){
			req.session.flash={
          success:["La pregunta  se ha eliminado "]
       		 }
   		 }	

   	console.log(pregunta);

   	if(pregunta[0].tipo == 'evaluacion' ){
        res.redirect('/consultarPreguntas?tipo=evaluacion')
      }else{
        res.redirect('/consultarPreguntas?tipo=monitoreo')
      }	
});
},
	guardar:function(req,res){
	var content = [];
	console.log(req.param('idLogro1'));
		for (var i = 1; i < 4; i++) {
		preguntas_docente.create({ docente : req.session.user.id ,logro: req.param('idLogro'+i), estado : true  , respuesta : req.param(i),pregunta: req.param('pregunta'+i) } , function preguntasCreated(err, newPregunta) {
			if (err) {
				req.session.flash={
          err:["no se han respondido las preguntas"]
       		 }
			}


		})
		
	}
		req.session.flash={
          success:["se han respondido las preguntas"]
       		 }

  Sesion.find(req.param('idSesion')).exec(function(err,sesion){


  for (var i = 0; i < sesion[0].cursofechacheck.length ; i++) {
        content.push({ "fecha" : sesion[0].cursofechacheck[i].fecha,
            "cursoid" : sesion[0].cursofechacheck[i].cursoid,
            "cursonum" : sesion[0].cursofechacheck[i].cursonum,
            "check" : 'checked'
  })

	
}
 Sesion.update(req.param('idSesion'), { cursofechacheck : content   } ).exec(function(err,sesionUp){
console.log(sesionUp);
  });
 
res.redirect("/editar?id="+req.param('logro'));
});
},
guardarEvaluacion:function(req,res){
	var content = [];
  preguntas.find({ tipo:'evaluacion' , estado:"true" }).exec(function(err,preguntaEvaluacion){
		for (var i = 0; i < preguntaEvaluacion.length; i++) {
      if(req.param(i) == null){
        req.param(i) = 3 ;
      }
		preguntas_docente.create({ docente : req.session.user.id , logro: req.param('logroId'+i)  , estado : true , respuesta : req.param(i),pregunta: req.param('pregunta'+i) } , function preguntasCreated(err, newPregunta) {
			Logro.update({id:req.param('logroId1')},{check:true , cantidad_evaluacion: preguntaEvaluacion.length }).exec(function(err,logro){
			if (err) {
				req.session.flash={
          err:["no se han respondido las preguntas"]
       		 }
			}
		})
	});
	}
		req.session.flash={
          success:["se han respondido las preguntas"]
       		 }

 
res.redirect("/showdocente");
  })
},
eliminar:function(req,res){

preguntas.update(req.param('id') , {estado : false} ).exec(function(err, pregunta) {

if (err) {
				req.session.flash={
          err:["La pregunta no se ha eliminado "]
        		}
			}

			if(pregunta){
			req.session.flash={
          success:["La pregunta  se ha eliminado "]
       		 }
   		 }	

   	console.log(pregunta);

   	if(pregunta[0].tipo == 'evaluacion' ){
        res.redirect('/administrarPreguntas?tipo=evaluacion')
      }else{
        res.redirect('/administrarPreguntas?tipo=monitoreo')
      }	
});
},
actualizar:function(req,res){
console.log(req.param('id'));
preguntas.update(req.param('id') ,{pregunta: req.param('pregunta')} ).exec(function(err, pregunta) {

if (err) {
				req.session.flash={
          err:["La pregunta no se ha actualizado "]
        		}
			}

			if(pregunta){
			req.session.flash={
          success:["La pregunta  se ha actualizado "]
       		 }
   		 }	

   	console.log(pregunta);

   	if(pregunta[0].tipo == 'evaluacion' ){
        res.redirect('/administrarPreguntas?tipo=evaluacion')
      }else{
        res.redirect('/administrarPreguntas?tipo=monitoreo')
      }	
});
}

};
