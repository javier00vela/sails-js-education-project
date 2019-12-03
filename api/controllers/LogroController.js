/**
 * LogroController
 *
 * @description :: Server-side logic for managing Logroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    if(req.session.user){
      if(req.session.user.rol.nombre == 'Docente' || req.session.user.rol.nombre == 'Docente Experimental' ){
       var malla1=null
    async.series([
      consultarMalla,
    ],finalizar)

      }else{
        res.redirect("/")
      }
    }else{
       res.redirect("/")
    }
    //shows the form to create a new Logro in docente/logro

    function consultarMalla(done) {
      Malla.findOne({id:req.param('id')})
			.populate('nivel')
			.populate('cursos')
			.populate('logros')
			.exec(function mallasFounded(err, mallaFounded ){

				if (err) {
					mensaje.error= "Error al consultar docente"
					return res.json(mensaje.error)
				}
				malla1=mallaFounded
				done()

			})
    }

    function finalizar() {
      //console.log("FinalizarLgroController");
      //console.log(malla1);
      res.view('docente/logro', {
        malla: malla1,
        periodo: req.param('periodo'),
        nlogro: req.param('nlogro')
      })
    }

  },
  create: function functionName(req, res, next) {
    //Creates a new Logro called with the post Method in the view Docente/logro
    //console.log("ENTRO A CREATE LOGRO");
     if(req.session.user){
      if(req.session.user.rol.nombre == 'Docente' || req.session.user.rol.nombre == 'Docente Experimental' ){
         async.waterfall(
      [
        crearLogro,
        prepararDatosSesion,
        crearSesiones,
      ],
      finalizar
    )

      }else{
        res.redirect("/")
      }
    }else{
       res.redirect("/")
    }
    
  

    function crearLogro(done) {

      var logroID=""
      var datosLogro={
        malla:req.param('mallaID'),
        num_logro:req.param('num_logro'),
        objetivo_general:req.param('objetivo_general'),
        estrategia_ensenianza:req.param('estrategia'),
        referentes_teoricos:req.param('referentes_teoricos'),
        fecha_inicio:req.param('fecha_inicio'),
        fecha_final:req.param('fecha_final'),
        evaluacion: req.param('evaluacion'),
        observacion_docente: req.param('observacion_docente'),
        periodo: req.param('periodo'),
        cantidad_evaluacion : 0,
        contador: 0,
        motivo:[]
      }

      console.log(datosLogro);

      console.log("Entro a crear Logro");
      Logro.create(datosLogro).exec(function (err, logroCreated) {
        if (err) {
          return done(err)
        }
        console.log("LogroID");
        console.log(logroCreated.id);
        logroID=logroCreated.id
        console.log("Creo Logro exitosamente");
        done(null, logroID)
      })
    }

    function prepararDatosSesion(logroID, done) {
      console.log("Entro a prepararDatosSesion");
      console.log("LogroID");
      console.log(logroID);



      Malla.findOne({id: req.param('mallaID')})
      .populate('cursos')
      .exec(function (err, mallaFounded) {
        if (err) {
          console.log("Error consultar malla");
          return done()
        }

        var datosSesiones=null
        if (Array.isArray(req.param('num_sesion'))) {
          console.log("Tiene Varios Elementos");
          var datosSesiones={
            num_sesion:req.param('num_sesion'),
            logro:logroID,
            tema:req.param('tema'),
            etapa_del_modelo:req.param('etapa_del_modelo'),
            tecnica_de_ensenanza:req.param('tecnica_de_ensenanza'),
            recursos:req.param('recursos'),
            descripcion_de_la_actividad:req.param('descripcion_de_la_actividad'),
            fechas:req.param('fecha'),
            cursos:mallaFounded.cursos,
            nivel:mallaFounded.nivel
          }
        }else {
          var datosSesiones={
            num_sesion:[req.param('num_sesion')],
            logro:logroID,
            tema:[req.param('tema')],
            etapa_del_modelo:[req.param('etapa_del_modelo')],
            tecnica_de_ensenanza:[req.param('tecnica_de_ensenanza')],
            recursos:[req.param('recursos')],
            descripcion_de_la_actividad:[req.param('descripcion_de_la_actividad')],
            fechas:req.param('fecha'),
            cursos:mallaFounded.cursos,
            nivel:mallaFounded.nivel
          }
          console.log("Tiene un solo elemento o ninguno");
        }

        console.log("datosSesiones");
        console.log(datosSesiones);
        done(null, datosSesiones)
      })

    }


    function crearSesiones(datosSesiones, done) {
      console.log("Entro a crear Sesiones");
      var sesiones=[]
      var num_sesiones=[]
      var logros=[]
      var temas=[]
      var etapas_del_modelo=[]
      var tecnicas_de_ensenanza=[]
      var recursos1=[]
      var descripciones_de_la_actividad=[]
      var fechas=datosSesiones.fechas
      var cursos=[]
      var niveles=[]
      var cursofechacheckarray=[]


      console.log(datosSesiones.num_sesion.length);
      console.log(datosSesiones.cursos.length);
      console.log(datosSesiones.fechas);


    /*  for (var i = 0; i < datosSesiones.num_sesion.length; i++) {
        for (var j = 0; j < datosSesiones.cursos.length; j++) { */
          //num_sesiones.push(datosSesiones.num_sesion)
          //logros.push(datosSesiones.logro)
          //temas.push(datosSesiones.tema)
          //etapas_del_modelo.push(datosSesiones.etapa_del_modelo)
          //tecnicas_de_ensenanza.push(datosSesiones.tecnica_de_ensenanza)
          //recursos1.push(datosSesiones.recursos)
          //descripciones_de_la_actividad.push(datosSesiones.descripcion_de_la_actividad)
          //cursos.push(datosSesiones.cursos)
          //niveles.push(datosSesiones.nivel)
     /*   }
      } */


          var continuarfecha = 0;
          var finalizarfecha = continuarfecha + datosSesiones.cursos.length;

         
      /*for (var i = 0; i < fechas.length; i++) {*/
        for (var i = 0; i < datosSesiones.num_sesion.length; i++) {

          var contcurso = 0;

          for (var j = 0; j < datosSesiones.cursos.length; j++) {

             if(datosSesiones.fechas.length == 10){
               var cursofechacheckarrays={
                  fecha:datosSesiones.fechas,
                  cursoid:datosSesiones.cursos[j].id,
                  cursonum:datosSesiones.cursos[j].num_curso,
                  check:false,
              }
          
            }else{
               console.log("===========================¡¡¡¡¡¡¡¡¡");
            console.log(datosSesiones.cursos);
            console.log("===========================¡¡¡¡¡¡¡");
                var cursofechacheckarrays={
                  fecha:datosSesiones.fechas[j],
                  cursoid:datosSesiones.cursos[j].id,
                  cursonum:datosSesiones.cursos[j].num_curso,
                  check:false,
              }  
            }
            

              cursofechacheckarray.push(cursofechacheckarrays);

              continuarfecha = j;
              contcurso++;

          }

          finalizarfecha = continuarfecha + datosSesiones.cursos.length;


            console.log(cursofechacheckarray);
     
    /*    var sesion={
          num_sesion:num_sesiones[i],
          logro:logros[i],
          tema:temas[i],
          etapa_del_modelo:etapas_del_modelo[i],
          tecnica_de_ensenanza:tecnicas_de_ensenanza[i],
          recursos:recursos1[i],
          descripcion_de_la_actividad:descripciones_de_la_actividad[i],
          fecha:fechas[i],
          curso:cursos[j].id,
          nivel:niveles[i]
        } */

        var sesion={
          num_sesion:datosSesiones.num_sesion[i],
          logro:datosSesiones.logro,
          tema:datosSesiones.tema[i],
          etapa_del_modelo:datosSesiones.etapa_del_modelo[i],
          tecnica_de_ensenanza:datosSesiones.tecnica_de_ensenanza[i],
          recursos:datosSesiones.recursos[i],
          descripcion_de_la_actividad:datosSesiones.descripcion_de_la_actividad[i],
          nivel:datosSesiones.nivel,
          cursofechacheck:cursofechacheckarray,
          contador:0,
          motivo:[],
          ultimaModificacion:""
          }

        console.log("Sesion");
        console.log(sesion);
        sesiones.push(sesion);

        cursofechacheckarray = [];

        }
      

      Sesion.create(sesiones).exec(function (err, sesionCreated) {
        if (err) {
           req.session.flash={
          err:["no se ha creado el logro"]
            }
        }
        req.session.flash={
          success:["se ha creado el logro"]
           }
        done()
      })
    }
    function finalizar() {
 
      res.redirect('showdocente')
    }
  },
