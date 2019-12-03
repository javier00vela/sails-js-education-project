/**
 * DocenteController
 *
 * @description :: Server-side logic for managing docentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
module.exports = {
 
  index: function (req, res) {
    if(req.session.user){
      if(req.session.user.rol.nombre == 'Docente' || req.session.user.rol.nombre == 'Docente Experimental' ){
        var docenteDB = "";
        var mallasDB = [];
        var respMalla = [];
        var datosMalla = [];
        var malla = [];
        var estrategiaMalla = [];
        var estrategias = ['Cognitivas', 'Metacognitivas', 'Ludicas', 'Tecnologicas', 'Socio-afectivas']
        var estrategiaPredefinida = [{nombre:'Cognitivas', promedio:0 , cantidad:0 },{nombre:'Metacognitivas', promedio:0 , cantidad:0},
        {nombre:'Ludicas', promedio:0 , cantidad:0},{nombre:'Tecnologicas', promedio:0 , cantidad:0 },{nombre:'Socio-afectivas', promedio:0 , cantidad:0 }]
    if(req.session.user.rol.nombre == 'Docente Experimental' ){
    async.series([
      consultarUsuario,
      consultarMallas, 
      consultarPreguntas,
      listarPreguntas,
     listasEnsenanzas,
    enlazarAprendizaje,
    crearJsonEstrategia

    ],finalizar)
  }else{
    async.series([
      consultarUsuario,
      consultarMallas
    ],finalizar)
  }
      }else{
        res.redirect("/")
      }
 }else{
       res.redirect("/")
    }
    //Shows The Index view a user with a Docente rol is logged in
  
 
    function consultarUsuario(done) {
      Usuario.findOne(req.session.me).exec(function docenteFounded(err, docenteFounded) {
        if (err) {
          mensaje.error= "Error al consultar docente"
          return res.json(mensaje.error)
        }
        if (!docenteFounded) {
          mensaje.error= "Docente  no encontrado"
          return res.json(mensaje.error)
        }
        docenteDB=docenteFounded
        done()
      })
      }
    function consultarMallas(done) {
      Malla.find({docente:req.session.me}).populate('nivel').populate('cursos').populate('logros')
      .exec(function mallasFounded(err, mallasFounded ){
 
        if (err) {
          mensaje.error= "Error al consultar docente"
          return res.json(mensaje.error)
        }
        for (var i = 0; i < mallasFounded.length; i++) {
          if(mallasFounded[i].docente == req.session.user.id){

          mallasDB.push(mallasFounded[i])
          
          }
        }
 
        done()
 
      })
    }
    function consultarPreguntas(done){

            preguntas_docente.find({docente:req.session.me}).exec(function(err , resp){
                respMalla.push(resp);
                done()
            });
    }

    function listarPreguntas(done){
   
      var preguntasTemporales = [];
      for (var i = 0; i < mallasDB.length; i++) {
       malla.push(i);
        if(mallasDB[i].logros){
          for (var e = 0; e < mallasDB[i].logros.length; e++) {
           for (var j = 0; j < respMalla[0].length; j++) {;
             if(mallasDB[i].logros[e].id == respMalla[0][j].logro ){
                preguntasTemporales.push({tipo : mallasDB[i].logros[e].estrategia_ensenianza , resp : respMalla[0][j]  });
                malla[i] = preguntasTemporales;
              }
            }
          }
        }
        
        preguntasTemporales = [];
     }
          


      done();
    }


    function listasEnsenanzas(done){
      var cont = 0;
      var control = 0 ;
       var sumaTemp = 0 ;
      var logroTemporales = [];
       for (var i = 0; i < mallasDB.length; i++) {
           if(malla[i]){
            datosMalla.push(i);
            for (var e = 0; e < mallasDB[i].logros.length; e++) {
              for(k = control ; k < malla[i].length ; k++){
                if(cont != mallasDB[i].logros[e].cantidad_evaluacion){
                    if(mallasDB[i].logros[e].id = malla[i][k].resp.logro){

                        sumaTemp += parseFloat(malla[i][k].resp.respuesta) ;  
                    } 
                 cont++;
                 control++;
              }
              }
               sumaTemp = sumaTemp / mallasDB[i].logros[e].cantidad_evaluacion ;
               
                logroTemporales.push({malla:mallasDB[i].asignatura ,   tipo : mallasDB[i].logros[e].estrategia_ensenianza   ,  suma : sumaTemp  });
                sumaTemp = 0 ;
                cont = 0 ;
              }
                  datosMalla[i] = logroTemporales; 
                  logroTemporales = [];
            }  
       control = 0 ;
        }

         done();
       }

 function enlazarAprendizaje(done){
  var backapEstrategias = [{nombre:'Cognitivas', promedio:0 , cantidad:0 },{nombre:'Metacognitivas', promedio:0 , cantidad:0},
        {nombre:'Ludicas', promedio:0 , cantidad:0},{nombre:'Tecnologicas', promedio:0 , cantidad:0 },{nombre:'Socio-afectivas', promedio:0 , cantidad:0 }]
  for (var i = 0; i < mallasDB.length; i++) {
      if(datosMalla[i]){
         for (var e = 0; e < datosMalla[i].length; e++) {
              for (var j = 0 ; j < estrategiaPredefinida.length; j++) {
                if(estrategiaPredefinida[j].nombre == datosMalla[i][e].tipo ){
                    estrategiaPredefinida[j].promedio += datosMalla[i][e].suma;
estrategiaPredefinida[j].cantidad += 1 

                }
      }
      for (var j = 0 ; j < estrategiaPredefinida.length; j++) {
        if(estrategiaPredefinida[j].cantidad != 0 && estrategiaPredefinida[j].promedio != 0 ){
         estrategiaPredefinida[j].promedio = estrategiaPredefinida[j].promedio / estrategiaPredefinida[j].cantidad ;
        }
      }
    }
    
    datosMalla[i] = {malla :null , estrategias :estrategiaPredefinida}

  estrategiaPredefinida = backapEstrategias; 
  }
}

           done();
      }

      function crearJsonEstrategia(done){
          for (var i = 0; i < mallasDB.length; i++) {
               estrategiaMalla.push(i);
               if(datosMalla[i]){
               datosMalla[i].malla =  mallasDB[i].asignatura;
              estrategiaMalla[i] = datosMalla[i] 
                }             
             }
           console.log(estrategiaMalla);  
                   
        done();
      }
  
    function finalizar() {
        var logrosDB = []
      var preguntasEvaluacion = []
      Logro.find().populate('malla',{docente:req.session.user.id}).exec(function(err,result){
        logrosDB = result;
  
       preguntas.find({ tipo:'evaluacion' , estado:"true" }).exec(function(err,preguntas){
            if(preguntas){
              _.each(preguntas,function(preguntaRamdom){
               
               preguntasEvaluacion.push(preguntaRamdom);
             
             });
             for (let i = preguntasEvaluacion.length - 1; i > 0; i--) {
                   const j = Math.floor(Math.random() * (i + 1));
                    [preguntasEvaluacion[i], preguntasEvaluacion[j]] = [preguntasEvaluacion[j], preguntasEvaluacion[i]];
                }
            }

          if (err) {
              req.session.flash={
                
                    err:["problemas al responder la pregunta "]
                     }
          }



            res.view('docente/index', {
                  logros: logrosDB,
                  docente: docenteDB,
                  estrategiasConteo : estrategiaMalla,
                  mallas: mallasDB,
                  preguntas:preguntasEvaluacion,
                })

 });
 });
}

    },
  verDocentes: function (req , res){
    var cont = 0;
    var user = [];
    var i = 0 ;
      Coordinador_Docente.find({id_coordinador:req.param('id')}).exec(function(err,resp){
        if(resp[i]){ 
            res.view('administrador/docenteCoordinador',{
              docent:resp
            });
          }else{
          res.view('administrador/docenteCoordinador',{
            docent:resp
          });
          }
      });


        
    },
      verDocentesEliminar: function (req , res){
    Coordinador_Docente.destroy({id_profesor:req.param('id')}).exec(function(err , mallas){
          Comentario.destroy({docente:req.param('id')}).exec(function(err , malla){
                req.session.flash={
          success:["docente eliminado"]
        }
         res.redirect('/showadministrador?rolAdmin=1');

        });
      });
    },

   mallasDocente: function (req , res){
    var mallas = [];
    var cursosArray = [];
        Malla.find({docente:req.param('id')}).populate('cursos').exec(function(err , mallas){
               res.view('administrador/docenteMallas' , {
                mallas : mallas
               });
 
           
        })
       

    },

   mallasDocenteEliminar: function (req , res){
    var mallas = [];
        Malla.destroy(req.param('id')).exec(function(err , mallas){
          Logro.destroy({malla:req.param('id')}).exec(function(err , malla){
                req.session.flash={
          success:["malla eliminada"]
        }
            res.redirect('/showadministrador?rolAdmin=2');
        });
       });
    },

      mallasDocenteEditar: function (req , res){


  Malla.update(req.param('id') , {asignatura : req.param('nombre')}).exec(function(err , mallas){
            req.session.flash={
          success:["malla actualizada"]
        }
            res.redirect('/showadministrador?rolAdmin=2');
        })
       
    },

 


  edit: function (req, res, next) {
    //Shows The view to edit users
    Usuario.findOne(req.param('id'), function userFounded(err, user) {
      console.log(user.rol);
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
  }

};

/*
 */