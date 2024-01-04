var listaDeAlteracao = [];
var listaControlarEscritores = [];
var listaControlarLivros = [];
function abrirForm(form){
    if(form=='form_escritores'){
        const form1 = document.getElementById("form_escritores");
        form1.style.display = 'block';
        const form2 = document.getElementById("form_links_cadastrar");
        form2.style.display = 'none';

        const form3 = document.getElementById("cadastrar_livros");
        form3.style.display = 'none';
        const form4 = document.getElementById("cadastrar_escritores");
        form4.style.display = 'none';
    }
    if(form=='form_links_cadastrar'){
        const form1 = document.getElementById("form_links_cadastrar");
        form1.style.display = 'block';
        const form2 = document.getElementById("form_escritores");
        form2.style.display = 'none';
    }
    if(form=='link_escritor'){
        const form1 = document.getElementById("cadastrar_escritores");
        form1.style.display = 'block';
        const form2 = document.getElementById("cadastrar_livros");
        form2.style.display = 'none';
    }
    if(form=='link_livros'){
        const form1 = document.getElementById("cadastrar_livros");
        form1.style.display = 'block';
        const form2 = document.getElementById("cadastrar_escritores");
        form2.style.display = 'none';
    }
}
function mostrarLivrosNoFormPrincipal(){
    const itemsEscritores = JSON.parse(localStorage.getItem("ESCRITORES"));
    if(itemsEscritores!=null){
        var listaLivros = [];
        const ElementUL = document.getElementById("lista_principal");
        ElementUL.innerText = "";
        for (item of itemsEscritores){
            if(JSON.parse(localStorage.getItem(`${item}`))!=null){
                for (livro of JSON.parse(localStorage.getItem(`${item}`))){
                    listaLivros.push(livro);
                }
                const EscritorElement = document.createTextNode(`Livro: ${listaLivros[0]}----Autor: ${item}`);
                const ElementLista = document.createElement('li');
                const ElementA = document.createElement('a');
                const ElementUL = document.getElementById("lista_principal");

                ElementA.appendChild(EscritorElement);
                ElementLista.appendChild(ElementA);
                ElementUL.appendChild(ElementLista);
                listaLivros = [];
            }
        }
    }
}

function addEscritor(){
    const nomeEscritor = document.getElementById("escritor");
    if (nomeEscritor.value!=""){
        const Objeto = nomeEscritor.value;
        if (localStorage.getItem('ESCRITORES') != null){
            for (item of JSON.parse(localStorage.getItem("ESCRITORES"))){
                listaControlarEscritores.push(`${item}`);
            }
            localStorage.removeItem('ESCRITORES');
            listaControlarEscritores.unshift(Objeto);
            for (item of listaControlarEscritores){
                if (localStorage.getItem('ESCRITORES') === null) {
                    localStorage.setItem('ESCRITORES', JSON.stringify([item]));
                }else {
                        localStorage.setItem(
                        'ESCRITORES',
                        JSON.stringify([
                        ...JSON.parse(localStorage.getItem('ESCRITORES')),
                        item
                    ])
                    );
                }
            }
        }
        if (localStorage.getItem('ESCRITORES') === null) {
            localStorage.setItem('ESCRITORES', JSON.stringify([Objeto]));
        }
    }
    nomeEscritor.value = "";
    listaControlarEscritores = [];
    MostrarCadastros("lista_escritor");
}
function removerEscritor(Escritor){
    const itemsEscritores = JSON.parse(localStorage.getItem("ESCRITORES"));
    for (item of itemsEscritores){
        listaDeAlteracao.push(`${item}`);
    }
    localStorage.removeItem('ESCRITORES');
    listaDeAlteracao.splice(listaDeAlteracao.indexOf(Escritor), 1);
    for (item of listaDeAlteracao){
        if (localStorage.getItem('ESCRITORES') === null) {
            localStorage.setItem('ESCRITORES', JSON.stringify([item]));
        }else {
                localStorage.setItem(
                'ESCRITORES',
                JSON.stringify([
                ...JSON.parse(localStorage.getItem('ESCRITORES')),
                item
            ])
            );
        }
    }
    const ElementUL = document.getElementById("lista_escritores");
    ElementUL.innerText = "";
    listaDeAlteracao = [];
    MostrarCadastros("lista_escritor");
}
function editarEscritor(Escritor){
    const nomeEscritor = document.getElementById("escritor");
    if (nomeEscritor.value!=""){
        const itemsEscritores = JSON.parse(localStorage.getItem("ESCRITORES"));
        for (item of itemsEscritores){
            listaDeAlteracao.push(`${item}`);
        }
        localStorage.removeItem('ESCRITORES');
        listaDeAlteracao.splice(listaDeAlteracao.indexOf(Escritor), 1, nomeEscritor.value);
        for (item of listaDeAlteracao){
            if (localStorage.getItem('ESCRITORES') === null) {
                localStorage.setItem('ESCRITORES', JSON.stringify([item]));
            }else {
                    localStorage.setItem(
                    'ESCRITORES',
                    JSON.stringify([
                    ...JSON.parse(localStorage.getItem('ESCRITORES')),
                    item
                ])
                );
            }
        }
        const ElementUL = document.getElementById("lista_escritores");
        ElementUL.innerText = "";
        listaDeAlteracao = [];
        MostrarCadastros("lista_escritor");
    }
}

