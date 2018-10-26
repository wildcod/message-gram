import React,{Component} from 'react'
import {Input,Button,Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {initiateLogin} from '../../redux/actions'
import './login.css' 


class Login extends Component {

    state = {
        username : 'harshiv23@gmail.com',
        password :'harshiv'
    }

    componentDidMount(){
             if(this.props.loggedIn){
                 console.log('1',this.props.loggedIn)
                 this.props.history.push('/message-gram')
             }
    }
    componentWillReceiveProps(nextProps){
       if(this.props.loggedIn !== nextProps.loggedIn){
           console.log('2')
           this.props.history.push('/message-gram')
       } 
    }

   onChangeInput = (e) => {
       
       const {name,value} = e.target
       this.setState({[name] : value})
   }

   onClickLogin = (e) => {
    e.preventDefault()
    console.log('start')
    const {username,password} = this.state
    console.log(username,password)
    this.props.initiateLogin({username,password})
  }


     render(){
         const {username,password} = this.state
     return(
        <div  >
            <div className="login-main">
                   <Form>
                        <Form.Field>
                        <label>First Name</label>
                        <input
                           placeholder="username" 
                           onChange={this.onChangeInput}
                           value={username}
                           name="username"
                           required
                          />
                        </Form.Field>
                        <Form.Field>
                        <label>Last Name</label>
                        <input 
                         placeholder="password" 
                         onChange={this.onChangeInput}
                         value={password}
                         name="password"
                         required
                         />
                        </Form.Field>
                        <Form.Field>
                        </Form.Field>
                        <Button onClick={this.onClickLogin} type='login'>Login</Button>
                    </Form>
                </div>
        </div>
     );

    }
}

const mapActionsToProps = () => {
    return {
         initiateLogin
    }
}
const mapStateToProps = (state) => {
      console.log(state)
       const {authStore} = state
       const {loggedIn} = authStore
       return {
        loggedIn
       }
}

export default withRouter(connect(mapStateToProps,mapActionsToProps())(Login))
