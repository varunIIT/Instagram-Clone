import M from 'materialize-css'
import { useHistory } from "react-router"
import { UserContext } from '../../App'
import GoogleLogin from 'react-google-login'
import { useContext, useState } from "react"

const SignUp = () => {
    const { state, dispatch } = useContext(UserContext)
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
    const responseSuccessGoogle = async (response) => {
        try {
            //console.log(response)
            const res = await fetch('/user/google-auth', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: response.tokenId
                })
            })

            //save to localstorage
            const data = await res.json()
            console.log(data)
            //storing jwt token and user's credentials to localstorage
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, email: data.email, profilePic: data.profilePic }))
            //making a state of this user
            dispatch({ type: 'USER', payload: { _id: data._id, name: data.name, email: data.email, profilePic: data.profilePic } })
            //toast message display
            M.toast({ html: 'Signed In successfully!', classes: 'green lighten-1 rounded', displayLength: 3000 })
            history.push('/')
        }
        catch (err) {
            console.log(err)
        }

    }
    const responseErrorGoogle = () => {

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
                <div className="input-field">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </div>
        </div>
    )
}

export default SignUp