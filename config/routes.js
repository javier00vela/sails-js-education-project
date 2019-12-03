/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
   /*Public views */
  'get /':'UsuarioController.validarSession',

  'get /login':'UsuarioController.mostrarLogin',
  'post /login': 'UsuarioController.login',
  'get /logout': 'UsuarioController.logout',
  /*Administrador routes */
   'get /showadministrador':'AdministradorController.index',
   
   'get /gestor':'FormsController.gestor',
   
   'get /newUsuario':'FormsController.newUsuario',

   'get /docentesCoordinador':'DocenteController.verDocentes',

   'get /docentesCoordinadorEliminar':'DocenteController.verDocentesEliminar',

    'get /mallasDocente':'DocenteController.mallasDocente',

    'get /mallasDocenteEditar':'DocenteController.mallasDocenteEditar',

    'get /mallasDocenteEliminar':'DocenteController.mallasDocenteEliminar',
   
   
   'post /savePregunta': 'PreguntasController.guardar',
   
   'post /saveEvaluacion': 'PreguntasController.guardarEvaluacion',

   'get /seguimientoDocentes': 'AdministradorController.seguimientoDocentes',
   'get /vermotivos':'AdministradorController.verMotivos',
   'get /vermotivosLogro': 'AdministradorController.verMotivosLogro',
   'get /seguimientoLogros': 'AdministradorController.seguimientoLogros',
  'get /AdministrarPreguntas': 'AdministradorController.AdministrarPreguntas',
  'get /verModificacionesDocente': 'AdministradorController.verModificaciones',

  'post /createPermiso': 'PermisoController.create',
  'get /eliminarPregunta': 'PreguntasController.eliminar',
    'get /actualizarPregunta': 'PreguntasController.actualizar',
      'post /createPregunta': 'PreguntasController.create',
      'post /addSession':'LogroController.añadirSesion',
  'post /createRol': 'RolController.create',
  'post /createCurso': 'CursoController.create',
  'post /createnivel': 'NivelController.create',
  'post /createusuario': 'UsuarioController.create',
  'post /malla/new': 'MallaController.new',
  'post /administrador/agregardocentes': 'AdministradorController.agregardocentes',
  'get /consultarPreguntas': 'AdministradorController.consultarPreguntas',

  /*Docente routes */
  'get /showdocente':'DocenteController.index',
  'get /docente/edit' : 'DocenteController.edit',
  'post /createlogro': 'LogroController.create',
   'get /eliminar': 'LogroController.eliminar',
  'get /docente/logroysesiones' : 'LogroController.ver',
'post /editar/sesion' : 'LogroController.update',
'get /editar': 'LogroController.editar',
'get /Observacion': 'LogroController.Observacion',
'get /Evaluacion': 'LogroController.Evaluacion',

  
  'get /guardarCheck' : 'LogroController.guardarCheck',

  /*Coordinador routes */
  'get /coordinador/edit' : 'CoordinadorController.edit',
  'get /showcoordinador':'CoordinadorController.index',
  'get /administrador/edit': 'AdministradorController.edit',
  'get /createcomment': 'CoordinadorController.CreateComment',
  'get /Comment':'CoordinadorController.agregarComentarios',
  'get /administrador/vincular': 'AdministradorController.vincular'



  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};
