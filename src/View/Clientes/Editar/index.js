import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizacliente/" + id,
            { id, nome, cidade, uf, nascimento }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cliente alterado com sucesso'
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
        setNome('');
        setCidade('');
        setUf('');
        setNascimento('');
    }

    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + id)
                .then((response) => {
                    //setId(response.data.cliente.id)
                    setNome(response.data.cliente.nome);
                    setCidade(response.data.cliente.cidade);
                    setUf(response.data.cliente.uf);
                    setNascimento(response.data.cliente.nascimento);
                    console.log(response);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar cliente</h1>
                    <div className="m-auto p-2">
                        <Link to="/listaclientes"
                            className="btn btn-outline-primary btn-sm">Visualizar clientes
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>Cliente ID</Label>
                        <Input type="number" name="id"
                            defaultValue={id} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Estado</Label>
                        <Input type="text" name="uf"
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data de Nascimento</Label>
                        <Input type="date" name="nascimento"
                            value={nascimento}
                            onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" color="success" style={{marginRight: '10px'}}>Salvar</Button>
                    <Button type="reset" color="warning" onClick={limparInputs} style={{marginRight: '10px'}}>Limpar</Button>
                    <Link to="/listaclientes"
                            className="btn btn-danger" style={{marginRight: '10px'}}>Cancelar
                        </Link>
                </Form>
            </Container>

        </div>
    )
}