import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";


export const ListaClientes = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                setData(response.data.clientes);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API!'
                })
            })
    }

    const apagarCliente = async (idCliente) => {
        //console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/exlcuircliente/" + idCliente,
            { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Cliente removido com sucesso!'
                })
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to='/inserircliente' className='btn btn-outline-primary btn-sm'>Cadastrar Cliente</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}
                    </Alert> : ""}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}
                    </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Data Nascimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <td>{cli.id}</td>
                                <td>{cli.nome}</td>
                                <td>{cli.cidade}</td>
                                <td>{cli.uf}</td>
                                <td>{cli.nascimento}</td>
                                <td>
                                    <Link to={"/atualizacliente/" + cli.id}
                                        className="btn btn-warning btn-sm"
                                        style={{ marginRight: '10px' }}>Editar</Link>
                                    <span className="btn btn-danger btn-sm"
                                        onClick={() => apagarCliente(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}