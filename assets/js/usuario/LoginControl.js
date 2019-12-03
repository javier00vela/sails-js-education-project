$(function(){
EmptyInputLogin();
});




function EmptyInputLogin(event){
	$("#login").on("click",function(e){
		var correo = $("#correo").val();
		var nit = $("#nit").val() ;
			if(!correo || !nit){
				e.preventDefault();
				ErrorMensaje("Campos Vacios","verifica que los campos haya contenido");
	}
});
	

}