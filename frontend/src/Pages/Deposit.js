import React, { useState } from "react";
import Navbars from "../components/Navbars";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";
import Shimmer from "../components/Shimmer/Shimmer";



const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState("");


  const dispatch=useDispatch()

  const userInfo=useSelector((state)=>state?.userLogin?.userInfo._id)
  console.log("manh",userInfo)

  const submitHandler = (e) => {
    e.preventDefault();
     submitDeposit()
  };

  const {loading}=useSelector((state)=>state.general)

  const submitDeposit= async()=>{

    try {

       dispatch(showLoading())

        const { data } = await axios.post(
            "http://localhost:5000/api/user/deposit",
            { depositAmount, userInfo },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
              },
            }
          );

          
          
          dispatch(HideLoading())
  
      
        if (data.success) {
          toast.success(data.message)
        
          
        
        } else {
        
          toast.error(data.message)
        }
  
      } catch (error) {
        
        console.log(error)
        toast.error("Something went wrong")
      }
  }
  

  return (
    <div>
      <Navbars />

      {loading ? (
        <Shimmer />
      ) : (
        <Container className="mx-auto mt-10">
          <div className="flex justify-center items-center">
            <Card className="w-full md:w-3/5 lg:w-2/5 rounded-lg shadow-lg">
              <Card.Header className="bg-gray-200 p-6 rounded-t-lg text-center">
                <h2 className="text-3xl font-bold">Deposit Money</h2>
              </Card.Header>
              <Card.Body className="p-6">
                <Card.Title className="text-2xl mb-6">
                  Enter Amount
                </Card.Title>

                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full rounded-lg py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                    />
                  </Form.Group>
                  <Button
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-200"
                    type="submit"
                  >
                    Deposit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Deposit;