delete:function(req,res){
   Logro.destroy(req.param('id')).exec(function(err, todo){
            if (err) {
        req.session.flash={
          err:["El logro  no se ha eliminado"]
            }
      }

      if(todo){
      req.session.flash={
          success:["se ha eliminado el logro"]
           }
       }  
       console.log(todo);

       

    });


       Sesion.destroy({logro:req.param('id')}).exec(function(err, todo){
      if (err) {
        res.send(500, {error: 'En la base de datos'})
      }

        res.redirect("/showdocente");
    });


},
guardarCheck:function(req,res){
var content = [];

Sesion.find(req.param('idSesion')).exec(function(err,sesion){
  for (var i = 0; i < sesion[0].cursofechacheck.length ; i++) {
    if(req.param('id') == sesion[0].cursofechacheck[i].cursoid ){
        content.push({ "fecha" : sesion[0].cursofechacheck[i].fecha,
            "cursoid" : sesion[0].cursofechacheck[i].cursoid,
            "cursonum" : sesion[0].cursofechacheck[i].cursonum,
            "check" : 'checked' });
    }else{
      content.push({ "fecha" : sesion[0].cursofechacheck[i].fecha,
            "cursoid" : sesion[0].cursofechacheck[i].cursoid,
            "cursonum" : sesion[0].cursofechacheck[i].cursonum,
            "check" : sesion[0].cursofechacheck[i].check });
    }
  }
  console.log(content);


   Sesion.update(req.param('idSesion'), { cursofechacheck : content   } ).exec(function(err,sesionUp){
console.log(sesionUp);

  });

 //sesion[0].cursofechacheck[parseInt(req.param('count'))-1].check;

 res.redirect('/editar?id='+sesion[0].logro);
});
 
},
eliminar:function(req,res){

  Sesion.destroy(req.param('id')).exec(function(err,sesion){

      if (err) {
        req.session.flash={
          err:["no se ha eliminado la sesion"]
            }
      }

      if(sesion){
      req.session.flash={
          success:["se ha elimiando la sesion"]
           }
       }  

    res.redirect('/editar?id='+req.param('idLogro'));
  });

  },

