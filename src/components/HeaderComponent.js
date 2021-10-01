import React, { Component } from 'react';
import {
  Navbar,
   NavbarBrand,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    Jumbotron,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends Component {
  constructor(props){
    super(props);
    this.state ={
      isNavOpen: false,
      isModalOpen:false,
    }
    //this.password = 'hell';
    this.toogleNav = this.toogleNav.bind(this);
    this.toggleModal = this.toogleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  toogleNav(){
    this.setState({isNavOpen:!this.state.isNavOpen});
  }
  toogleModal(){
    this.setState({isModalOpen:!this.state.isModalOpen});
  }
  handleLogin(event){
    this.toogleModal();
    //console.log(this);
    //alert(this.username.value,this.password.value,this.remember.value);
    console.log(this.username.value,);
    event.preventDefault();
  }
  render() {
    return(
    <React.Fragment>
      <Navbar dark expand='md'>
        <div className="container">
            <NavbarToggler onClick={this.toogleNav} />
            <NavbarBrand className='mr-auto' href="/">
              <img src='assets/images/logo.png' height='30' width='41' alt='Ristorante con Fusion'/>
            </NavbarBrand>
            <Collapse navbar isOpen={this.state.isNavOpen}>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to='/home' >
                    <span className='fa fa-home fa-lg'></span>Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/aboutus'>
                    <span className='fa fa-info fa-lg'></span>About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/menu'>
                    <span className='fa fa-list fa-lg'></span>Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/contactus'>
                    <span className='fa fa-card fa-lg'></span>Contact us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className='ms-auto ml-auto' navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-sign-in fa-lg'></span>Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>

        </div>
      </Navbar>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
       <Modal isOpen={ this.state.isModalOpen } toggle={ this.toggleModal }>
        <ModalHeader toggle={ this.toggleModal }>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label htmlFor='username'>Username</Label>
              <Input
                type='text'
                name='username'
                id='username'
                innerRef ={(input)=>{
                  this.username = input
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='text'
                name='password'
                id='password'
                innerRef ={(input)=>this.password = input}
                />
            </FormGroup>

            <FormGroup>
              <Label check>
                <Input type='checkbox' name='remember' id='remember' />
                Remember me
              </Label>
            </FormGroup>

            <Button type='submit' color='primary'>
              Login
            </Button>
          </Form>
        </ModalBody>
       </Modal>
    </React.Fragment>
    );
  }
}

export default Header;
