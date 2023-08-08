const btnlogin = document.getElementById("btnLogin");
const txtemail = document.getElementById("txtEmail");
const txtsenha = document.getElementById("txtSenha");
const txtbuscar = document.getElementById("txtbuscar");
const btnbuscar = document.getElementById("btnbuscar");
let autenticado;
let token;
let key = "";


function carregarDados() {
    key = window.location.search.substring(5, window.location.search.length);
    const estrutura = document.getElementById("estrutura");
    
    let url1 = "http://127.0.0.1:5062/store/list";
    let url2 = `http://127.0.0.1:5062/store/listbyname/${key}`;
    let url="";
    if(key=="" || key==null || !key){
        url = url1;
    }
    else{
        url = url2;
    }
        
        estrutura.innerHTML="";

        fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            }
        }).then((response) => response.json()).then((result) => {
            result.data.map((item, index) => {
                
                let divList = document.createElement("div");
                divList.style.height = "150px";
                divList.setAttribute("class", "card m-3");
                divList.innerHTML = `
                <a href="lojas.html?pag=${item.idloja}" class="nav-link">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${item.foto}" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.nome}</h5>
                                <p class="card-text">${item.descricao}</p>
                            </div>
                        </div>
                    </div>
                </a>
                `;
                estrutura.appendChild(divList);
            })
        }).catch((error) => console.log(`Erro ao executar API -> ${error}`));

};

btnbuscar.onclick = () =>{
    window.location.replace(`listar.html?pag=${txtbuscar.value}`);
}


function carregarCategoria() {
    key = window.location.search.substring(5, window.location.search.length);

    const estrutura = document.getElementById("estrutura");

    fetch("http://127.0.0.1:5062/store/listbycategory/"+key, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        }
    }).then((response) => response.json()).then((result) => {
        result.data.map((item, index) => {
            let divList = document.createElement("div");
            divList.style.height = "150px";
            divList.setAttribute("class", "card m-3");
            divList.innerHTML = `
            <a href="lojas.html?pag=${item.idloja}" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${item.foto}" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nome}</h5>
                            <p class="card-text">${item.descricao}</p>
                        </div>
                    </div>
                </div>
            </a>
            `;
            estrutura.appendChild(divList);
        })
    }).catch((error) => console.log(`Erro ao executar API -> ${error}`));
};


function infoLojas() {
    key = window.location.search.substring(5, window.location.search.length);
    const estruturaLojas = document.getElementById("dadosLojas");
    
    fetch("http://127.0.0.1:5062/store/listbyid/"+key, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        }
    }).then((response) => response.json()).then((result) => {
        result.data.map((item, index) => {
            let divList = document.createElement("div");
            divList.style.height = "300px";
            divList.setAttribute("class", "card m-3");
            divList.innerHTML = `
            <div class="row p-2">
                <div class="col">
                    <img src="${item.foto}" class="img-fluid rounded" style="height: 200px;width:400px;object-fit:contain" alt="...">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${item.nome}</h5>
                        <p class="card-text">${item.descricao}</p>
                        <p class="card-text">${item.telefone}</p>
                        <p class="card-text">${item.categoria}</p>
                        <p class="card-text">${item.cnpj}</p>
                        <p class="card-text">${item.logradouro}</p>
                        <p class="card-text">${item.cep}</p>
                    </div>
                </div>
            </div>
            `;
            estruturaLojas.appendChild(divList);
        })
    }).catch((error) => console.log(`Erro ao executar API -> ${error}`));
}

// Função para login de usuarios
btnLogin.onclick = () => {
    //validação dos campos usuário e senha
    if (txtemail.value.trim() == "" || txtsenha.value.trim() == "") {
        return alert(`Todos os campos devem ser preenchidos`);
    }
    else {
        //vamos usar o comando fecth para fazer uma requisição à nossa API e realizar o login.
        //Iremos passar o nome de usuário e a senha
        fetch("http://127.0.1:5062/store/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: txtemail.value,
                senha: txtsenha.value
            })
        }).then((response) => response.json()).then((dado) => {
            if (dado.output == "Authenticated") {
                let autenticado = true;
                token = dado.token;
                txtemail.value = "";
                txtsenha.value = "";
                //Alterar a tela
                window.location.replace(`area-exclusiva.html?key+${token}`);
            }
            else {
                txtemail.value = "";
                txtsenha.value = "";
                return alert("Usuário ou senha incorretos");
            }
        }).catch((error) => {
            console.error(`Não foi possível requisitar a APÍ -> ${error}`);
        })
    }
}
// Fim do login dos usuarios