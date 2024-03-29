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
  CardText
} from "reactstrap"
import { Link } from 'react-router-dom';



function HomePage() {

  return (
    <>
      <Header />
      <Container>

        <div className="grid">
          <div className="row text-center">
            <div className="col-4">
              <Card
                className="my-2"
                color="primary"
                inverse
                style={{
                  width: '18rem',
                  height: 'auto'
                }}
              >
                <CardHeader>
                  Cadastros
                </CardHeader>
                <CardBody>

                  <CardText>
                    <ol className='Lista_Cadastros text-left'>
                      <li>< FaMapMarkedAlt /><Link className='links-cadastros' to='/listar/Cidade'>Cidades</Link></li>
                      <li><BsFillPinMapFill /><Link className='links-cadastros' to='/listar/Bairro'>Bairros</Link></li>
                      <li><BsPeopleFill /> <Link className='links-cadastros' to='/listar/Pessoas'>Pessoas</Link></li>
                      <li><FaShoppingBasket /> <Link className='links-cadastros' to='/listar/Produto'>Produtos</Link></li>

                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </div>

            <div className="col-4">
              <Card
                className="my-2"
                color="primary"
                inverse
                style={{
                  width: '18rem',
                  height: 'auto'
                }}
              >
                <CardHeader>
                  Movimento
                </CardHeader>
                <CardBody>

                  <CardText>
                    <ol className='Lista_Cadastros text-left'>
                      <li><FaShoppingBasket /> <Link className='links-cadastros' to='/listar/Vendas'> Vendas </Link></li>


                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-4">
              <Card
                className="my-2"
                color="primary"
                inverse
                style={{
                  width: '20rem',
                  height: 'auto'
                }}
              >
                <CardHeader>
                  Relatórios
                </CardHeader>
                <CardBody>

                  <CardText>
                    <ol className='Lista_Cadastros text-left'>
                      <li><BsPeopleFill /> <a className='links-cadastros' href=' '>Lista de Pessoas</a></li>
                      <li><FaShoppingCart /><a className='links-cadastros' href=' '>Lista de vendas</a></li>

                    </ol>
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
