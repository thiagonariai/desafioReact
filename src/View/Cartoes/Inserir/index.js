import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarCartao = () => {

    const [cartao, setCartao] = useState({
        ClienteId: '',
        dataCartao: '',
        validade: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCartao({
        ...cartao, [e.target.name]: e.target.value
    });

    const cadCartao = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserircartao", cartao, { headers })
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
                    <h1>Cadastrar Cartão</h1>
                </div>
                <div className="p-2">
                    <Link to="/listacartoes" className="btn btn-outline-secondary btn-sm">Listar Cartões</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">
                {status.message}
            </Alert> : ""}
            {status.type === 'success' ? <Alert color="success">
                {status.message}
            </Alert> : ""}
            <Form className="p-2" onSubmit={cadCartao}>
                <FormGroup className="p-1">
                    <Label>Cliente ID</Label>
                    <Input type="number" name="ClienteId" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Data de Emissão</Label>
                    <Input type="date" name="dataCartao" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Validade</Label>
                    <Input type="date" name="validade" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )

}