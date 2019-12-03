
function alertBien(message){
swal({type: 'success', title: 'MUY BIEN !',text: message});
}

function alertError(message){
swal({type: 'error', title: 'Error',text: message});
}

function alertConfirm(message , path){
swal({
  title: 'Confirmacion  !!!',
  text: message,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'realizar'
}).then((result) => {

    window.location = path
})
}

