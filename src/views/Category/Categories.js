import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { actGetAllCategoryRequest, actDeleteCategoryRequest } from '../../action/Category';
import Pagination from './../../ultils/Pagination';
import * as categoryservice from './CategoryService'
import CategoryCreate from './CategoryCreate';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      totalPages: 0,
      totalRecords: 0,
      pageLimit: 5, keyword: null,
      showModal: false,
      CategoryID: null,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };
  // Reload lại data khi bấm sang page khác
  onPageChanged(data) {
    if (data.currentPage > 0) {
      data.currentPage = data.currentPage - 1;
    }
    const { currentPage, totalPages, pageLimit } = data;
    this.setState({ currentPage, totalPages, pageLimit }, () => {
      this.reloadData();
    })

  }
  // Reload lại data
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
  // Hàm khi component được mount
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
      totalRecords,
      showModal,
      CategoryID
    } = this.state;
    var { categories } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-folder"></i> Loại sản phẩm
                <div className="float-xl-right">
                  <Button className="btn-pill btn-outline-success" onClick={this.showCreateModal}><i className="fa fa-plus"></i> Thêm mới</Button>
                  <CategoryCreate closeModal={this.closeModal} showModal={showModal} reloadDataMethod={this.reloadData} CategoryID={CategoryID}></CategoryCreate></div><br></br>
              </CardHeader>
              <CardBody>
                <Col xl={4}>
                  <Form action="" method="post" className="form-horizontal">
                    <FormGroup row>
                      <div className="input-group px-1">
                        <Input type="text" className="form-control" placeholder="Tìm kiếm" name="keyword" />
                        <div className="input-group-append">
                          <Button className="btn btn-outline-secondary" type="button" >  <i className="fa fa-search"></i>Tìm kiếm</Button>
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
                        {this.showcategory(categories)}
                      </tbody>
                    </Table>
                    <div>
                      <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
  // function here
  showcategory(categories) {
    var result = null;
    if (categories != null && categories.length > 0) {
      result = categories.map((category, index) => {
        return (
          <tr key={index}>
            <td>{category.CategoryID}</td>
            <td>{category.CategoryName}</td>
            <td>{category.CategoryLevel}</td>
            <td>{category.ParentName}</td>
            <td>
              <Button className="btn  btn-sm btn-info" onClick={() => this.showEditModal(category.CategoryID)}><i className="fa fa-pencil"></i></Button>
              <Button className="btn  btn-sm btn-danger" onClick={() => this.DeleteCategories(category.CategoryID)}><i className="fa fa-trash"></i></Button>

            </td>
          </tr>
        )
      })
    }
    return result;
  }
  // Show edit form
  showEditModal(CategoryId) {
    debugger;
    this.setState({ showModal: true, CategoryID: CategoryId });
  }
  //show create form
  showCreateModal() {
    debugger;
    this.setState({ showModal: true, CategoryID: null });
  }
  // close modal
  closeModal() {
    this.setState({ showModal: false });
  }
  //Delete modal
  DeleteCategories(id) {
    this.props.onDeleteCategory(id);
  }
  // End class
}
// Redux
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
