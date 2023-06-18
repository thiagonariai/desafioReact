import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">TI Academy</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Página Inicial</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listaclientes">Clientes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listacartoes">Cartões</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listacompras">Compras</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listapromocoes">Promoções</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listaempresas">Empresas</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}