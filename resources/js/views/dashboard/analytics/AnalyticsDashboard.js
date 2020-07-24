import React from "react"
import { Row, Col } from "reactstrap"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import { Users,DollarSign,Calendar,ShoppingCart } from "react-feather"


class AnalyticsDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="3" md="6" sm="12">
          </Col>
          <Col lg="3" md="6" sm="12">
          </Col>
          <Col lg="3" md="6" sm="12">
          </Col>
          <Col lg="3" md="6" sm="12">
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AnalyticsDashboard
