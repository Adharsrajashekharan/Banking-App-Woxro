import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer/Shimmer";
import { useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";


const Home = () => {
  const [userIds, setUserId] = useState("");
  const [userInfos,setUserInfos]=useState({})
  


  const userId = localStorage.getItem("BankUser")
    ? JSON.parse(localStorage.getItem("BankUser"))
    : "";

   let USERID=userId._id
   const dispatch=useDispatch()


   const {loading}=useSelector((state)=>state.general)

   useEffect(()=>{
      getUpdatedUserInfo()
   },[])


   const getUpdatedUserInfo=async()=>{


      dispatch(showLoading())
    const { data } = await axios.post(
        "http://localhost:5000/api/user/getuserinformation",
        {USERID},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
          },
        }
      );
      dispatch(HideLoading())
   

   if(data.success){

       setUserInfos(data.data)
   }

}


return (
  loading ? (
    <Shimmer />
  ) : (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full md:w-5/12 mt-20 px-4">
        <div className="bg-white shadow p-5 rounded-md">
          <h2 className="text-2xl font-bold text-center mb-5">Welcome, {userInfos?.name}!</h2>
          <ul>
            <li className="border-b border-gray-200 py-2 flex justify-between items-center">
              <span className="font-bold text-gray-700">YOUR ID:</span>
              <span className="text-gray-600 pl-3">{userInfos?.email}</span>
            </li>
            <li className="border-b border-gray-200 py-2 flex justify-between items-center">
              <span className="font-bold text-gray-700">YOUR BALANCE:</span>
              <span className="text-green-400 pl-3">{userInfos?.balance}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
);

  
};

export default Home;
