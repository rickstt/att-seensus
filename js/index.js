const btnlogin = document.getElementById("btnLogin");
const txtemail = document.getElementById("txtEmail");
const txtsenha = document.getElementById("txtSenha");
let autenticado;
let token;
let key;

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

function carregarDados() {
    key = window.location.search.substring(5, window.location.search.length);

    const estrutura = document.getElementById("estrutura");

    fetch("http://127.0.0.1:5062/store/list", {
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
            <a href="" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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
            <a href="" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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

function carregarLojas() {


    const estrutura2 = document.getElementById("dadosLojas");
    map((item, index) => {
        let divList = document.createElement("div");
        divList.style.height = "150px";
        divList.setAttribute("class", "card m-3");
        divList.innerHTML = `
        <a href="" class="nav-link">
            <div class="row">
                <div class="col-md-4">
                    <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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
        estrutura2.appendChild(divList);
    })
}

