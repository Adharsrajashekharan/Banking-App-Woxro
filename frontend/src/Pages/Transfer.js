
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


const Transfer = () => {

    const [transferAmount, setTransferAmount] = useState("");
    const [email,setEmail]=useState('')
    const dispatch=useDispatch()

    const {loading}=useSelector((state)=>state.general)
    const userInfo = useSelector((state) => state?.userLogin?.userInfo._id);
    console.log("manh", userInfo);
  
    const submitHandler = (e) => {
      e.preventDefault();
      submitTransfer();
    };


    const submitTransfer = async () => {

        

        try {
            dispatch(showLoading())
          const { data } = await axios.post(
            "http://localhost:5000/api/user/transfer",
            {transferAmount, userInfo,email },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
              },
            }
          );

          dispatch(HideLoading())
    
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

      

      return (
        loading ? <Shimmer /> :
          <div className="bg-gray-100 min-h-screen">
            <Navbars />
    
            <Container className="py-8">
              <div className="max-w-lg mx-auto">
                <Card className="border-0 shadow-md rounded-lg">
                  <Card.Header className="bg-gray-200 text-black text-center py-4">
                    <h2 className="text-3xl font-bold">Transfer Money</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={submitHandler}>
    
                      <h3 className="font-bold text-xl pb-2">Email Address</h3>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
    
                      <h3 className="font-bold text-xl pb-2">Amount</h3>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="number"
                          placeholder="Enter Amount"
                          className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          required
                        />
                      </Form.Group>
    
                      <Button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
                        type="submit"
                      >
                        Transfer
                      </Button>
    
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          </div>
      );
}

export default Transfer




 







