/* eslint-disable */
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink
} from "reactstrap"
import StatsCard from "./Components/StatsCard"
import TableBasic from "./Components/TableBasic"
import CardTransactions from "./Components/CardTransactions"
import TableVote from "./Components/TableVote"


const Home = () => {

  return (
    <div>
      <Col lg='12' sm='12'>
        <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} />
      </Col>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des électeurs qui ont votés </CardTitle>
        </CardHeader>
        <CardBody>
          <TableVote />
        </CardBody>
      </Card>
      <Row>
        <Col lg='8' md='6' sm='12'>
        <Card>
          <CardHeader>
            <CardTitle>Resultat d'élection</CardTitle>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>
        </Col>
        <Col lg='4' md='6' sm='12'>
            <CardTransactions />
        </Col>
      </Row>
    </div>
  )
}

export default Home
