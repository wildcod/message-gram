import React,{Component} from 'react'
import Layout from '../layout/layout'
import Login from '../../components/login/login'
import {Switch,Route,withRouter} from 'react-router-dom'


class Main extends Component{

    state = {
        user : ''
    }

    componentDidMount(){
        console.log(this.props)
    }

    userNameHandler = (user) => {
            this.setState({user});
            this.props.history.push('/message-gram')
    }

    render(){
        const {user} = this.state
        return(
            <div>
                <Switch>
                    <Route exact path="/" render={() => <Login userName={this.userNameHandler}/>}/>
                    <Route path="/message-gram" render={() => <Layout user={user}/>}/>
                 </Switch>
            </div>
        )
    }
}

export default withRouter(Main)