import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ILogIn } from "./ILogIn";
import api from "../AuthApi";

const LogIn = () => {
  const navigate = useNavigate();

  const LogInURL = "https://localhost:7008/api/Account/LogIn"; //"api.post("/api/BusRequest", FormValues)"

  const [FormValues, setFormValues] = useState<ILogIn>({
    userName: "",
    password: "",
  });

  const HandleFormChange = (e: any) => {
    setFormValues({ ...FormValues, [e.target.name]: e.target.value });
  };

  const SubmitLogIn = async (e: any) => {
    e.preventDefault();

    const resP = await api.post(LogInURL, FormValues);
    const result = resP.data;

    localStorage.setItem("Token", result.data.token);
    console.log(result.data.token);
    navigate("/home");
  };

  return (
    <div id='login'>
      <h3 className='text-center text-white pt-5'>Login form</h3>
      <div className='container'>
        <div
          id='login-row'
          className='row justify-content-center align-items-center'
        >
          <div id='login-column' className='col-md-6'>
            <div id='login-box' className='col-md-12'>
              <form
                id='login-form'
                className='form'
                onSubmit={SubmitLogIn}
                action=''
              >
                {/* <h3 className='text-center text-info'>Login</h3> */}
                <div className='form-group'>
                  <label htmlFor='UserName' className='text-info'>
                    Username:
                  </label>
                  <input
                    type='text'
                    name='UserName'
                    id='UserName'
                    onChange={(e) => HandleFormChange(e)}
                    className='form-control'
                    autoComplete='off'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='Password' className='text-info'>
                    Password:
                  </label>
                  <input
                    type='Password'
                    name='Password'
                    id='Password'
                    onChange={(e) => HandleFormChange(e)}
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  {/* <label className='text-info'>
                    <span>Remember me</span> 
                    <span>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                      />
                    </span>
                  </label> */}

                  <input
                    type='submit'
                    name='submit'
                    className='btn btn-info btn-md'
                    value='submit'
                  />
                </div>
                <div id='register-link' className='text-right'>
                  {/* <a href='#' className='text-info'>
                    Register here
                  </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
