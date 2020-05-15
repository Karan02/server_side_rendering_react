import  React  from "react";
// import {Route} from "react-router-dom"
import App from "./App"
import HomePage from "./pages/HomePage"
import UsersListPage from "./pages/UsersListPage"

// export default () =>{
//     return(
//         <div>   
//         <Route exact path="/" component={Home}/>
//         <Route exact path="/users" component={UsersList}/>
        
//         </div>
//     )
// }

export default [
    {
        ...App,
        routes:[{
            path:"/",
            // component:HomePage.Home,
            ...HomePage,
            exact:true
        },{
            
            path:"/users",
            // component:UsersListPage
            ...UsersListPage
        }]
    }
]

