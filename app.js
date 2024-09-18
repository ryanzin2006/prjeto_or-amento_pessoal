class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validar_dados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor(){

        let id = localStorage.getItem("id")
        if(id === null){
            localStorage.setItem("id", 0)
        }
    }

    get_proximo_id(){
        let proximo_id = localStorage.getItem("id")
        return parseInt(proximo_id)+1
    }
    gravar(d){
        let id = this.get_proximo_id()
        localStorage.setItem("despesa "+id, JSON.stringify(d))
        localStorage.setItem("id", id)
    }
    recuperar_todos_registros(){
        let despesas = Array()

        let id = localStorage.getItem("id")

        for(let i = 1; i<= id; i++){
            let despesa = JSON.parse(localStorage.getItem("despesa "+i))

            if(despesa === null){
                continue
            }

            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesa){
        let despesas_filtradas = Array()
        despesas_filtradas = this.recuperar_todos_registros()
        console.log(despesa)
        console.log(despesas_filtradas)
        if(despesa.ano != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ""){
            despesas_filtradas = despesas_filtradas.filter(d => d.valor == despesa.valor)
        }
       return despesas_filtradas
    }
}

let bd = new Bd()



function cadastrardespesa() {
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    if(despesa.validar_dados()){
        bd.gravar(despesa)
        $("#sucesso_gravacao").modal("show")
    }else{
        $("#erro_gravacao").modal("show")
    }
}

function carrega_lista_despesas(){
    let despesas = Array()
    despesas = bd.recuperar_todos_registros()
    let listaDespesas = document.getElementById("lista_despesas")

    despesas.forEach(function(d) {
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = d.dia + "/" + d.mes + "/" + d.ano
       
        switch(d.tipo){
            case "1": d.tipo = "alimentação"
                break
            case "2": d.tipo = "educação"
                break  
            case "3": d.tipo = "lazer"
                break  
            case "4": d.tipo = "saúde"
                break    
            case "5": d.tipo = "transporte"
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function zerar_valor_campos(){
    ano = document.getElementById("ano").value = ""
            mes = document.getElementById("mes").value = ""
            dia = document.getElementById("dia").value = ""
            tipo = document.getElementById("tipo").value = ""
            descricao = document.getElementById("descricao").value = ""
            valor = document.getElementById("valor").value = ""
}

function pesquisar_despesa(){
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById("lista_despesas")
    listaDespesas.innerHTML = ""

    despesas.forEach(function(d) {
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = d.dia + "/" + d.mes + "/" + d.ano
       
        switch(d.tipo){
            case "1": d.tipo = "alimentação"
                break
            case "2": d.tipo = "educação"
                break  
            case "3": d.tipo = "lazer"
                break  
            case "4": d.tipo = "saúde"
                break    
            case "5": d.tipo = "transporte"
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}
