import React, { useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import {

    Navbar,

    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,

    Dropdown,

} from 'reactstrap';
import { Link } from 'react-router-dom'

function Header({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div>
            <Navbar color='primary' dark expand="md">
                <NavbarBrand> <Link className='link-to' style={{ color: 'white' }} to='/'> Sistema</Link> </NavbarBrand>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to='/' className='link-to'> <NavLink>Home</NavLink></Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Cadastros
                        </DropdownToggle>
                        <DropdownMenu end>
                            <Link className='link-to' to='/listar/Cidade'><DropdownItem>Cidades</DropdownItem></Link>
                            <Link className='link-to' to='/listar/Bairro'><DropdownItem>Bairros</DropdownItem></Link>
                            <Link className='link-to' to='/listar/Pessoas'><DropdownItem>Pessoas </DropdownItem></Link>
                            <Link className='link-to' to='/listar/Produto'><DropdownItem>Produtos</DropdownItem></Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Relatórios
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem><Link className='link-to' to='/relatorio/pessoas'> Lista de Pessoas </Link></DropdownItem>
                            <DropdownItem><Link className='link-to' to='/relatorio/Vendas'> Lista de Vendas </Link></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>
                    <div className="dropdown">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} color='primary'>
                            <DropdownToggle caret><FaCircleUser /></DropdownToggle>
                            <DropdownMenu {...args}>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem>Some Action</DropdownItem>
                                <DropdownItem text>Dropdown Item Text</DropdownItem>
                                <DropdownItem >Sair</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </NavbarText>
            </Navbar>
        </div>
    );
}

export default Header;