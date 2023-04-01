import N from"express";import $ from"mongoose";import E from"cors";import L from"body-parser";import{Router as W}from"express";import{model as O,Schema as M}from"mongoose";var A=new M({email:String,password:String}),u=O("Users",A);import l from"bcryptjs";import F from"jsonwebtoken";function m(e){return F.sign(e,"admin",{expiresIn:"1d"})}var p=async(e,t)=>{try{let r=await u.find();return t.status(200).json(r)}catch(r){return t.status(500).json({error:r})}},f=async(e,t,r)=>{let{email:o,password:s}=e.body;try{if(await u.findOne({email:o}))throw"user already exists";let c=l.hashSync(s,8);return await u.create({email:o,password:c}),t.status(201).json({message:"Person added!"})}catch(n){return t.status(500).json({error:n})}},g=async(e,t)=>{let{email:r,password:o}=e.body;try{let s=await u.findOne({email:r});if(!s)throw"email of user is not correct";if(!l.compareSync(o,s.password))throw"password of user is not correct";let c=m({sub:s._id,email:s.email});return t.status(201).send({person:s,token:c})}catch(s){return t.status(500).json({error:s})}};import T from"jsonwebtoken";var _=async(e,t,r)=>{let o=String(e?.headers?.token||"");if(o)T.verify(o,"admin",async(s,n)=>{if(s)return t.status(403).json({message:s.message,error:s});if(!await u.findOne({_id:n?.sub}))return t.status(403).json({messagem:"forBidden"});e.headers.user=n?.sub,r()});else return t.status(401).json({messagem:"Unauthorized"})},U=_;function h(e){e.get("/user",p),e.post("/user",f),e.post("/session",g),e.post("/token",U)}import{model as B,Schema as z}from"mongoose";var K=new z({longURL:{type:String,required:!0},shortURL:{type:String,required:!0},shortUrlId:{type:String,required:!0,unique:!0},userId:{type:String,required:!1,default:""},visits:{type:Number,required:!1,default:0}}),i=B("urls",K);import C from"validate.js";import P from"shortid";var R=(e="")=>C({website:e},{website:{url:{allowLocal:!0}}}),y=()=>P.generate();var D=(e,t,r,o)=>{i.create({longURL:e,shortURL:t,shortUrlId:r,userId:o})},w=async(e,t)=>{try{let r=await i.findOne({shortUrlId:e.params.shortUrlId});return r&&await i.findOneAndUpdate({shortUrlId:r.shortUrlId},{visits:Number(r.visits)+1}),r?t.redirect(302,r.longURL):t.status(404).send("Not found")}catch(r){return t.status(500).json({error:r})}},j=async(e,t)=>{try{let r={userId:e.params.userId},o=await i.find(r);return t.status(200).json(o)}catch(r){return t.status(500).json({error:r})}},x=async(e,t)=>{try{let r=await i.find();return t.status(200).json(r)}catch{return t.status(500).json({error:"err"})}},I=async(e,t)=>{try{if(R(e.body.url))return t.status(400).send({msg:"Link invalido :("});let r=y(),o=e.body.url,s=`http://localhost:9002/${r}`,n=e.body.userId?e.body.userId:"";return await D(o,s,r,n),t.status(200).send({shortUrl:s})}catch{return t.status(500).send({msg:"Ocorreu um erro, tente novamente"})}},b=async(e,t)=>{try{let r=e.params.userId,o=e.params.urlId,s=await i.find({_id:o});if(s){if(r!==s[0].userId)return t.status(500).json({error:"sem permiss\xE3o"});await i.deleteOne({_id:o});let n=await i.find({userId:r});return t.status(200).json(n)}}catch{return t.status(500).json({error:"url n\xE3o encontrada"})}};function k(e){e.get("/urlGetAll",x),e.get("/:shortUrlId",w),e.get("/urlUser/:userId",j),e.post("/url",I),e.delete("/deleteUrl/:userId/:urlId",b)}import G from"jsonwebtoken";var q=async(e,t)=>{try{let r=String(e?.headers?.token||"");if(r)G.verify(r,"admin",async(o,s)=>o?t.status(403).json({message:o.message,error:o}):await u.findOne({_id:s?.sub})?(e.headers.user=s?.sub,t.status(200).json({sucess:!0})):t.status(403).json({messagem:"forBidden"}));else return t.status(401).json({messagem:"Unauthorized"})}catch{return t.status(500).json({sucess:!1})}};function v(e){e.post("/checkerToken",q)}var d=W();function S(){return h(d),k(d),v(d),d}var a=N();a.use(E());a.use(N.json());a.use(L.urlencoded({extended:!0}));a.use(L.json());a.use(S());$.connect("mongodb+srv://admin:1234@urlgenerator.db68ucz.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("mongoDB conection is working"),a.listen(9002)}).catch(e=>console.log(e,"deu erro :( "));export{a as app};
