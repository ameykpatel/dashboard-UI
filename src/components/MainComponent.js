import React, { Component } from 'react';
import Menu from './MenuComponent';
import SoundMenu from './SoundComponent';
import ProjectMenu from './ProjectComponent';

import DishDetail from './DishDetailComponent';



import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Login from './LoginComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { addComment, addSoundFile, removeSoundFile } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        projects: state.projects,
        sounds: state.sounds
    }   ;     
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    addSoundFile: (name, image, description) => dispatch(addSoundFile(name, image, description)),
    removeSoundFile: (id) => dispatch(removeSoundFile(id))
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const HomePage = () => {
            return (
                <Home sound={this.props.sounds.filter(sound => sound.featured)[0]}
                    project={this.props.projects.filter(project => project.featured)[0]}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail 
                dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
                comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} 
                addComment={this.props.addComment}
                    />
            );
        }
        
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route exact path="/projectmenu" component={() => <ProjectMenu projects={this.props.projects} />} />
                    <Route exact path="/soundmenu" component={() => <SoundMenu sounds={this.props.sounds} addSoundFile={this.props.addSoundFile} removeSoundFile={this.props.removeSoundFile} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/login" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
