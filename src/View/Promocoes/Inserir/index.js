import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarPromocao = () => {

    const [promocao, setPromocao] = useState({
        EmpresaId: '',
        nome: '',
        descricao: '',
        validade: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPromocao({
        ...promocao, [e.target.name]: e.target.value
    });

    const cadPromocao = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserirpromocao", promocao, { headers })
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
                    <h1>Cadastrar Promoção</h1>
                </div>
                <div className="p-2">
                    <Link to="/listapromocoes" className="btn btn-outline-secondary btn-sm">Listar Promoções</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">
                {status.message}
            </Alert> : ""}
            {status.type === 'success' ? <Alert color="success">
                {status.message}
            </Alert> : ""}
            <Form className="p-2" onSubmit={cadPromocao}>
                <FormGroup className="p-1">
                    <Label>Empresa ID</Label>
                    <Input type="number" name="EmpresaId" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Nome da promoção</Label>
                    <Input type="text" name="nome" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-1">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" onChange={valorInput} />
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