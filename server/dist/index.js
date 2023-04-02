"use strict";var W=Object.create;var m=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var Q=(e,t)=>{for(var r in t)m(e,r,{get:t[r],enumerable:!0})},R=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of E(t))!J.call(e,s)&&s!==r&&m(e,s,{get:()=>t[s],enumerable:!(o=$(t,s))||o.enumerable});return e};var u=(e,t,r)=>(r=e!=null?W(H(e)):{},R(t||!e||!e.__esModule?m(r,"default",{value:e,enumerable:!0}):r,e)),V=e=>R(m({},"__esModule",{value:!0}),e);var te={};Q(te,{app:()=>c});module.exports=V(te);var U=u(require("express")),D=u(require("mongoose")),G=u(require("cors")),h=u(require("body-parser"));var C=require("express");var l=require("mongoose"),X=new l.Schema({email:String,password:String}),i=(0,l.model)("Users",X);var g=u(require("bcryptjs"));var y=u(require("jsonwebtoken"));function w(e){return y.default.sign(e,"admin",{expiresIn:"1d"})}var j=async(e,t)=>{try{let r=await i.find();return t.status(200).json(r)}catch(r){return t.status(500).json({error:r})}},x=async(e,t,r)=>{let{email:o,password:s}=e.body;try{if(await i.findOne({email:o}))throw"user already exists";let d=g.default.hashSync(s,8);return await i.create({email:o,password:d}),t.status(201).json({message:"Person added!"})}catch(n){return t.status(500).json({error:n})}},I=async(e,t)=>{let{email:r,password:o}=e.body;try{let s=await i.findOne({email:r});if(!s)throw"email of user is not correct";if(!g.default.compareSync(o,s.password))throw"password of user is not correct";let d=w({sub:s._id,email:s.email});return t.status(201).send({person:s,token:d})}catch(s){return t.status(500).json({error:s})}};var b=u(require("jsonwebtoken"));var Y=async(e,t,r)=>{let o=String(e?.headers?.token||"");if(o)b.default.verify(o,"admin",async(s,n)=>{if(s)return t.status(403).json({message:s.message,error:s});if(!await i.findOne({_id:n?.sub}))return t.status(403).json({messagem:"forBidden"});e.headers.user=n?.sub,r()});else return t.status(401).json({messagem:"Unauthorized"})},k=Y;function q(e){e.get("/user",j),e.post("/user",x),e.post("/session",I),e.post("/token",k)}var p=require("mongoose"),Z=new p.Schema({longURL:{type:String,required:!0},shortURL:{type:String,required:!0},shortUrlId:{type:String,required:!0,unique:!0},userId:{type:String,required:!1,default:""},visits:{type:Number,required:!1,default:0}}),a=(0,p.model)("urls",Z);var v=u(require("validate.js")),S=u(require("shortid")),N=(e="")=>(0,v.default)({website:e},{website:{url:{allowLocal:!0}}}),L=()=>S.default.generate();var ee=(e,t,r,o)=>{a.create({longURL:e,shortURL:t,shortUrlId:r,userId:o})},O=async(e,t)=>{try{let r=await a.findOne({shortUrlId:e.params.shortUrlId});return r&&await a.findOneAndUpdate({shortUrlId:r.shortUrlId},{visits:Number(r.visits)+1}),r?t.redirect(302,r.longURL):t.status(404).send("Not found")}catch(r){return t.status(500).json({error:r})}},M=async(e,t)=>{try{let r={userId:e.params.userId},o=await a.find(r);return t.status(200).json(o)}catch(r){return t.status(500).json({error:r})}},A=async(e,t)=>{try{let r=await a.find();return t.status(200).json(r)}catch{return t.status(500).json({error:"err"})}},F=async(e,t)=>{try{if(N(e.body.url))return t.status(400).send({msg:"Link invalido :("});let r=L(),o=e.body.url,s=`https://url-shortener-41u7.vercel.app/${r}`,n=e.body.userId?e.body.userId:"";return await ee(o,s,r,n),t.status(200).send({shortUrl:s})}catch{return t.status(500).send({msg:"Ocorreu um erro, tente novamente"})}},T=async(e,t)=>{try{let r=e.params.userId,o=e.params.urlId,s=await a.find({_id:o});if(s){if(r!==s[0].userId)return t.status(500).json({error:"sem permiss\xE3o"});await a.deleteOne({_id:o});let n=await a.find({userId:r});return t.status(200).json(n)}}catch{return t.status(500).json({error:"url n\xE3o encontrada"})}};function _(e){e.get("/urlGetAll",A),e.get("/:shortUrlId",O),e.get("/urlUser/:userId",M),e.post("/url",F),e.delete("/deleteUrl/:userId/:urlId",T)}var B=u(require("jsonwebtoken"));var z=async(e,t)=>{try{let r=String(e?.headers?.token||"");if(r)B.default.verify(r,"admin",async(o,s)=>o?t.status(403).json({message:o.message,error:o}):await i.findOne({_id:s?.sub})?(e.headers.user=s?.sub,t.status(200).json({sucess:!0})):t.status(403).json({messagem:"forBidden"}));else return t.status(401).json({messagem:"Unauthorized"})}catch{return t.status(500).json({sucess:!1})}};function K(e){e.post("/checkerToken",z)}var f=(0,C.Router)();function P(){return q(f),_(f),K(f),f}var c=(0,U.default)();c.use((0,G.default)());c.use(U.default.json());c.use(h.default.urlencoded({extended:!0}));c.use(h.default.json());c.use(P());D.default.connect("mongodb+srv://admin:1234@urlgenerator.db68ucz.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("mongoDB conection is working"),c.listen(9002)}).catch(e=>console.log(e,"deu erro :( "));0&&(module.exports={app});
