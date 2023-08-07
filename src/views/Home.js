/* eslint-disable */
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import StatsCard from "./Components/StatsCard";
import TableBasic from "./Components/TableBasic";
import CardTransactions from "./Components/CardTransactions";
import TableVote from "./Components/TableVote";
import ChartjsHorizontalBarChart from "./Components/ChartjsHorizontalBar";

const Home = () => {
  return (
    <div>
      <Col lg="12" sm="12">
        <StatsCard cols={{ md: "3", sm: "6", xs: "12" }} />
      </Col>
      <h3>Resultat d'élection</h3>
      <ChartjsHorizontalBarChart />

      <Row>
        <Col lg="8" md="6" sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Liste des électeurs qui ont votés </CardTitle>
            </CardHeader>
            <CardBody>
              <TableVote />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
          <CardTransactions />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