function addLivro(){
    const nomeEscritor = document.getElementById("comboboxEscritor");
    const nomeLivro = document.getElementById("livro");
    if (nomeLivro.value!=""){
        const Objeto = nomeLivro.value;
        if (localStorage.getItem(`${nomeEscritor.value}`) === null) {
            localStorage.setItem(`${nomeEscritor.value}`, JSON.stringify([Objeto]));
        }else{
            for (item of JSON.parse(localStorage.getItem(`${nomeEscritor.value}`))){
                listaControlarLivros.push(`${item}`);
            }
            localStorage.removeItem(`${nomeEscritor.value}`);
            listaControlarLivros.unshift(Objeto);
            for (item of listaControlarLivros){
                if (localStorage.getItem(`${nomeEscritor.value}`) === null) {
                    localStorage.setItem(`${nomeEscritor.value}`, JSON.stringify([item]));
                }else {
                        localStorage.setItem(
                        `${nomeEscritor.value}`,
                        JSON.stringify([
                        ...JSON.parse(localStorage.getItem(`${nomeEscritor.value}`)),
                        item
                    ])
                    );
                }
            }
        }
    }
    nomeLivro.value = "";
    listaControlarLivros = [];
    MostrarCadastros("lista_livro");
}
function removerLivro(Livro){
    const nomeEscritor = document.getElementById("comboboxEscritor");
    const itemsLivros = JSON.parse(localStorage.getItem(`${nomeEscritor.value}`));
    for (item of itemsLivros){
        listaDeAlteracao.push(`${item}`);
    }
    localStorage.removeItem(`${nomeEscritor.value}`);
    listaDeAlteracao.splice(listaDeAlteracao.indexOf(Livro), 1);
    for (item of listaDeAlteracao){
        if (localStorage.getItem(`${nomeEscritor.value}`) === null) {
            localStorage.setItem(`${nomeEscritor.value}`, JSON.stringify([item]));
        }else {
                localStorage.setItem(
                    `${nomeEscritor.value}`,
                JSON.stringify([
                ...JSON.parse(localStorage.getItem(`${nomeEscritor.value}`)),
                item
            ])
            );
        }
    }
    const ElementUL = document.getElementById("lista_livros");
    ElementUL.innerText = "";
    listaDeAlteracao = [];
    MostrarCadastros("lista_livro");
}
function editarLivro(Livro){
    const nomeEscritor = document.getElementById("comboboxEscritor");
    const nomeLivro = document.getElementById("livro");
    if(nomeLivro.value!=""){
        const itemsLivros = JSON.parse(localStorage.getItem(`${nomeEscritor.value}`));
        for (item of itemsLivros){
            listaDeAlteracao.push(`${item}`);
        }
        localStorage.removeItem(`${nomeEscritor.value}`);
        listaDeAlteracao.splice(listaDeAlteracao.indexOf(Livro), 1, nomeLivro.value);
        for (item of listaDeAlteracao){
            if (localStorage.getItem(`${nomeEscritor.value}`) === null) {
                localStorage.setItem(`${nomeEscritor.value}`, JSON.stringify([item]));
            }else {
                    localStorage.setItem(
                        `${nomeEscritor.value}`,
                    JSON.stringify([
                    ...JSON.parse(localStorage.getItem(`${nomeEscritor.value}`)),
                    item
                ])
                );
            }
        }
        const ElementUL = document.getElementById("lista_livros");
        ElementUL.innerText = "";
        listaDeAlteracao = [];
        MostrarCadastros("lista_livro");
    }
}