Observacion:function(req,res){
 logroById= [];
  motivosAnteriores = "";
  Logro.find({id:req.param('logros')}).exec(function(err, ogro){
      for(var i = 0; i < ogro.length; i++) {
          logroById.push(ogro[i])
      }
      
      motivosAnteriores = logroById[0].motivo;
      console.log(motivosAnteriores);
      con = parseInt(req.param("con"))+1;
    
     fechaActual = new Date();
      dia = fechaActual.getDate(); mes = fechaActual.getMonth()+1; año = fechaActual.getFullYear();
            if(dia<10){
              dia = '0'+dia;
            }        
            if(mes<10){
              mes = '0'+mes;
            }
          fechaActualFinal = año+"-"+mes+"-"+dia;
          motivosAnteriores.push({"mensaje": req.param("motivo"), "fecha": fechaActualFinal});




          Logro.update(req.param('logros'),{observacion_docente:req.param('observacion'), contador: con, motivo: motivosAnteriores })
          .exec(function(err,logro){
             if(logro){
                  req.session.flash={
                      success:["se ha editado correctamente"]
                       }
                   }  

            res.redirect('/editar?id='+req.param('logros'));
            });
        })
},

Evaluacion:function(req,res){
Logro.update(req.param('logros') ,{evaluacion:req.param('evaluacion') }).exec(function(err,logro){

if(logro){
      req.session.flash={
          success:["se ha editado correctamente"]
           }
       }  

res.redirect('/editar?id='+req.param('logros'));
});
},

