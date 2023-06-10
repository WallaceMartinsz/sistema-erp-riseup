var produtos = [];
var cadastrarBtn = document.getElementById("cadastrarBtn");
var salvarBtn = document.getElementById("salvarBtn");
salvarBtn.style = "display:none";

function cadastrarProduto() {
    var modal = document.getElementById("modalRegisterForm");
    var modalInstance = bootstrap.Modal.getInstance(modal);

    var produto = document.getElementById("produto").value;
    var quantidade = document.getElementById("quantidade").value;
    var preco = document.getElementById("preco").value;
    var codigo = document.getElementById("codigo").value;
    var informacao = document.getElementById("informacao").value;


    var novoProduto = {
        produto: produto,
        quantidade: quantidade,
        preco: preco,
        codigo: codigo,
        informacao: informacao
    };

    if(codigo == ""){
        alert('Não pode cadastrar sem código!');
    }else{
        produtos.push(novoProduto);
        modalInstance.hide();
    }
    
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("informacao").value = "";

    atualizarTabela();
   
}

function atualizarTabela() {
    var tabela = document.getElementById("tabela");
    var tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];

        var row = tbody.insertRow();

        var cellNumero = row.insertCell();
        var cellProduto = row.insertCell();
        var cellQuantidade = row.insertCell();
        var cellPreco = row.insertCell();
        var cellCodigo = row.insertCell();
        var cellEditar = row.insertCell();

        cellNumero.innerHTML = i + 1;
        cellProduto.innerHTML = produto.produto;
        cellQuantidade.innerHTML = produto.quantidade;
        cellPreco.innerHTML = produto.preco;
        cellCodigo.innerHTML = produto.codigo;

        var buttonEditar = document.createElement("button");
        buttonEditar.textContent = "Editar";
        buttonEditar.className = "btn btn-primary";
        buttonEditar.setAttribute("data-index", i);

        buttonEditar.addEventListener("click", function () {
            cadastrarBtn.style = "display:none";
            salvarBtn.style = "display:block";

            var buttonSalvar = document.createElement("button");
            buttonSalvar.textContent = "Salvar";
            buttonSalvar.className = "btn btn-primary";

            var index = parseInt(this.getAttribute("data-index"));
            var produto = produtos[index];

            document.getElementById("produto").value = produto.produto;
            document.getElementById("quantidade").value = produto.quantidade;
            document.getElementById("preco").value = produto.preco;
            document.getElementById("codigo").value = produto.codigo;
            document.getElementById("informacao").value = produto.informacao;

            var modal = document.getElementById("modalRegisterForm");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.show();


            salvarBtn.addEventListener("click", function () {
                produto.produto = document.getElementById("produto").value;
                produto.quantidade = document.getElementById("quantidade").value;
                produto.preco = document.getElementById("preco").value;
                produto.codigo = document.getElementById("codigo").value;
                produto.informacao = document.getElementById("informacao").value;

                atualizarTabela();
                modalInstance.hide();
            });
        });

        cellEditar.appendChild(buttonEditar);

        var buttonApagar = document.createElement("button");
        buttonApagar.textContent = "Apagar produtto";
        buttonApagar.className = "btn btn-danger";
        buttonApagar.setAttribute("data-index", i);

        buttonApagar.addEventListener("click", function () {
            var index = parseInt(this.getAttribute("data-index"));
            produtos.splice(index, 1);
            atualizarTabela();
        });

        cellEditar.appendChild(buttonApagar);
    }

}


cadastrarBtn.addEventListener("click", cadastrarProduto);



