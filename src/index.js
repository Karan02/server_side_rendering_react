// const express = require("express");
// const React = require("react")
// const renderToString = require("react-dom/server").renderToString
// const Home = require("./client/components/Home").default
import "babel-polyfill"
import express from "express"
import renderer from "./helpers/renderer"
import {matchRoutes} from "react-router-config"
import Routers from "./client/Routes"
import createStore from "./helpers/createStore"
import proxy from "express-http-proxy" 

const app = express();

app.use("/api",proxy("http://react-ssr-api.herokuapp.com",{
  proxyReqOptDecorator(opts){
    opts.headers["x-forwarded-host"] = "localhost:3000";
    return opts
  }
}))

app.use(express.static("public"))

app.get("*",(req,res)=>{
    const store = createStore(req);
    // load all component on mount data
    const promises = matchRoutes(Routers,req.path).map(({route})=>{
      return  route.loadData ? route.loadData(store):null
    }).map(promise => {
      if(promise){
      //this extra promise map is due to if 1 promise rejected we need to still solve it and render it
        return new Promise((resolve,reject)=>{
          promise.then(resolve).catch(resolve)
        })
      }
    })
    Promise.all(promises).then(()=>{
    const context = {}
    const content = renderer(req,store,context)

    // this redirect is for ssr, we use static router on ss so if we go to auth page we redirect it to home page while not logged in
    if(context.url){
      return res.redirect(301,context.url)
    }
    if(context.notFound){
      res.status(404)
    }
    res.send(content);
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})