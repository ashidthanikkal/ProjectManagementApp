import React, { useContext, useEffect, useState } from 'react'
import './Auth.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApis'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from '../services/AuthContext.js'

function Auth({ register }) {

  const {isAuth,setIsAuth}=useContext(tokenAuthContext)


  const navigate=useNavigate()
  const location = useLocation()


  //state to store from inputs

  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  //state to check validations

  const [validUname, setvalidUname] = useState(false)
  const [validEmail, setvalidEmail] = useState(false)
  const [validPassword, setvalidPassword] = useState(false)

  useEffect(()=>{
    setUserInputs({username:"",email:"",password:""})
    setvalidUname(false)
    setvalidEmail(false)
    setvalidPassword(false)
    console.log("hello");
  },[location.pathname])
  console.log(location.pathname);


  const setData = (e) => {
    const { name, value } = e.target
    if (name == "username") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setvalidUname(false)
        // setUserInputs({ ...userInputs, [name]: value })

      }
      else {
        setvalidUname(true)
      }
    }
    //valid email
    if (name == "email") {
      if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        setvalidEmail(false)
        // setUserInputs({ ...userInputs, [name]: value })
      }
      else {
        setvalidEmail(true)
      }
    }

    //valid password
    if (name == "password") {
      if (value.match(/^[a-zA-Z0-9]/)) {
        setvalidPassword(false)
        // setUserInputs({ ...userInputs, [name]: value })
      }
      else {
        setvalidPassword(true)
      }
    }
    setUserInputs({ ...userInputs, [name]: value })
  }
  // console.log(userInputs);

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userInputs
    if (!username || !email || !password) {
      alert('please fill all datas')
    }
    else {
      const result = await registerApi(userInputs)
      console.log(result);
      if(result.status>=200 && result.status<=300){
        toast.success(result.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        setUserInputs({username:"",email:"",password:""})
        navigate('/authentication')
      }
      else{
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        setUserInputs({ ...userInputs,username:"",email:"",password:""})
        navigate('/authentication')
      }

    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userInputs
    if (!email || !password) {
      alert('please fill all datas')
    }
    else {
      const result = await loginApi(userInputs)
      if(result.status>=200 && result.status<=300){
        console.log(result);
        //if login success thenstore username and id in local storage
        localStorage.setItem("currentUser",result.data.user.username)
        localStorage.setItem("userId",result.data.user._id)
        localStorage.setItem("token",result.data.token)
        localStorage.setItem("user",JSON.stringify(result.data.user))
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        setUserInputs({username:"",email:"",password:""})
        navigate('/')
        setIsAuth(true)

      }
      else{
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        setUserInputs({ ...userInputs,username:"",email:"",password:""})
      }

    }

  }



console.log(userInputs);
  return (
    <div className='auth'>
      <Container className='w-100'>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col lg={6}>
            <div className='hero_img d-flex justify-content-center align-items-center'>

              {
                register ?
                  <img src="https://i.postimg.cc/KYXnX1dw/Sign-up-amico.png"
                    alt=""
                    style={{ width: "90%", height: "90%" }}
                  />
                  :
                  <img src="https://i.postimg.cc/PJk786c4/Secure-login-amico.png"
                    alt=""
                    style={{ width: "90%", height: "90%" }}
                  />
              }

            </div>

          </Col >

          <Col lg={6} className='d-flex flex-column justify-content-center align-items-center'>

            {/* ************************** */}
            <div className="container" >
              <div className="screen">
                <div className="screen__content">

                  <form className="login">
                    {
                      register &&
                      <>
                        <div className="login__field">
                        <i className="login__icon fas fa-user "></i>
                        <input value={userInputs.username} type="text" className="login__input" onChange={(e) => setData(e)} placeholder="User name" name='username' />
              
                      </div>
                      {
                      validUname &&
                        <p className='text-danger m-0'>special characters are not allowd</p>
                      }
                      </>
                    }

                    
                      
                      <div className="login__field">
                        <i className="login__icon fa-solid fa-envelope"></i>
                        <input value={userInputs.email}  type="text" className="login__input" onChange={(e) => setData(e)} placeholder="Email" name='email' />
                        {
                        validEmail &&
                        <p className='text-danger m-0'>please enter valid email</p>
                        }
                      </div>
                      
                      

                    
                    <div className="login__field">
                      <i className="login__icon fas fa-lock"></i>
                      <input value={userInputs.password}  type="password" className='login__input' onChange={(e) => setData(e)} placeholder='Password' name='password' />
                    </div>
                    {
                      validPassword &&
                      <p className='text-danger m-0'>please enter valid password</p>
                    }

                   { 
                   register ?
                    <button className="button login__submit" onClick={(e)=>handleRegister(e)}>
                      <span className="button__text">Sign Up</span>
                      <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                    :
                    <button className="button login__submit" onClick={(e)=>handleLogin(e)}>
                      <span className="button__text">Sign In</span>
                      <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                    }


                  </form>
                  <div className="social-login">

                    <h6>{register ? "Already registerd ?" : "New User ?"}</h6>
                    {
                      register ?
                        <Link to={'/authentication'}><span>Login Here</span></Link>
                        :
                        <Link to={'/register'}><span>Sign Up Here</span></Link>

                    }

                    <div className="social-icons">
                      <a href="#" className="social-login__icon fab fa-instagram"></a>
                      <a href="#" className="social-login__icon fab fa-facebook"></a>
                      <a href="#" className="social-login__icon fab fa-twitter"></a>
                    </div>
                  </div>
                </div>
                <div className="screen__background">
                  <span className="screen__background__shape screen__background__shape4"></span>
                  <span className="screen__background__shape screen__background__shape3"></span>
                  <span className="screen__background__shape screen__background__shape2"></span>
                  <span className="screen__background__shape screen__background__shape1"></span>
                </div>
              </div>
            </div>

            {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
          </Col>
        </Row>

      </Container>
      <ToastContainer />
    </div>
  )
}

export default Auth
