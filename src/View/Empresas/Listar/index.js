import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";


export const ListaEmpresas = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getEmpresas = async () => {
        await axios.get(api + "/listaempresas")
            .then((response) => {
                setData(response.data.empresas);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API!'
                })
            })
    }

    const apagarEmpresa = async (idEmpresa) => {
        
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/exlcuirempresa/" + idEmpresa,
            { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Empresa removida com sucesso!'
                })
                getEmpresas();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getEmpresas();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Empresas</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to='/inserirempresa' className='btn btn-outline-primary btn-sm'>Cadastrar Empresa</Link>
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
                            <th>Data adesão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.nome}</td>
                                <td>{emp.dataAdesao}</td>
                                <td>
                                    <Link to={"/atualizaempresa/" + emp.id}
                                        className="btn btn-warning btn-sm"
                                        style={{ marginRight: '10px' }}>Editar</Link>
                                    <span className="btn btn-danger btn-sm"
                                        onClick={() => apagarEmpresa(emp.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}