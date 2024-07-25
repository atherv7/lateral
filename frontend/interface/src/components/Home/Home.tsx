import './Home.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Home:React.FC = () => {
  const navigate = useNavigate(); 

  const [usernameLogin, changeUsernameLogin] = useState<string>(''); 
  const [passwordLogin, changePasswordLogin] = useState<string>(''); 
  const [usernameRegister, changeUsernameRegister] = useState<string>(''); 
  const [passwordRegister, changePasswordRegister] = useState<string>(''); 

  const submitUser =  async(newUser:boolean) => {
    let success = false; 
    if(newUser) {
      const response = await window.api.register([usernameRegister, passwordRegister]); 
      success = response.success; 
    }
    else {
      const response = await window.api.login([usernameLogin, passwordLogin]); 
      success = response.success; 
    }

    if (success) {
      navigate('/main'); 
    }
    else {
      alert('enterance failed'); 
    }
  };
  return (
      <div id='homepage'>
        <div id='login_option_holder'>
          <h1>join us</h1>
          <div id='form_holder_login'>
            <form id='register_form' onSubmit={() => submitUser(true)}>
              <input type="text" 
                      name="username_reg" 
                      id="username_input_reg" 
                      placeholder='username' 
                      onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                        changeUsernameRegister(event.target.value);
                      }}
                required/>
                <input type="text"
                       name="password_reg"
                       placeholder="password"
                       onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                        changePasswordRegister(event.target.value); 
                       }}
                 required/>
              <input type="submit" value="register" />
            </form>
            <hr/>
            <form id='login_form' onSubmit={() => submitUser(false)}>
              <input type="text" 
                      name="username" 
                      id="username_input" 
                      placeholder='username'
                      onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                      changeUsernameLogin(event.target.value); 
                      }}
                required/>
              <input type="text" 
                      name="password" 
                      id="password_input" 
                      placeholder='password'
                      onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                      changePasswordLogin(event.target.value); 
                      }}
                      required/>
              <input type="submit" value="login" />
            </form>
          </div>
        </div>
      </div>
  );
};

export default Home;
