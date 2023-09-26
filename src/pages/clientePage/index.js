
import './index.css';
import clienteService from "../../service/cliente-service"
import Swal from 'sweetalert2'
// HOOKs
import { useEffect, useState } from 'react';
import ClienteModel from '../../model/ClienteModel';
import image from '../clientePage/image.png'

function ClientePage() {

  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [cliente, setCliente] = useState(new ClienteModel());

  useEffect(() => {

    clienteService.obterC()
      .then(response => {
        setClientes(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoEdicao(true);
    let clienteEncontrado = clientes.find(c => c.id == e.target.id);

    setCliente(clienteEncontrado);
  }

  const excluir = (e) => {

    let clienteEncontrado = clientes.find(c => c.id == e.target.id);

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Deseja realmente excluir o cliente " + clienteEncontrado.nome + '?')){
      excluirClienteBackEnd(clienteEncontrado.id);
    }
  }

  const adicionar = () => {
    setModoEdicao(false);
  };

  const atualizarClienteNaTabela = (clienteAtualizado, removerCliente = false) =>{
    let indice = clientes.findIndex((cliente) => cliente.id === clienteAtualizado.id);

    (removerCliente) 
        ? clientes.splice(indice, 1)
        : clientes.splice(indice, 1, cliente);

    setClientes(arr => [...arr]);
  }

  const salvar = () => {

    if (!cliente.nome || !cliente.cpfOuCnpj || !cliente.email) {
      Swal.fire({
        icon: 'error',
        text: 'Campos obrigatórios.'
      });
      return;
    }

    (modoEdicao) ? atualizarClienteBackend(cliente) : adicionarClienteBackend(cliente);
  };

  const adicionarClienteBackend = (cliente) => {
    clienteService.adicionarC(cliente)
      .then(response => {

        setClientes(lista => [...lista, new ClienteModel(response.data)]);

        limparCliente();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente cadastrado com sucesso!',
          showConfirmButton: true
        });

      })
      .catch(erro => {

      })
  }

  const atualizarClienteBackend = (cliente) => {
    clienteService.atualizarC(cliente)
    .then(response => {

      atualizarClienteNaTabela(response.data);

      limparCliente();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente atualizado com sucesso!',
        showConfirmButton: true
      });

    })
    .catch(erro => {

    })
  }

  const excluirClienteBackEnd = (id) => {
    clienteService.excluirC(id)
    .then(() => {
      let clienteEncontrado = clientes.find(c => c.id == id);

      atualizarClienteNaTabela(clienteEncontrado, true);
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente excluido com sucesso!',
        showConfirmButton: true
      });

    })
    .catch();
  }

  const limparCliente = () => {
    setCliente({
      ...cliente,
      id: '',
      nome: '',
      cpfOuCnpj: '',
      telefone: '',
      dataCadastro: '',
      email: ''
    });
  }
  return(
        
    <><section className="py-5">
        <div className="container px-4 px-lg-5 mt-0">
            <button className="btn btn-outline-dark material-symbols-outlined " data-bs-toggle="modal" data-bs-target="#modal-cliente" id="btn-adicionar" onClick={adicionar} >
                <span className="material-symbols-outlined">
                    library_add
                </span>
            </button>
            <p></p>
            <hr />
            <div id="card" className="row gx-4 gx-lg-4 row-cols-3 row-cols-md-3 row-cols-xl-3 justify-content-center">

            

              {clientes.map(cliente =>(
                <div className="col-mb-5">
                    <div>
                        <div className="card h-100">
                            <img className="card-img-top" src={image} alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5>{cliente.id} - {cliente.nome}</h5>
                                    <h5>CPF: {cliente.cpfOuCnpj}</h5>
                                    <h5>Telefone: {cliente.telefone}</h5>
                                    <h5>E-mail: {cliente.email}</h5>
                                    <button

                                      id={cliente.id}
                                      onClick={editar}
                                      class="btn btn-outline-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-cliente">
                                        <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                    </button>
                                    <button
                                      id={cliente.id}
                                      onClick={excluir} 
                                      class="btn btn-outline-primary">
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
    </section>
    <div>
            <div className="modal fade" id="modal-cliente">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{modoEdicao ? "Editar cliente" :"Adicionar cliente"}
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">

                        <div className="row">
                          <div className="col-sm-2">
                            <label for="id" className="form-label">Id</label>
                            <input
                              disabled
                              type="text"
                              className="form-control"
                              id="id"
                              value = {cliente.id}
                              // Aqui estamos alterando so a propriedade ID.
                              onChange={(e) => setCliente({ ...cliente, id: e.target.value })}
                            />
                          </div>

                          <div className="col-sm-10">
                            <label for="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome"
                              value={cliente.nome}
                              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-4">
                            <label for="email" className="form-label">E-mail</label>
                            <input type="text" className="form-control" id="email"
                              value={cliente.email}
                              onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
                          </div>
                          <div className="col-sm-4">
                            <label for="telefone" className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="telefone"
                              value={cliente.telefone}
                              onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })} />
                          </div>
                          <div className="col-sm-4">
                            <label for="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf"
                              value={cliente.cpfOuCnpj}
                              onChange={(e) => setCliente({ ...cliente, cpfOuCnpj: e.target.value })} />
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

export default ClientePage;