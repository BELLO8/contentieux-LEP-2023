import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink
} from "reactstrap"
import StatsCard from "./Components/StatsCard"

const Home = () => {
  return (
    <div>
      <Col lg='12' sm='12'>
        <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} />
      </Col>

      <Card>
        <CardHeader>
          <CardTitle>Liste des representants</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

    </div>
  )
}

export default Home
