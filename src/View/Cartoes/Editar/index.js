import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCartao = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [ClienteId, setClienteId] = useState('');
    const [dataCartao, setDataCartao] = useState('');
    const [validade, setValidade] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizacartao/" + id,
            { id, ClienteId, dataCartao, validade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cartão alterado com sucesso'
                })
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar a API.'
                });
            });
    }

    const limparInputs = () => {
        setClienteId('');
        setDataCartao('');
        setValidade('');
    }

    useEffect(() => {
        const getCartao = async () => {
            await axios.get(api + "/cartao/" + id)
                .then((response) => {
                    setClienteId(response.data.cartao.ClienteId);
                    setDataCartao(response.data.cartao.dataCartao);
                    setValidade(response.data.cartao.validade);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCartao();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar cartão</h1>
                    <div className="m-auto p-2">
                        <Link to="/listacartoes"
                            className="btn btn-outline-primary btn-sm">Visualizar cartões
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtCartao}>
                    <FormGroup className="p-2">
                        <Label>Cartão ID</Label>
                        <Input type="number" name="id"
                            defaultValue={id} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente ID</Label>
                        <Input type="number" name="ClienteId"
                            value={ClienteId}
                            onChange={e => setClienteId(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do cartão</Label>
                        <Input type="date" name="dataCartao"
                            value={dataCartao}
                            onChange={e => setDataCartao(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data de validade</Label>
                        <Input type="date" name="validade"
                            value={validade}
                            onChange={e => setValidade(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" color="success" style={{ marginRight: '10px' }}>Salvar</Button>
                    <Button type="reset" color="warning" onClick={limparInputs} style={{ marginRight: '10px' }}>Limpar</Button>
                    <Link to="/listacartoes"
                        className="btn btn-danger" style={{ marginRight: '10px' }}>Cancelar
                    </Link>
                </Form>
            </Container>

        </div>
    )
}