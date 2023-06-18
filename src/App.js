import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/menu';
import { Home } from './View/Home';
import { ListaClientes } from './View/Clientes/Listar';
import { CadastrarCliente } from './View/Clientes/Inserir';
import { ListaEmpresas } from './View/Empresas/Listar';
import { CadastrarEmpresa } from './View/Empresas/Inserir';
import { ListaCartoes } from './View/Cartoes/Listar';
import { CadastrarCartao } from './View/Cartoes/Inserir';
import { ListaPromocoes } from './View/Promocoes/Listar';
import { CadastrarPromocao } from './View/Promocoes/Inserir';
import { ListaCompras } from './View/Compras/Listar';
import { CadastrarCompra } from './View/Compras/Inserir';
import { EditarCliente } from './View/Clientes/Editar';
import { EditarEmpresa } from './View/Empresas/Editar';
import { EditarPromocao } from './View/Promocoes/Editar';
import { EditarCartao } from './View/Cartoes/Editar';
import { EditarCompra } from './View/Compras/Editar';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listaclientes" component={ListaClientes}/>
          <Route path="/inserircliente" component={CadastrarCliente}/>
          <Route path="/atualizacliente/:id" component={EditarCliente}/>
          <Route path="/listaempresas" component={ListaEmpresas}/>
          <Route path="/inserirempresa" component={CadastrarEmpresa}/>
          <Route path="/atualizaempresa/:id" component={EditarEmpresa}/>
          <Route path="/listacartoes" component={ListaCartoes}/>
          <Route path="/inserircartao" component={CadastrarCartao}/>
          <Route path="/atualizacartao/:id" component={EditarCartao}/>
          <Route path="/listapromocoes" component={ListaPromocoes}/>
          <Route path="/inserirpromocao" component={CadastrarPromocao}/>
          <Route path="/atualizapromocao/:id" component={EditarPromocao}/>
          <Route path="/listacompras" component={ListaCompras}/>
          <Route path="/inserircompra" component={CadastrarCompra}/>
          <Route path="/atualizacompra/:CartaoId/:PromocaoId" component={EditarCompra}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
