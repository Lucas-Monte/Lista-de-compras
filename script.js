let listaDeItens = [];
let itemAEditar

const form = document.getElementById('form-items');
const itensInput = document.getElementById('receive-item');
const ulItens = document.getElementById('lista-de-itens');
const ulItensAdicionadosCarrinho = document.getElementById('itens-adicionados-carrinho');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizarLocalStorage(){
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}

if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem();
} else{
    listaDeItens = [];
}


form.addEventListener ('submit', function (evento) {
    evento.preventDefault(); //preventDefault evita que algo aconteça
    salvarItem();
    mostrarItem();
    itensInput.focus();
})

function salvarItem() {
    let adicionarItem = itensInput.value.trim().toUpperCase();
    let checarDuplicado = listaDeItens.some((elemento) => elemento.valor === adicionarItem)

    if(checarDuplicado) {
        alert("Esse item já foi adicionado");
    } else if (adicionarItem == "") {
        alert("Adicione um item")
    }else {
        listaDeItens.push({
            valor: adicionarItem,
            checar: false
    })
    }
    //if(listaDeItens.includes(adicionarItem)){
       // alert('Esse item ja foi adicionado');
        //limparCampo();
        //return;
    //} 
    //if(adicionarItem == ''){
        //alert('Adicione um item');
        //return;
    //}
    //listaDeItens.push(adicionarItem);
    console.log (listaDeItens);
    itensInput.value = '';
}


function mostrarItem(){
    ulItens.innerHTML = '';
    ulItensAdicionadosCarrinho.innerHTML = '';
    //elemente: objeto e index: indice (para localizar onde esta o objeto)
    listaDeItens.forEach((elemento,index) => {
        if (elemento.checar) {
            ulItensAdicionadosCarrinho.innerHTML += `
        <li class="item-compra" data-value="${index}">
            <div class="lista-de-itens-compra">
                <input type="checkbox" checked class="is-clickable" />
                <span type="text" class="itens-adicionados-carrinho is-size-5">${elemento.valor}</span>
            </div>
            <div class="lixeira">
                <i class="fa-solid fa-trash deletar"></i>
            </div>
        </li>
        `
        } else {
        ulItens.innerHTML += `
        <li class="item-compra" data-value="${index}">
            <div class="lista-de-itens-compra">
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disable' : ''}></input>
            </div>
            <div class="lixeira">
                ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-solid fa-floppy-disk salvar"></i></button>'
                : '<i class="fa-solid fa-pen editar"></i>'}
                <i class="fa-solid fa-trash deletar"></i>
            </div>
        </li>
        `
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem();
        })
    }))

    const deletarObjetos = document.querySelectorAll(".deletar");

    deletarObjetos.forEach((i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento,1)
            mostrarItem();
        })
    }))

    const editarItem = document.querySelectorAll(".editar")
    console.log(editarItem)

    editarItem.forEach((i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem();
        })
    }))

    atualizarLocalStorage();
}



function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    //console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value;
    console.log(listaDeItens)
    itemAEditar = -1;
    mostrarItem();
}