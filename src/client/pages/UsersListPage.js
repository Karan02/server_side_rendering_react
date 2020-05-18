import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchUsers} from "../actions"
import {Helmet} from "react-helmet"
class UsersList extends Component {
    componentDidMount(){
        this.props.fetchUsers();
    }
    renderusers(){
        return  this.props.users.map(user=>{
                return<li key={user.id}>{user.name}</li>
            })
    }
    head(){
        return(
            <Helmet>
            <title>{`${this.props.users.length}Users Loaded `}</title>
            <meta property="og:title" content="Users App" />
            </Helmet>
            )
    }
    render(){
        return(
            <div>
                  
               {this.head()}
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