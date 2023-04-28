import React, {useState} from 'react'
import axios from "axios";
import { URL } from "../../config";
import {useNavigate} from 'react-router-dom'
import * as jose from 'jose'
import torta from '../../images/torta.png'
import candado from '../../images/candado.png'
import email from '../../images/email.png'

function LoginCust(props) {
    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate()
    
      const [ message, setMessage ] = useState('');
    
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
          const response = await axios.post(`${URL}/customer/login`, {
            email: data.email.toLowerCase(),
            password: data.password,
          });
          setMessage(response.data.message);
          
          if (response.data.ok) { 
          
            setTimeout(() => {
              props.login(response.data.token);
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <section className='loginCust'>
          <img src={torta} alt="imagen de una torta"></img>
        <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="form_container"
        >
        <section className='imgLoginCust'>
        <img src={email} alt='email logo'/>
        <label>Email</label>
        </section>
        <input name="email" />
        <section className='imgLoginCust'>
        <img src={candado} alt='password logo'/>
        <label>Password</label>
        </section>
        <input name="password" type='password'/>
        <button>Login</button>
        <div className="message">
        <h4>{message}</h4>
        </div>
        </form>
        </section>
  )
}

export default LoginCust