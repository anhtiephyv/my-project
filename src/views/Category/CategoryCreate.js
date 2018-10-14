import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Badge,
    FormGroup, Label, CardFooter, FormText
} from 'reactstrap';
import * as ValidateConst from './../../ultils/validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import { connect } from 'react-redux';
import { actAddCategoryRequest } from './../../action/Category';
import * as categoryservice from './CategoryService';
class CategoryCreate extends Component {
    constructor(props) {
        debugger;
        super(props);
        this.state = {
            large: false,
            category: {},
            CategoryID: props.CategoryID
        };
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal(CategoryID = null) {
        debugger;
        if(typeof CategoryID == "number")
        {
            this.setState({
                CategoryID: CategoryID,
            });
        }
        this.setState({
            large: !this.state.large,
        });
    }
    inputOnChange = (e, key) => {
        let category = this.state.category;
        category[key] = e.target.value;
        this.setState({ category });
    };
    createData = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            this.props.onAddCategory(this.state.category);

            this.toggleModal();
        }

    };
    render() {
        const {
            CategoryID
        } = this.state;
        return (
            <div className="animated fadeIn">
                <Button className="btn-pill btn-outline-success" onClick={this.toggleModal}><i className="fa fa-plus"></i> Thêm mới</Button>
                <Modal isOpen={this.state.large} toggle={this.toggleModal}
                    className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Thêm mới loại sản phẩm {CategoryID}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12" md="12">
                                <Form method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={e => this.createData(e)} ref={c => { this.form = c }}>
                                    <Card>
                                        <CardBody>
                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label className="float-right" htmlFor="text-input">Tên loại sản phẩm <span style={{ color: 'red' }}>(*)</span></Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text"
                                                        id="text-input"
                                                        name="CategoryName"
                                                        placeholder="Tên loại sản phẩm"
                                                        className="form-control"
                                                        validations={[ValidateConst.required, ValidateConst.minLength(10)]}
                                                        onChange={(e) => this.inputOnChange(e, 'CategoryName')}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label className="float-right" htmlFor="text-input">Loại cha</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input
                                                        type="text"
                                                        id="email-input"
                                                        name="ParentName"
                                                        placeholder="loại cha"
                                                        className="form-control"
                                                        onChange={(e) => this.inputOnChange(e, 'ParentCategory')} />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label className="float-right" htmlFor="text-input">Sắp xếp <span style={{ color: 'red' }}>(*)</span></Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input
                                                        type="number"
                                                        id="text-sort"
                                                        name="DisplayOrder"
                                                        placeholder="Sắp xếp"
                                                        className="form-control"
                                                        validations={[ValidateConst.required]}
                                                        onChange={(e) => this.inputOnChange(e, 'DisplayOrder')} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label className="float-right" htmlFor="text-input">Mô tả</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Textarea
                                                        name="Description"
                                                        id="textarea-input" rows={9}
                                                        placeholder="Nhập mô tả"
                                                        className="form-control"
                                                        // defaultValue={""}
                                                        onChange={(e) => this.inputOnChange(e, 'Description')}></Textarea>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label className="float-right" htmlFor="text-input">Level</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Select
                                                        name="categoryLevel"
                                                        id="select"
                                                        className="form-control"
                                                        onChange={(e) => this.inputOnChange(e, 'categoryLevel')}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </Select>
                                                </Col>
                                            </FormGroup>

                                        </CardBody>
                                        <CardFooter>

                                            <Button type="submit" size="sm" color="primary"><i className="fa fa-save"></i> Lưu</Button>
                                            <Button type="reset" size="sm" onClick={this.toggleModal} color="danger"><i className="fa fa-times"></i> Thoát</Button>
                                            <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                                        </CardFooter>
                                    </Card>
                                </Form>
                            </Col>
                        </Row>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddCategory: (category) => {
            debugger;
            categoryservice.addCategory(category).then(res => {
                ownProps.reloadDataMethod()
            });
        },
    }
}
// Thêm đoạn { withRef: true } để thằng có refs có thể gọi được
export default connect(null, mapDispatchToProps, null, { withRef: true })(CategoryCreate);
