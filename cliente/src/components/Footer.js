import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Container, Row, Col } from 'reactstrap'; // ou a biblioteca de componentes que você está usando

function Footer() {
  const date = new Date();
  const formattedDate = format(date, "dd 'de' MMMM yyyy'['HH:mm']'", { locale: ptBR });


  return (
    
    <Container fluid tag="footer" className="text-center bg-light text-muted p-3">
      <Row>
        <Col>
          <p>Paranavaí {formattedDate}</p>

        </Col>
      </Row>
    </Container>
  );
}
export default Footer;