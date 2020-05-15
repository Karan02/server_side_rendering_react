import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchUsers} from "../actions"

class UsersList extends Component {
    componentDidMount(){
        this.props.fetchUsers();
    }
    renderusers(){
        return  this.props.users.map(user=>{
                return<li key={user.id}>{user.name}</li>
            })
    }
    render(){
        return(
            <div>
                <ul>{this.renderusers()}</ul>
            </div>
        )
    }
}

function mapState(state){
    return{
        users:state.users
    }
}

function loadData(store) {
    return   store.dispatch(fetchUsers());
}

export default {
   loadData,    
   component:connect(mapState,{fetchUsers})(UsersList)
}