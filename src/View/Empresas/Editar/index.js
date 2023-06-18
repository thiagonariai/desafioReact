import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarEmpresa = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [dataAdesao, setDataAdesao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtEmpresa = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizaempresa/" + id,
            { id, nome, dataAdesao }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Empresa alterada com sucesso'
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
        setDataAdesao('');
    }

    useEffect(() => {
        const getEmpresa = async () => {
            await axios.get(api + "/empresa/" + id)
                .then((response) => {
                    setNome(response.data.empresa.nome);
                    setDataAdesao(response.data.empresa.dataAdesao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getEmpresa();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar empresa</h1>
                    <div className="m-auto p-2">
                        <Link to="/listaempresas"
                            className="btn btn-outline-primary btn-sm">Visualizar empresas
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtEmpresa}>
                    <FormGroup className="p-2">
                        <Label>Empresa ID</Label>
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
                        <Label>Data de adesão</Label>
                        <Input type="date" name="dataAdesao"
                            value={dataAdesao}
                            onChange={e => setDataAdesao(e.target.value)} />
                    </FormGroup>
                    
                    <Button type="submit" color="success" style={{marginRight: '10px'}}>Salvar</Button>
                    <Button type="reset" color="warning" onClick={limparInputs} style={{marginRight: '10px'}}>Limpar</Button>
                    <Link to="/listaempresas"
                            className="btn btn-danger" style={{marginRight: '10px'}}>Cancelar
                        </Link>
                </Form>
            </Container>

        </div>
    )
}