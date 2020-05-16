import React from "react"
import { Redirect } from "react-router-dom"

import {connect} from "react-redux"

export default (ChildComponent) =>{
    class RequireAuth extends React.Component{
        render(){
           switch(this.props.auth){
               case false:
                    return <Redirect to="/" />
               case null:
                   return <div>Loading...</div> 
               default:
                   return <ChildComponent {...this.props}/>
           }
        }
    }
    const mapState = ({auth}) =>({
        auth
    })
   return connect(mapState)(RequireAuth)
} 