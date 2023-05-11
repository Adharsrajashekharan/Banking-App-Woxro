import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/userActions';
import { HideLoading, showLoading } from '../Redux/Actions/generalActions';
import Shimmer from '../components/Shimmer/Shimmer';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.general);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:5000/api/user/login', values);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirecting to home page');

        dispatch(login(response.data.user));
        localStorage.setItem('BankUserId', JSON.stringify(response.data.data));
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-5xl text-center font-bold text-orange-300">Woxro</h1>
              <h2 className="text-center text-2xl font-bold text-gray-600">Login</h2>
            </div>
            <Form onFinish={onFinish}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="py-4">
                  <Form.Item label="Email" name="email">
                    <Input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="py-4">
                  <Form.Item label="Password" name="password">
                    <Input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Password" type="password" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Button type="primary" htmlType="submit" className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
                  Log In
                </Button>
              </div>
              <div className="text-center mt-4">
                <Link to="/register" className="text-gray-600 font-bold hover:text-red-500">
                  Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
