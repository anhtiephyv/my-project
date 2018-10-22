import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../../action/Auth';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import * as ValidateConst from '../../../ultils/validator';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {}
    };
  };
  inputOnChange = (e, key) => {
    let loginForm = this.state.loginForm;
    loginForm[key] = e.target.value;
    this.setState({ loginForm });
  };
  render() {
    var { error } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={(e) => this.login(e)} ref={c => { this.form = c }}>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted red">{error}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="form-control"
                          validations={[ValidateConst.required, ValidateConst.minLength(10)]}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => this.inputOnChange(e, 'username')}
                          name='username' />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="form-control"
                          validations={[ValidateConst.required]}
                          type="password" placeholder="Password"
                          autoComplete="current-password"
                          onChange={(e) => this.inputOnChange(e, 'password')}
                          name='password' />
                      </InputGroup>
                     
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Đăng nhập</Button>
                          <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Quên mật khẩu?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname // redirects to referring url
    } else {
      return '/'
    }
  }
  login = (e) => {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.props.login(this.state.loginForm);
      this.props.history.push(this.getRedirectPath());
    }

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (loginForm) => {
      dispatch(login(loginForm));
    },
  }

}
const mapStateToProps = state => {
  return {
    error: state.auth.error,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
