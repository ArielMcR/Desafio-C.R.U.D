import './HomePage.css';
import Container from '../Container';
import Header from '../Header';
import Footer from '../Footer';
import { BsFillPinMapFill, BsPeopleFill } from "react-icons/bs";
import { FaShoppingBasket, FaMapMarkedAlt, FaShoppingCart } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Col
} from "reactstrap"
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Header />
      <Container>
        <div className="grid">
          <div className="row text-center">
            <Col sm={12} md={6} lg={4}>
              <Card className="my-2" color="primary" inverse>
                <CardHeader>Cadastros</CardHeader>
                <CardBody>
                  <CardText>
                    <ol className='Lista_Cadastros text-left'>
                      <li><FaMapMarkedAlt /><Link className='links-cadastros' to='/listar/Cidade'>Cidades</Link></li>
                      <li><BsFillPinMapFill /><Link className='links-cadastros' to='/listar/Bairro'>Bairros</Link></li>
                      <li><BsPeopleFill /><Link className='links-cadastros' to='/listar/Pessoas'>Pessoas</Link></li>
                      <li><FaShoppingBasket /><Link className='links-cadastros' to='/listar/Produto'>Produtos</Link></li>
                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card className="my-2" color="primary" inverse>
                <CardHeader>Movimento</CardHeader>
                <CardBody>
                  <CardText>
                    <ol className='Lista_Cadastros text-center'>
                      <li><FaShoppingBasket /><Link className='links-cadastros' to='/listar/Vendas'>Vendas</Link></li>
                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card className="my-2" color="primary" inverse>
                <CardHeader>Relatórios</CardHeader>
                <CardBody>
                  <CardText>
                    <ol className='Lista_Cadastros text-left'>
                      <li><BsPeopleFill /><Link to='/relatorio/Pessoas' className='links-cadastros'>Lista de Pessoas</Link></li>
                      <li><FaShoppingCart /><Link to='/relatorio/Pessoas' className='links-cadastros'>Lista de vendas</Link></li>
                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
