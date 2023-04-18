import React, {useState} from 'react'
import axios from "axios";
import { URL } from "../config";
import {useNavigate} from 'react-router-dom'
import * as jose from 'jose'

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
          setMessage(response.message.message);
          if (response.message.ok) { 
            let decodedToken = jose.decodeJwt(response.data.token)
            console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
            setTimeout(() => {
              props.login(response.message.token);
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="form_container"
        >
        <label>Email</label>
        <input name="email" />
        <label>Password</label>
        <input name="password" />
        <button>login</button>
        <div className="message">
        <h4>{message}</h4>
        </div>
        </form>
  )
}

export default LoginCust