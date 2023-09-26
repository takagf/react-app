import service from "./service"
function obterC(){
    return new Promise((resolve, reject) => {
        service.get('/clientes')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}
function adicionarC(cliente){

    return new Promise((resolve, reject) => {
        service.post('/clientes', cliente)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}


function atualizarC(cliente){
    return new Promise((resolve, reject) => {
        service.put(`/clientes/${cliente.id}`, cliente)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluirC(id){
    return new Promise((resolve, reject) => {
        service.delete(`/clientes/${id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

export default {
    obterC,
    adicionarC,
    atualizarC,
    excluirC
}