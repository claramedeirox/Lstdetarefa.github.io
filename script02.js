function logar(){

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == "Clara00" && senha == "123456"){
        alert('Sucesso');
        location.href = "lista.html";
    }else{
        alert('Usuario ou senha incorretos');
    }

}