editar:function(req,res){


  var logroDB = [];

  async.series([consultarLogro,],finalizar)


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
      var preguntasMonitoreo = [];
      preguntas.find({ tipo:'monitoreo' }).exec(function(err,preguntas){

if(preguntas){
  _.each(preguntas,function(preguntaRamdom){
    preguntasMonitoreo.push(preguntaRamdom);
  });
  for (let i = preguntasMonitoreo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasMonitoreo[i], preguntasMonitoreo[j]] = [preguntasMonitoreo[j], preguntasMonitoreo[i]];
    }
}

if (err) {
    req.session.flash={
          err:["problemas al responder la pregunta "]
           }
}

console.log('====ID====');
console.log(logroDB[0].malla.id);
console.log('===ID===');

Malla.find({asignatura:logroDB[0].malla.asignatura}).populate('cursos').exec(function(err , cursos){
    console.log('====cursos====');
console.log(cursos);
console.log('===ID===');
 res.view('docente/logroysesiones', {cursos:cursos , logros:logroDB , preguntas:preguntasMonitoreo});
});
 });
  
    }

},
update:function(req,res){
  sesionById= [];
  motivosAnteriores = "";
  Sesion.find({id:req.param('idSesion')}).exec(function(err, sesion){
    for (var i = 0; i < sesion.length; i++) {
          sesionById.push(sesion[i])
        }
        console.log("|||"+sesionById+"|||");
      //console.log("=============|||============"+sesionById);
      motivosAnteriores = sesionById[0].motivo;
      console.log(motivosAnteriores);
      
      con = parseInt(req.param("contador"))+1;
    
     fechaActual = new Date();
            dia = fechaActual.getDate();
            mes = fechaActual.getMonth()+1;
            año = fechaActual.getFullYear();
            if(dia<10){
              dia = '0'+dia;
            }        
            if(mes<10){
              mes = '0'+mes;
            }
            fechaActualFinal = año+"-"+mes+"-"+dia;
            motivosAnteriores.push({"mensaje": req.param("motivo"), "fecha": fechaActualFinal});
      console.log(motivosAnteriores);
           
    var obj = {
      tema : req.param("tema"),
      etapa_del_modelo : req.param("etapa_del_modelo"),
      tecnica_de_ensenanza : req.param("tecnica_de_ensenanza"),
      recursos : req.param("recursos"),
      descripcion_de_la_actividad : req.param("descripcion_de_la_actividad"),
      motivo :  motivosAnteriores /*motivosAnteriores.push({"fecha":fechaActualFinal, "mensaje": req.param("motivo")})*/,
      contador : con,
      ultimaModificacion: fechaActualFinal
    }
//console.log(req.param("contador"));

    Sesion.update(req.param('idSesion'), obj, function updateSesion(err, sesion) {
            if (err) {
              req.session.flash={
                err:["no se ha actuaizado"]
                  }
            }
            if(sesion){
              req.session.flash={
                success:["Sesión actualizada!"]
            }
              }


      res.redirect("/editar?id="+sesion[0].logro);

    })
    

  })






    

 // res.redirect("/showdocente");
 

  },

ver:function(req,res){

  var logroDB = [];

  async.series([consultarLogro,],finalizar)


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

      Comentario.find({logro: req.param('id')}).populate('publicante').exec(function(err,comentario){

        console.log(logroDB);
        console.log(comentario);

         res.view('docente/verLogro', {logros:logroDB , comentarios:comentario });

      });
    }


},
añadirSesion:function(req,res){
    arrayCursoFechaCheck = [];
    cursofechacheckarray = [];
    console.log(req.param('mallaid'));
    Malla.find({id:req.param('mallaid')}).populate("cursos").exec(function (err, mallaFounded) {
      console.log("1111111111111111111111111111111111111111111111111111111111111111111111111111111");
      var mallas = mallaFounded;
        console.log(mallas);

        var mientras = {
          fechas:req.param('fecha'),
          cursos:mallas[0].cursos,
          nivel:mallas[0].nivel
        }
        console.log(".");
        console.log(mientras);
  

         var continuarfecha = 0;
          var finalizarfecha = continuarfecha + mientras.cursos.length;

          for (var j = 0; j < finalizarfecha; j++) {
            console.log(mientras.fechas.length);
            if(mientras.fechas.length == 10){
               var cursofechacheckarrays={
                  fecha:mientras.fechas,
                  cursoid:mientras.cursos[j].id,
                  cursonum:mientras.cursos[j].num_curso,
                  check:false,
              }
          
            }else{
                var cursofechacheckarrays={
                  fecha:mientras.fechas[j],
                  cursoid:mientras.cursos[j].id,
                  cursonum:mientras.cursos[j].num_curso,
                  check:false,
              }  
            }
            
            

              cursofechacheckarray.push(cursofechacheckarrays);

              
              

          }
          console.log("7777777777777777777777777777777777777777777777777777777");
          console.log(cursofechacheckarray);
                    console.log("7777777777777777777777777777777777777777777777777777777");
  
         var datosSesiones={
            num_sesion:req.param('num_sesion'),
            logro:req.param('logro'),
            tema:req.param('tema'),
            etapa_del_modelo:req.param('etapa_del_modelo'),
            tecnica_de_ensenanza:req.param('tecnica_de_ensenanza'),
            recursos:req.param('recursos'),
            descripcion_de_la_actividad:req.param('descripcion_de_la_actividad'),
            nivel:req.param("nivel"),
            cursofechacheck:cursofechacheckarray,
            contador:0,
            motivo:[],
            ultimaModificacion:""
          }
             Sesion.create(datosSesiones).exec(function (err, sesionCreated) {
              if (err) {
                 req.session.flash={
                    err:["no se ha creado la sesion"]
                  }
              }
              req.session.flash={
                success:["se ha creado la sesion"]
                 }
              
              })
                   res.redirect('showdocente');
                   })

  },

};
