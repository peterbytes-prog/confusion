import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, signupUser, postComment, fetchDishes, fetchComments,fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) =>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes: ()=>dispatch(fetchDishes()),
  resetFeedbackForm: ()=> dispatch(actions.reset('feedback')),
  fetchComments: ()=>dispatch(fetchComments()),
  fetchPromos: ()=>dispatch(fetchPromos()),
  fetchLeaders: ()=>dispatch(fetchLeaders()),
  postFeedback:(values)=>dispatch(postFeedback(values)),

  logoutUser: () => { dispatch(logoutUser())},
  loginUser: (creds) => { dispatch(loginUser(creds))},
  signupUser: (creds) => { dispatch(signupUser(creds))},

})
const mapStateToProps = state => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders: state.leaders,
    user:state.user
  }
}

class MainComponent extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }
  render() {
    const HomePage = () =>{
      return <Home
      dishesLoading = { this.props.dishes.isLoading }
      dishesErrMess = { this.props.dishes.errMess}
      dish={this.props.dishes.dishes.filter(dish=>dish.featured)[0]}

      promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
      promosLoading = { this.props.promotions.isLoading }
      promosErrMess = { this.props.promotions.errMess}

      leader={this.props.leaders.leaders.filter(leader=>leader.featured)[0]}
      leadersLoading = { this.props.leaders.isLoading }
      leadersErrMess = { this.props.leaders.errMess}
      />
    }
    const DishWithId =({match})=>{

      var { dishId } = match.params;
      // dishId = parseInt(dishId,10);
      return(
        <DishDetail
          dish={this.props.dishes.dishes.filter((dish) => dish._id === dishId)[0]}
          isLoading = { this.props.dishes.isLoading }
          errMess = { this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comment) => comment.dish === dishId)}
          commentsErrMess = { this.props.comments.errMess}
          postComment = {this.props.postComment}

        />
      )
    }
    console.log(this.props.comments);
    return (

      <div>
        <Header user={this.props.user} loginUser={ this.props.loginUser } logoutUser={ this.props.loginUser }/>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key} className='page' timeout={300}
          >
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />}/>
              <Route path='/menu/:dishId' component={DishWithId}/>
              <Route
                exact path='/contactus'
                component={()=>
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm }
                    postFeedback={this.props.postFeedback}
                    />
                  }
                />
              <Route path='/aboutus' component={()=><About
                leaders={this.props.leaders.leaders}
                leadersLoading = { this.props.leaders.isLoading }
                leadersErrMess = { this.props.leaders.errMess}
                />} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}
const Main = withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));
export default Main;
