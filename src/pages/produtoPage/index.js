
import "./index.css"
import produtoService from "../../service/produto-service.js";
import Swal from 'sweetalert2'
import image from "./image.png";
import { useEffect, useState } from "react";
import ProdutoModel from "../../model/ProdutoModel";


function ProdutoPage() {

    const [produtos, setProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produto, setProduto] = useState(new ProdutoModel());
  
    useEffect(() => {
  
      produtoService.obter()
        .then(response => {
          setProdutos(response.data);
        })
        .catch(erro => {
          console.log(erro);
        });
  
    }, []);
  
    const editar = (e) => {
      setModoEdicao(true);
      let produtoEncontrado = produtos.find(c => c.id == e.target.id);
  
      setProduto(produtoEncontrado);
    }
  
    const excluir = (e) => {
  
      let produtoEncontrado = produtos.find(c => c.id == e.target.id);
  
      // eslint-disable-next-line no-restricted-globals
      if(confirm("Deseja realmente excluir o produto " + produtoEncontrado.nome + "?")){
        excluirProdutoBE(produtoEncontrado.id); 
      }
    }
  
    const adicionar = () => {
      setModoEdicao(false);
    };
  
    const atualizarProduto = (produtoAtualizado, removerProduto = false) =>{
      let indice = produtos.findIndex((produto) => produto.id === produtoAtualizado.id);
  
      if(removerProduto){
        produtos.splice(indice, 1)
      }else{
        produtos.splice(indice, 1, produto);
      };
  
      setProdutos(arr => [...arr]);
    }
  
    const salvar = () => {
  
      if (!produto.nome || !produto.valor || !produto.quantidadeEstoque) {
        Swal.fire({
          icon: 'error',
          text: 'Campos obrigatórios.'
        });
        return;
      }
  
      (modoEdicao) ? atualizarProdutoBE(produto) : adicionarProdutoBE(produto);

    };
  
    const adicionarProdutoBE = (produto) => {
      produtoService.adicionar(produto)
        .then(response => {
  
          setProdutos(lista => [...lista, new ProdutoModel(response.data)]);
  
          limparProduto ();
  
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Produto adicionado com sucesso!',
            showConfirmButton: true
          });
  
        })
        .catch(erro => {
  
        })
    }
  
    const atualizarProdutoBE = (produto) => {
      produtoService.atualizar(produto)
      .then(response => {
  
        atualizarProduto(response.data);
  
        limparProduto();
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto atualizado com sucesso!',
          showConfirmButton: true
        });
  
      })
      .catch(erro => {
  
      })
    }
  
    const excluirProdutoBE = (id) => {
      produtoService.excluir(id)
      .then(() => {
        let produtoEncontrado = produtos.find(c => c.id === id);
  
        atualizarProduto(produtoEncontrado, true);
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto excluido com sucesso!',
          showConfirmButton: true
        });
  
      })
      .catch();
    }
  
    const limparProduto = () => {
      setProduto({
        ...produto,
        id: '',
        nome: '',
        valor: '',
        quantidadeEstoque: ''
      });
    }

    return(
        
        <><section className="py-5">
            <div className="container px-4 px-lg-5 mt-0">
                <button className="btn btn-outline-dark px-lg-2 material-symbols-outlined " data-bs-toggle="modal" data-bs-target="#modal-produto" id="btn-adicionar" onClick={adicionar} >
                    <span className="material-symbols-outlined">
                        library_add
                    </span>
                </button>
                <p></p>
                <hr />
                <div id="card" className="row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                

                {produtos.map(produto =>(
                    <div className="col-mb-5">
                        <div>
                            <div className="card h-100">
                                <img className="card-img-top" src={image} alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5>{produto.nome}</h5>
                                        <h5>R$${produto.valor}</h5>
                                        <h5>Estoque:{produto.quantidadeEstoque}</h5>
                                        <button id={produto.id} onClick={editar} className="btn btn-outline-dark col-sm-1" data-bs-toggle="modal" data-bs-target="#modal-produto">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>
                                        <button id={produto.id} onClick={excluir} className="btn btn-outline-dark col-sm-1">
                                            <span className="material-symbols-outlined">
                                            delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


                </div>
            </div>
        </section><div>
                <div className="modal fade" id="modal-produto">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">{modoEdicao ? "Editar produto" :"Adicionar produto"}
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-4">
                                        <label htmlFor="id" className="form-label">Id</label>
                                        <input 
                                            disabled 
                                            type="text" 
                                            className="form-control" 
                                            id="id" 
                                            value={produto.id} 
                                            onChange={(e) => setProduto({...produto, id: e.target.value})}/>
                                    </div>

                                    <div className="col-sm-8">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="nome" 
                                            value={produto.nome} 
                                            onChange={(e) => setProduto({...produto, nome: e.target.value})} />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="valor" className="form-label">Valor</label>
                                        <input type="text" className="form-control" id="valor" value={produto.valor} onChange={(e) => setProduto({...produto, valor: e.target.value})}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="estoque" className="form-label">Estoque</label>
                                        <input type="text" className="form-control" id="quantidadeEstoque" value={produto.quantidadeEstoque} onChange={(e) => setProduto({...produto, quantidadeEstoque: e.target.value})}/>
                                    </div>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar} >Salvar</button>
                                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div><footer id="fotter" className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Site criado por &copy; Guilherme Falcão</p></div>
                <div className="container"><p className="m-0 text-center text-white">People illustrations by Storyset</p></div>
            </footer></>
    )
}

export default ProdutoPage;