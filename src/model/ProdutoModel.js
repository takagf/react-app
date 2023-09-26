export default class ProdutoModel {
    constructor(obj){
        obj = obj || {};
        
        this.id = obj.id;
        this.nome = obj.nome;
        this.valor = obj.valor;
        this.quantidadeEstoque = obj.quantidadeEstoque;
    }
}