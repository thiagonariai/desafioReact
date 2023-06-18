import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        cidade: '',
        uf: '',
        nascimento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    });

    const cadCliente = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserircliente", cliente, { headers })
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
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listaclientes" className="btn btn-outline-secondary btn-sm">Listar Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">
                {status.message}
            </Alert> : ""}
            {status.type === 'success' ? <Alert color="success">
                {status.message}
            </Alert> : ""}
            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-1">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>UF</Label>
                    <Input type="text" name="uf" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Data de Nascimento</Label>
                    <Input type="date" name="nascimento" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )

}