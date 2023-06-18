import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [CartaoId] = useState(props.match.params.CartaoId);
    const [PromocaoId] = useState(props.match.params.PromocaoId);
    const [data, setData] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizacompra/" + CartaoId + "/" + PromocaoId,
            { data, quantidade, valor }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Compra alterada com sucesso'
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
        setData('');
        setQuantidade('');
        setValor('');
    }

    useEffect(() => {
        const getCompra = async () => {
            await axios.get(api + "/compra/" + CartaoId + "/" + PromocaoId)
                .then((response) => {
                    setData(response.data.compra.data);
                    setQuantidade(response.data.compra.quantidade);
                    setValor(response.data.compra.valor);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.");
               })
        }
        getCompra();
    }, [CartaoId, PromocaoId]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar compra</h1>
                    <div className="m-auto p-2">
                        <Link to="/listacompras"
                            className="btn btn-outline-primary btn-sm">Visualizar compras
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>Cartão ID</Label>
                        <Input type="number" name="CartaoId"
                            value={CartaoId} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Promocao ID</Label>
                        <Input type="number" name="PromocaoId"
                            value={PromocaoId} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data da compra</Label>
                        <Input type="date" name="data"
                            value={data}
                            onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade"
                            value={quantidade}
                            onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor da compra R$</Label>
                        <Input type="text" name="valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" color="success" style={{ marginRight: '10px' }}>Salvar</Button>
                    <Button type="reset" color="warning" onClick={limparInputs} style={{ marginRight: '10px' }}>Limpar</Button>
                    <Link to="/listacompras"
                        className="btn btn-danger" style={{ marginRight: '10px' }}>Cancelar
                    </Link>
                </Form>
            </Container>

        </div>
    )
}