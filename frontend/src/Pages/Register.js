import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {register} from '../Redux/Actions/userActions'
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";
import Shimmer from "../components/Shimmer/Shimmer";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch=useDispatch()
  const navigate=useNavigate()


  const {loading}=useSelector((state)=>state.general)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    console.log(confirmPassword);
    if (password !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const onFinish = async (values) => {

    console.log('man',values);

    try {

      if (password !== confirmPassword) {
        toast("passwords do not match")
        console.log(confirmPassword);
        return
      }
      else {
      
         dispatch(showLoading())
          const response =await axios.post('http://localhost:5000/api/user/register', values)
          console.log('1244',response)
      
          dispatch(HideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to login page")
             dispatch(register(response.data.user))
            navigate("/login")
          } else {
            toast.error(response.data.message)
          }
        

      }
    }
    catch (error) {
      toast.error("something went wrong")
    }


  };

  return (
    loading ? <Shimmer/> :
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center text-orange-300 mb-10">WOXRO</h1>
        <h2 className="text-2xl font-bold text-center mb-5">Register Here</h2>
        <div className="bg-gray-100 rounded-lg shadow-md p-8">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your username" },
                {
                  pattern: /^[a-zA-Z0-9_]{3,16}$/,
                  message:
                    "Your username should be between 3 and 16 characters and only contain letters, numbers, and underscores",
                },
              ]}
            >
              <Input className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md" placeholder="Name" />
            </Form.Item>
  
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email address" },
                { required: true, message: "Please enter your email address" },
              ]}
            >
              <Input className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md" placeholder="Email" />
            </Form.Item>
  
            <Form.Item label="Password" name="password">
              <Input
                className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
            </Form.Item>
  
            <Form.Item label="Confirm Password" name="cpassword">
              <Input
                className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                type="password"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </Form.Item>
  
            <Button className=" bg-red-400 text-white text-center font-bold p-3 py-2 px-4 rounded mt-3 mb-3 hover:bg-indigo-700 transition-colors duration-300" htmlType="submit">
              REGISTER
            </Button>
  
            <div className="text-center">
              <span className="mr-1">Already have an account?</span>
              <Link to="/login" className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300">Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
  
  
};

export default Register;
