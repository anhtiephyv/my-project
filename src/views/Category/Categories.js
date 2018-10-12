import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input,Form,FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { actGetAllCategoryRequest, actDeleteCategoryRequest } from '../../action/Category';
import Pagination from './../../ultils/Pagination';
import * as categoryservice from './CategoryService'
import CategoryCreate from './CategoryCreate';
function UserRow(props) {
  const category = props.category;
  // const userLink = `#/users/${user.id}`

  // const getBadge = (status) => {
  //   return status === 'Active' ? 'success' :
  //     status === 'Inactive' ? 'secondary' :
  //       status === 'Pending' ? 'warning' :
  //         status === 'Banned' ? 'danger' :
  //           'primary'
  // }

  return (
    <tr key={category.CategoryID}>
      <th scope="row">{category.CategoryID}</th>
      <td>{category.CategoryName}</td>
      <td>{category.CategoryLevel}</td>
      <td>{category.ParentName}</td>
      <td>
        <Button className="btn  btn-sm btn-info" ><i className="fa fa-pencil"></i></Button>
        <Button className="btn  btn-sm btn-danger" ><i className="fa fa-trash"></i></Button>
      </td>
    </tr>
  )
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      totalPages: 0,
      totalRecords: 0,
      pageLimit: 5, keyword: null,
      showCreateModal: false,
    };
    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onPageChanged = this.onPageChanged.bind(this);
  };
  onPageChanged(data) {
    // update state with new page of items
    // this.setState({ pageOfItems: pageOfItems });
    debugger;
    if (data.currentPage > 0) {
      data.currentPage = data.currentPage - 1;
    }
    const { currentPage, totalPages, pageLimit } = data;
    this.setState({ currentPage, totalPages, pageLimit }, () => {
      this.reloadData();
    })

  }
  reloadData() {
    categoryservice.getPaging({
      page: this.state.currentPage == null ? 0 : this.state.currentPage,
      pageSize: this.state.pageLimit == null ? 10 : this.state.pageLimit,
      orderby: "CategoryID",
      sortDir: "desc",
      filter: null,
      keyword: null,
    }).then(res => {
      this.setState({ totalRecords: res.data.TotalCount });
      this.props.getAllCategories(res.data);
    })
  };
  showCreateModal() {
    debugger;
    this.setState({ showCreateModal: true });
  };
  componentDidMount() {
    let params = {
      page: this.state.currentPage == null ? 0 : this.state.currentPage,
      pageSize: this.state.pageLimit == null ? 10 : this.state.pageLimit,
      orderby: "CategoryID",
      sortDir: "desc",
      filter: null,
      keyword: null,
    };
    categoryservice.getPaging(params).then(res => {
      this.setState({ totalRecords: res.data.TotalCount });
      this.props.getAllCategories(res.data);
    })

  };
  render() {
    const {
      pageLimit,
      showCreateModal
    } = this.state;
    var { categories } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-folder"></i> Loại sản phẩm
                <div className="float-xl-right"><CategoryCreate></CategoryCreate></div><br></br>
              </CardHeader>
              <CardBody>
                  <Col xl={4}>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <div className="input-group px-1">
                      <Input type="text" className="form-control" placeholder="Tìm kiếm" name="keyword" />
                      <div className="input-group-append">
                        <Button className="btn btn-outline-secondary" type="button">  <i className="fa fa-search"></i>Tìm kiếm</Button>
                      </div>
                    </div>
                
                   </FormGroup>
                </Form>
                 </Col>
                <Row>
                  <Col xl={12}>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Tên loại sản phẩm</th>
                          <th scope="col">Level</th>
                          <th scope="col">Loại cha</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) =>
                          <UserRow key={index} category={category} />
                        )}
                      </tbody>
                    </Table>
                    <div>
                      <Pagination totalRecords={this.state.totalRecords} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllCategories: (data) => {
      dispatch(actGetAllCategoryRequest(data));
    },
    onDeleteCategory: (id) => {
      dispatch(actDeleteCategoryRequest(id))
    }
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
