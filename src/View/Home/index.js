import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Página Inicial</h1>
                    </div>
                </div>
                <hr className="m-1" />
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <a href="/listaclientes" className="btn btn-outline-secondary btn-sm" style={{marginRight: '10px'}}>Cliente</a>
                        <a href="/listacartoes" className="btn btn-outline-secondary btn-sm " style={{marginRight: '10px'}}>Cartões</a>
                        <a href="/listacompras" className="btn btn-outline-secondary btn-sm" style={{marginRight: '10px'}}>Compras</a>
                        <a href="/listapromocoes" className="btn btn-outline-secondary btn-sm" style={{marginRight: '10px'}}>Promoções</a>
                        <a href="/listaempresas" className="btn btn-outline-secondary btn-sm" style={{marginRight: '10px'}}>Empresas</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}