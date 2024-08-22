
/*control de datos vacios*/


function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById('ingresar').addEventListener('click', function () {
    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();
    if(!usuario || !password){
    showAlertError();
    }
});