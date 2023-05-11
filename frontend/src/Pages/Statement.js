import React, { useEffect, useState } from 'react'
import Navbars from '../components/Navbars'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, showLoading } from '../Redux/Actions/generalActions';
import Shimmer from '../components/Shimmer/Shimmer';


const Statement = () => {

const [statements,setStatements]=useState([])
const dispatch=useDispatch()
    
  const userId = localStorage.getItem("BankUser")
  ? JSON.parse(localStorage.getItem("BankUser"))
  : "";

  const {loading}=useSelector((state)=>state.general)

 let USERID=userId._id

    useEffect(()=>{

        getUserStatements()

    },[])


    
    const [activePage, setActivePage] = useState(1);
        
        const itemsPerPage = 5; 
        const totalItems = 15;         
        const startIndex = (activePage - 1) * itemsPerPage; 
        const endIndex = startIndex + itemsPerPage; 
        
       
        const data = Array.from({ length: totalItems }, (_, index) => ({
          id: index + 1,
          text: `Table cell ${index}`,
        }));
        
      
        const pageData = data.slice(startIndex, endIndex);
        
       
        const totalPages = Math.ceil(totalItems / itemsPerPage);
       
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
          paginationItems.push(
            <Pagination.Item key={i} active={i === activePage} onClick={() => setActivePage(i)}>
              {i}
            </Pagination.Item>
          );
        }

    


    const getUserStatements=async()=>{

        try {


            
     
             dispatch(showLoading())
            const { data } = await axios.post(
                "http://localhost:5000/api/user/statements",
                {USERID},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
                  },
                }
              );
              
             dispatch(HideLoading())
          
            if (data.success) {
              toast.success(data.message)
              setStatements(data.statements)
              
            
              
            
            } else {
            
              toast.error(data.message)
            }
      
          } catch (error) {
            
            console.log(error)
            toast.error("Something went wrong")
          }
    }


  return (

    loading ? <Shimmer/> :
    <div>
      <Navbars/>
  
      {statements.length > 0 ? (
        <div className="container mx-auto mt-24 bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200 text-gray-700 border-b border-gray-300">
                <th className="w-1/12 py-4 px-6 text-left font-bold">#</th>
                <th className="w-3/12 py-4 px-6 text-left font-bold">Date & Time</th>
                <th className="w-2/12 py-4 px-6 text-left font-bold">Amount</th>
                <th className="w-2/12 py-4 px-6 text-left font-bold">Type</th>
                <th className="w-3/12 py-4 px-6 text-left font-bold">Details</th>
                <th className="w-1/12 py-4 px-6 text-left font-bold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((item,idx) => (
                <tr key={idx} className="text-gray-700 border-b border-gray-300">
                  <td className="py-4 px-6">{idx+1}</td>
                  <td className="py-4 px-6">{item.dateTime}</td>
                  <td className="py-4 px-6">{item.amount}</td>
                  <td className="py-4 px-6">{item.type}</td>
                  <td className="py-4 px-6">
                    {item.Details === 'Deposit' ? (
                      <span className='text-green-600'>{item.Details}</span>
                    ) : item.Details === 'Withdraw' ? (
                      <span className='text-red-500'>{item.Details}</span>
                    ) : (
                      <span className='text-blue-800'>{item.Details}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">{item.Balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="flex justify-center items-center p-4">
            <Pagination className="mt-2">{paginationItems}</Pagination>
          </div>
        </div>
      ) :
      <h1 className="text-center font-bold text-5xl mt-36">No Transaction Done</h1>}
    </div>
  
  )
}

export default Statement




