import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";


export const ListaCartoes = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCartoes = async () => {
        await axios.get(api + "/listacartoes")
            .then((response) => {
                setData(response.data.cartoes);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API!'
                })
            })
    }

    useEffect(() => {
        getCartoes();
    }, []);

    const apagarCartao = async (idCard) => {
        
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/exlcuircartao/" + idCard,
            { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Cartão removido com sucesso!'
                })
                getCartoes();
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
                        <h1>Lista de Cartões</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to='/inserircartao' className='btn btn-outline-primary btn-sm'>Cadastrar Cartão</Link>
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
                            <th>Cliente ID</th>
                            <th>Data da Emissão</th>
                            <th>Validade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.ClienteId}</td>
                                <td>{card.dataCartao}</td>
                                <td>{card.validade}</td>
                                <td>
                                    <Link to={"/atualizacartao/" + card.id}
                                        className="btn btn-warning btn-sm"
                                        style={{ marginRight: '10px' }}>Editar</Link>
                                    <span className="btn btn-danger btn-sm"
                                        onClick={() => apagarCartao(card.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}