function PopularCombobox(){
    const itemsEscritores = JSON.parse(localStorage.getItem("ESCRITORES"));
    const elementSelection = document.getElementById("comboboxEscritor");
    elementSelection.innerText = "";
    for (item of itemsEscritores){
        const elementOption = document.createElement('option');
        const EscritorElement = document.createTextNode(item);
        elementOption.appendChild(EscritorElement);
        elementSelection.appendChild(elementOption);
    }
} 
function apagarListaComboBox(){
    const ElementUL = document.getElementById("lista_livros");
    ElementUL.innerText = "";
}

function MostrarCadastros(lista){
    if(lista == "lista_escritor"){
        const itemsEscritores = JSON.parse(localStorage.getItem("ESCRITORES"));
        const ElementUL = document.getElementById("lista_escritores");
        ElementUL.innerText = "";
        for(item of itemsEscritores){
            const EscritorElement = document.createTextNode(item);
            const ElementLista = document.createElement('li');
            const ElementA = document.createElement('a');
            const ElementUL = document.getElementById("lista_escritores");

            const ElementDelete = document.createElement('img');
            ElementDelete.style.width = '20px';
            ElementDelete.style.height = '20px';
            ElementDelete.src = "trash.png";
            const paraApagar = item;
            ElementDelete.onclick = function () { removerEscritor(paraApagar); }

            const ElementEdit = document.createElement('img');
            ElementEdit.style.width = '20px';
            ElementEdit.style.height = '20px';
            ElementEdit.src = "lapis.jpg";
            const paraEditar = item;
            ElementEdit.onclick = function () { editarEscritor(paraEditar); }

            ElementA.appendChild(EscritorElement);
            ElementA.appendChild(ElementDelete);
            ElementA.appendChild(ElementEdit);
            ElementLista.appendChild(ElementA);
            ElementUL.appendChild(ElementLista);
        }
    }
    if(lista == "lista_livro"){
        const nomeEscritor = document.getElementById("comboboxEscritor");
        const itemsLivros = JSON.parse(localStorage.getItem(`${nomeEscritor.value}`));
        const ElementUL = document.getElementById("lista_livros");
        ElementUL.innerText = "";
        if(localStorage.getItem(`${nomeEscritor.value}`) != null){
            for(item of itemsLivros){
                const EscritorElement = document.createTextNode(item);
                const ElementLista = document.createElement('li');
                const ElementA = document.createElement('a');
                const ElementUL = document.getElementById("lista_livros");

                const ElementDelete = document.createElement('img');
                ElementDelete.style.width = '20px';
                ElementDelete.style.height = '20px';
                ElementDelete.src = "trash.png";
                const paraApagarLivro = item;
                ElementDelete.onclick = function () { removerLivro(paraApagarLivro); }

                const ElementEdit = document.createElement('img');
                ElementEdit.style.width = '20px';
                ElementEdit.style.height = '20px';
                ElementEdit.src = "lapis.jpg";
                const paraEditarLivro = item;
                ElementEdit.onclick = function () { editarLivro(paraEditarLivro); }

                ElementA.appendChild(EscritorElement);
                ElementA.appendChild(ElementDelete);
                ElementA.appendChild(ElementEdit);
                ElementLista.appendChild(ElementA);
                ElementUL.appendChild(ElementLista);
            }
        }

    }
} 
window.onload = mostrarLivrosNoFormPrincipal();
