import React,{Component} from 'react'
import {Input,Button} from 'semantic-ui-react'
import {connect} from 'redux' 
import './signup.css' 


class Signup extends Component {

    state = {
        username : '',
        password : '',
        name : ''
    }

    onChangeInput = (e) => {
        const {name,value} = e.target
        this.setState({ [name] : value})
    }

    onClickSignup = (e) => {
           e.preventDefault()
           const {username,name,password} = this.state
           this.props.initiateSignup({username,name,password})
    }


     render(){
         const {username,password,name} = this.state
     return(
        <div className="signup-main">
                 <Input
                  placeholder="name" 
                  onChange={this.onChangeInput}
                  value={name}
                  required
                  />
                   <Input
                  placeholder="username" 
                  onChange={this.onChangeInput}
                  value={username}
                  required
                  />
                   <Input
                  placeholder="password" 
                  onChange={this.onChangeInput}
                  value={password}
                  required
                  />
                 <Button onClick={this.onClickSignup} >Submit</Button>
        </div>
     );

    }
}

const mapActionToProps = () => {
      return {
        initiateSignup
      }
}

export default connect(mapActionToProps)(Signup)
