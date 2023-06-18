import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarCompra = () => {

    const [compra, setCompra] = useState({
        CartaoId: '',
        PromocaoId: '',
        data: '',
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    });

    const cadCompra = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserircompra", compra, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                console.log("Erro, sem conexão com a API")
            })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listacompras" className="btn btn-outline-secondary btn-sm">Listar Compras</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">
                {status.message}
            </Alert> : ""}
            {status.type === 'success' ? <Alert color="success">
                {status.message}
            </Alert> : ""}
            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-1">
                    <Label>Cartão ID</Label>
                    <Input type="number" name="CartaoId" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Promoção ID</Label>
                    <Input type="number" name="PromocaoId" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Data da compra</Label>
                    <Input type="date" name="data" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Quantidade</Label>
                    <Input type="number" name="quantidade" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Valor R$</Label>
                    <Input type="text" name="valor" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )

}