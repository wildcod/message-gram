import React, { Component } from 'react'
import './layout.css'
import api from '../../redux/api'
import axios from 'axios'
import { connect } from 'react-redux'
import { Grid, Input, Button, Segment, Dropdown, Image, Icon } from 'semantic-ui-react';
import openSocket from 'socket.io-client'
import { getAllActiveUser, clearAuthUser,getUserChat } from '../../redux/actions'
import { withRouter } from 'react-router-dom'

const socket = openSocket('http://localhost:8085')



class Layout extends Component {


    state = {
        message: '',
        recvMes: [],
        name: '',
        user: '',
        _id: '',
        selectedUser: { _id: '', name: '' },

    }


    takeMessageAsInput = (e) => {
        this.setState({ message: e.target.value })
    }

    sendMessageHandler = () => {
        const { message, selectedUser, _id } = this.state;
        console.log(_id)

        if(selectedUser.length === 0){
            return;
        }

        socket.emit('send-message', { message, selectedUser, _id });
    }

    componentDidMount = () => {

        const { name, username, activeUsers, _id } = this.props
        this.setState({ username, name, _id });

        socket.on('recv-mesg', (data) => {
            console.log(data)
            this.setState(preState => ({
                recvMes: [...preState.recvMes, data]
            }))
        })
        console.log('componentDidMount')
        this.props.getAllActiveUser()


    }

    componentWillReceiveProps = (nextProps) => {

        // if(this.props.name != nextProps.name){
        // const {name,username} = nextProps
        // this.setState({username,name});
        // console.log('componentWillReceiveProps')

        //   socket.on('recv-mesg',(data) => {
        //       this.setState(preState => ({
        //           recvMes : [...preState.recvMes,data]
        //       }))
        //   })
        // }
    }

    onDropdownClick = async (e, { value }) => {
        console.log('81', value)
        const { username } = this.props

        switch (value) {
            case 'sign-out': await this.props.clearAuthUser({ username })

        }
        this.props.history.push('/')
    }

    onUserInterface = async(value) => {
        const {selectedUser_id,selectedUserName} = value
        this.setState({
            selectedUser: {
                _id : selectedUser_id,
                name : selectedUserName
            }
        })
        const {_id} = this.state
        this.props.getUserChat({_id})
    }

    render() {


        const { recvMes, value, selectedUser } = this.state
        const { activeUsers, name, username } = this.props
        console.log('94', recvMes)

        const trigger = (
            <span>
                <Icon name='user' /> {name}
            </span>
        )

        const options = [
            {
                key: 'user',
                text: (
                    <span>
                        Signed in as <strong>{name}</strong>
                    </span>
                ),
                disabled: true,
            },
            { key: 'profile', text: 'Your Profile', value: 'profile' },
            { key: 'stars', text: 'Your Stars', value: 'stars' },
            { key: 'explore', text: 'Explore', value: 'explore' },
            { key: 'integrations', text: 'Integrations', value: 'integrations' },
            { key: 'help', text: 'Help', value: 'help' },
            { key: 'settings', text: 'Settings', value: 'settings' },
            { key: 'sign-out', text: 'Sign Out', value: 'sign-out' },
        ]

       

        return (
            <div>
                <header className="layout-header">
                    <div className="layout-header-child">
                        <div style={{ fontSize: '28px', fontFamily: 'Lobster' }}>MessageGram</div>
                        <Dropdown trigger={trigger} options={options} value={value} onChange={this.onDropdownClick} />
                    </div>
                </header>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>

                        </Grid.Column>
                        <Grid.Column width={12} className="layout-main">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5} className="layout-main-child-1">

                                        {
                                            activeUsers.map((x, i) => {
                                                return x.map((y, i) => {
                                                    return <div onClick={() => this.onUserInterface({ selectedUserName: y.name, selectedUser_id: y._id })} value={y.name} className="layout-online-users">
                                                        {y.name}
                                                    </div>
                                                })
                                            })
                                        }
                                    </Grid.Column>
                                    <Grid.Column width={11} className="layout-main-child-2">
                                        <ul>
                                            {
                                                recvMes.map((x,i) => {
                                                    return <li>{x}</li>
                                                })
                                            }
                                        </ul>
                                        <spain style={{ position: 'absolute', bottom: 4, width: '96%', minHeight: '50px', height: 'xpx' }}>
                                            <Input onChange={this.takeMessageAsInput} value={this.state.message}
                                                style={{ width: '87%' }} placeholder='type..' />
                                            <Button onClick={this.sendMessageHandler} size="large">Send</Button>
                                        </spain>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={2}>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapActionsToProps = () => {
    return {
        getAllActiveUser,
        clearAuthUser,
        getUserChat
    }
}

const mapStateToProps = state => {
    const { authStore } = state
    const { activeUsers, name, username, _id ,chat} = authStore

    return {
        activeUsers,
        name,
        username,
        _id,
        chat
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps())(Layout))