import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";


export const ListaPromocoes = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPromocao = async () => {
        await axios.get(api + "/listapromocoes")
            .then((response) => {
                setData(response.data.promocoes);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API!'
                })
            })
    }

    const apagarPromocao = async (idPromo) => {
        
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/exlcuirempresa/" + idPromo,
            { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Empresa removida com sucesso!'
                })
                getPromocao();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getPromocao();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Promoções</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to='/inserirpromocao' className='btn btn-outline-primary btn-sm'>Cadastrar Promoção</Link>
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
                            <th>Promoção ID</th>
                            <th>Empresa ID</th>
                            <th>Nome da promoção</th>
                            <th>Descrição</th>
                            <th>Validade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promo => (
                            <tr key={promo.id}>
                                <td>{promo.id}</td>
                                <td>{promo.EmpresaId}</td>
                                <td>{promo.nome}</td>
                                <td>{promo.descricao}</td>
                                <td>{promo.validade}</td>
                                <td>
                                    <Link to={"/atualizapromocao/" + promo.id}
                                        className="btn btn-warning btn-sm"
                                        style={{ marginRight: '10px' }}>Editar</Link>
                                    <span className="btn btn-danger btn-sm"
                                        onClick={() => apagarPromocao(promo.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}