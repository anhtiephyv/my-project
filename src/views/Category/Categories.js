import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { actGetAllCategoryRequest, actDeleteCategoryRequest } from '../../action/Category';
import CategoryCreate from './CategoryCreate';
import ReactTable from "react-table";
import * as notification from '../../ultils/notification';
import {NotificationContainer} from 'react-notifications';
import 'react-table/react-table.css';
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      CategoryID: null,
      loading: true,
      orderby: "CategoryID",
      keyword: null,
      filter: null,
      sortDir: "desc"
    };
    this.reloadData = this.reloadData.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
  };
  // fetch data
  fetchData(state, instance) {
    debugger;
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    this.setState({
      currentPage: state.page,
      pageLimit: state.pageSize,
      loading: false,
      orderby: state.sorted[0].id,
      sortDir: state.sorted[0].desc ? "desc" : "asc"
    }, () => {
      this.reloadData();
    })
  }
  // Reload lại data
  reloadData() {
    let params = {
      page: this.state.currentPage == null ? 0 : this.state.currentPage,
      pageSize: this.state.pageLimit == null ? 10 : this.state.pageLimit,
      orderby: this.state.orderby == null ? "CategoryId" : this.state.orderby,
      sortDir: this.state.sortDir == null ? "desc" : this.state.sortDir,
      filter: null,
      keyword: null,
    }
    this.props.getAllCategories(params);
  };
  // Hàm khi component được mount
  // componentDidMount() {
  //   let params = {
  //     page: this.state.currentPage == null ? 0 : this.state.currentPage,
  //     pageSize: this.state.pageLimit == null ? 10 : this.state.pageLimit,
  //     orderby: "CategoryID",
  //     sortDir: "desc",
  //     filter: null,
  //     keyword: null,
  //   };
  //   this.props.getAllCategories(params);
  // };
  render() {
    const {
      pageLimit,
      showModal,
      CategoryID,
      loading
    } = this.state;
    var { categories, totalRecords } = this.props;

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
                    <ReactTable
                      data={categories}
                      columns={[
                        {
                          Header: "Id",
                          accessor: "CategoryID"
                        },
                        {
                          Header: "Tên loại sản phẩm",
                          accessor: "CategoryName"
                        },
                        {
                          Header: "Level",
                          accessor: "CategoryLevel"
                        },
                        {
                          Header: "Loại cha",
                          accessor: "ParentName",
                          sortable:false
                        },
                        {
                          Header: " ",
                          id:"tools",
                          sortable:false,
                          accessor: d => (
                            <div>
                              <Button className="btn  btn-sm btn-info" onClick={() => this.showEditModal(d.CategoryID)}><i className="fa fa-pencil"></i></Button>
                              <Button className="btn  btn-sm btn-danger" onClick={() =>  {if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) this.DeleteCategories(d.CategoryID)}}><i className="fa fa-trash"></i></Button>
                            </div>
                          )
                        }
                      ]}

                      defaultSorted={[
                        {
                          id: "CategoryID",
                          desc: true
                        }
                      ]}
                      defaultPageSize={5}
                      manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                      pages={Math.ceil(totalRecords / pageLimit)} // Display the total number of pages
                      loading={loading} // Display the loading overlay when we need it
                      onFetchData={this.fetchData} // Request new data when things change
                      //   filterable
                      className="-striped -highlight"
                      rowsText="bản ghi"
                      previousText="Sau"
                      nextText="Trước"
                      noDataText="Không có dòng nào để hiển thị"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <NotificationContainer/>
      </div>
    )
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
  //Delete category
  DeleteCategories(id) {
    actDeleteCategoryRequest(id).then(()=>{
      this.reloadData();
      notification.success("Xóa thành công",null,3000);
   }).catch(()=> {
    notification.error("Xóa không thành công",null,3000);
   });
  }
  // End class
}
// Redux
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllCategories: (params) => {
      dispatch(actGetAllCategoryRequest(params));
    }
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    totalRecords: state.categories.totalRecords
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
