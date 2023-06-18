import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";


export const ListaCompras = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompra = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                setData(response.data.compras);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API!'
                })
            })
    }

    useEffect(() => {
        getCompra();
    }, []);

    const apagarCompra = async (idCard, idPromo) => {
        //console.log(idCard+"/"+idPromo);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/excluircompra/" + idCard + "/" + idPromo,
            { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Compra removida com sucesso!'
                })
                getCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
                
            });
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Compras</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to='/inserircompra' className='btn btn-outline-primary btn-sm'>Cadastrar Compra</Link>
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
                            <th>Cartão ID</th>
                            <th>Promoção ID</th>
                            <th>Data da compra</th>
                            <th>Quantidade</th>
                            <th>Valor R$</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comp => (
                            <tr key={comp.CartaoId + '_' + comp.PromocaoId}>
                                <td>{comp.CartaoId}</td>
                                <td>{comp.PromocaoId}</td>
                                <td>{comp.data}</td>
                                <td>{comp.quantidade}</td>
                                <td>{comp.valor}</td>
                                <td>
                                    <Link to={"/atualizacompra/" + comp.CartaoId + "/" + comp.PromocaoId}
                                        className="btn btn-warning btn-sm"
                                        style={{ marginRight: '10px' }}>Editar</Link>
                                    <span className="btn btn-danger btn-sm"
                                        onClick={() => apagarCompra(comp.CartaoId, comp.PromocaoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}