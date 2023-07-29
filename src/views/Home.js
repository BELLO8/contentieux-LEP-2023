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


const Home = () => {

  return (
    <div>
      <Col lg='12' sm='12'>
        <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} />
      </Col>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des répresentants</CardTitle>
        </CardHeader>
        <CardBody>
          <TableBasic />
        </CardBody>
      </Card>
      <Row>
        <Col lg='8' md='6' sm='12'>
        <Card>
          <CardHeader>
            <CardTitle>Liste des votants</CardTitle>
          </CardHeader>
          <CardBody>
            <TableBasic />
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
