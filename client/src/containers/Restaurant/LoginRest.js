import React, {useState} from 'react'
import axios from "axios";
import { URL } from "../../config";
import {useNavigate} from 'react-router-dom'
import * as jose from 'jose'
import torta from '../../images/torta.png'

function LoginRest(props) {
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
        e.target.reset()
        try {
          const response = await axios.post(`${URL}/restaurant/login`, {
            email: data.email.toLowerCase(),
            password: data.password,
          });
          setMessage(response.data.message);
          if (response.data.ok) { 
            let decodedToken = jose.decodeJwt(response.data.token)
            console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
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
        <section className='loginRest'>
          <img src={torta} alt="imagen de una torta"></img>
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="form_container"
          >
            <label>Email</label>
            <input name="email" />
            <label>Password</label>
            <input type='password' name="password" />
            <button>login</button>
            <div className="message">
            <h4>{message}</h4>
            </div>
          </form>
        </section>
        );
}

export default LoginRest