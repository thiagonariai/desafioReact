import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPromocao = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [EmpresaId, setEmpresaId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [validade, setValidade] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizapromocao/" + id,
            { id, EmpresaId, nome, descricao, validade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Promoção alterada com sucesso'
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
        setEmpresaId('');
        setNome('');
        setDescricao('');
        setValidade('');
    }

    useEffect(() => {
        const getPromocao = async () => {
            await axios.get(api + "/promocao/" + id)
                .then((response) => {
                    setEmpresaId(response.data.promocao.EmpresaId);
                    setNome(response.data.promocao.nome);
                    setDescricao(response.data.promocao.descricao);
                    setValidade(response.data.promocao.validade);

                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPromocao();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar promoção</h1>
                    <div className="m-auto p-2">
                        <Link to="/listapromocoes"
                            className="btn btn-outline-primary btn-sm">Visualizar promoções
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtPromocao}>
                    <FormGroup className="p-2">
                        <Label>Promoção ID</Label>
                        <Input type="number" name="id"
                            defaultValue={id} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Empresa ID</Label>
                        <Input type="number" name="EmpresaId"
                            value={EmpresaId}
                            onChange={e => setEmpresaId(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data de validade</Label>
                        <Input type="date" name="validade"
                            value={validade}
                            onChange={e => setValidade(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" color="success" style={{ marginRight: '10px' }}>Salvar</Button>
                    <Button type="reset" color="warning" onClick={limparInputs} style={{ marginRight: '10px' }}>Limpar</Button>
                    <Link to="/listapromocoes"
                        className="btn btn-danger" style={{ marginRight: '10px' }}>Cancelar
                    </Link>
                </Form>
            </Container>

        </div>
    )
}