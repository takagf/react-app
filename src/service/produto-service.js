import service from "./service"
function obter(){
    return new Promise((resolve, reject) => {
        service.get('/produtos')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}
function adicionar(produto){

    return new Promise((resolve, reject) => {
        service.post('/produtos', produto)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function atualizar(produto){
    return new Promise((resolve, reject) => {
        service.put(`/produtos/${produto.id}`, produto)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluir(produto){
    return new Promise((resolve, reject) => {
        service.delete(`/produtos/${produto.id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    obter,
    adicionar,
    atualizar,
    excluir
}