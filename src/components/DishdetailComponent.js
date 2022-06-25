
import React, {Component} from 'react';
import Store from '../redux/configureStore';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label

 } from 'reactstrap';
import { FadeTransform,Fade, Stagger } from 'react-animation-components';
 import { baseUrl } from '../shared/baseUrl';
 import {LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';
 const maxLength = (len) => (val) => !(val) || (val.length<=len);
 const minLength = (len) => (val) => !(val) || (val.length>=len);

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false
    }
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggle(){
    this.setState({
      modal:!this.state.modal
    });
  }
  handleSubmit(values){
    this.toggle();
    this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
  }
  render(){
    return (
      <React.Fragment>
        <Button onClick={ this.toggle } color='light' className='border border-dark'>
          <i className='fa fa-pencil'></i> Submit Comment
        </Button>
        <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
          <ModalHeader toggle={ this.toggle } >
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
              <Row className='form-group my-2'>
                <Label htmlFor='rating' >
                  Rating
                </Label>
                <Col xs={12}>
                  <Control.select
                    className='form-control'
                    name='rating'
                    model='.rating'
                    id='rating'
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group my-2'>
                <Label htmlFor='author'>
                  Your Name
                </Label>
                <Col xs={12}>
                  <Control.text
                    className='form-control'
                    id='author'
                    name='author'
                    model='.author'
                    placeholder='Your Name...'
                    validators={{
                      minLength:minLength(3),
                      maxLength:maxLength(15)
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages ={{
                      minLength:'Must be greater than 2 characters',
                      maxLength:'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>


              <Row className='form-group my-2'>
                  <Label htmlFor='comment'>
                    Comment
                  </Label>
                  <Col xs={12}>
                    <Control.textarea
                      className='form-control'
                      rows='6'
                      name='comment'
                      model='.comment'
                      validators={{}}
                    />
                  </Col>
              </Row>
              <Row className='form-group my-2'>
                <Col>
                  <Button onClick={ this.toggle } color='light' className='border border-warning mx-1'>
                    Cancel
                  </Button>
                  <Button type='submit' color='primary' className='border border-success mx-1'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }

}
function RenderDish({dish}) {
  return (
    <FadeTransform in
      transformProps={{
        exitTransform:'scale(0.5) translateY(-50%)'
      }}
    >
      <Card className='col'>
        <CardImg width="100%" src={baseUrl + dish.image} alt={ dish.name } />
        <CardBody>
          <CardTitle>
            { dish.name }
          </CardTitle>
          <CardText>
            { dish.description }
          </CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  )

}

function RenderComments({comments,postComment, dishId }) {

  if (comments!==undefined){
    const commentlist = comments.map((comment)=>{
      const date = new Date(comment.date).toDateString();
      return(
        <Fade in>
        <li key={comment._id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {date}</p>
        </li>
        </Fade>
      )
    }
    );
    return(
      <Row>
        <Col xs={12}>
          <ul className='list-unstyled m-0'>
            <Stagger in>
            {commentlist}
            </Stagger>
          </ul>
        </Col>
        <Col xs={12}>
          <CommentForm dishId={dishId} postComment={ postComment }/>
        </Col>
      </Row>

    )
  }else{
    return <div></div>
  }

}

const  DishDetail = (props) => {
  const {dish,comments} = props;
  if ( props.isLoading ){
    return (
      <div className='container' >
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }else if (props.errMess) {
    return (
      <div className='container' >
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if ((dish!==undefined)&&(dish!==null)){
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/home'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {dish.name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <div className="col-12 m-1 col-md-5">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 m-1 col-md-5">
            <Row>
              <Col xs='12'>
                <h4>Comments</h4>
                <RenderComments
                  comments = { comments }
                  postComment = { props.postComment}
                  dishId = {props.dish._id }
                />
              </Col>
            </Row>
          </div>

        </div>

      </div>
    );
  }

    return (<div></div>);

}

export default DishDetail;
