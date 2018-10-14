import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import CategoryService from './CategoryService';

class Category extends Component
{
  render() {

    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: </strong>
              </CardHeader>
              <CardBody>
              <Table responsive bordered>
                    <tbody>
        
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Category;
