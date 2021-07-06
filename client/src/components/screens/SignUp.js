import { useState } from "react"
import M from 'materialize-css'
import { useHistory } from "react-router"
const SignUp = () => {
    const history=useHistory()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const postData=()=>{
        //validating email format
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return  M.toast({html: 'Invalid Email!',classes:'red lighten-1 rounded',displayLength:3000})
        }
        //if valid email then make request to server to sign up current user
        fetch('/user/sign-up',{
            method:'post',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,email,password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            //if any errors while sign up from client side i.e by user
            if(data.error){
                M.toast({html: data.error,classes:'red lighten-1 rounded',displayLength:3000})
            }
            //successful sign up
            else{
                M.toast({html:data.success,classes:'green lighten-1 rounded',displayLength:3000})
                history.push('/sign-in')
            }
           
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="signUp-container">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <div className="input-field">
                    <input id="name" type="text" onChange={(e)=>{setName(e.target.value)}} value={name}></input>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input id="email" type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn waves-effect waves-light  blue lighten-1" onClick={postData}>Sign Up</button>

            </div>
        </div>
    )
}

export default SignUp