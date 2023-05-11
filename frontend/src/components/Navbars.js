import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { Link } from "react-router-dom";

const Navbars = () => {
  const userInfo = useSelector((state) => state?.userLogin?.userInfo);

  const dispatch = useDispatch();

  return (
<Navbar className="bg-gray-500 text-white py-3 lg:px-20 xl:px-40 font-sans" expand="lg">
  <Container className="flex justify-between items-center">
    <Link to="/">
      <Navbar.Brand className="text-white font-bold text-2xl lg:text-4xl">
        Woxro
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto text-lg lg:text-xl">
        <Link to={"/"} className="text-white mx-3 my-2 lg:my-0 lg:mx-8 hover:text-gray-400">
          Home
        </Link>

        <Link to={"/deposit"} className="text-white mx-3 my-2 lg:my-0 lg:mx-8 hover:text-gray-400">
          Deposit
        </Link>

        <Link to={"/withdrawmoney"} className="text-white mx-3 my-2 lg:my-0 lg:mx-8 hover:text-gray-400">
          Withdraw
        </Link>

        <Link to={"/transfermoney"} className="text-white mx-3 my-2 lg:my-0 lg:mx-8 hover:text-gray-400">
          Transfer
        </Link>

        <Link to={"/statement"} className="text-white mx-3 my-2 lg:my-0 lg:mx-8 hover:text-gray-400">
          Statement
        </Link>

        {userInfo?.name ? (
          <NavDropdown className=" bg-green-200 p-0 mx-2 my-2 lg:my-0 lg:mx-8" title={userInfo?.name} id="basic-nav-dropdown">
            <Link to="/login">
              <NavDropdown.Item className="bg-red-200" onClick={() => dispatch(logout())}>
                Logout
              </NavDropdown.Item>
            </Link>
          </NavDropdown>
        ) : (
          <NavDropdown className="text-white bg-blue-200 mx-3 my-2 lg:my-0 lg:mx-8" title={'Login'} id="basic-nav-dropdown">
            <Link to="/login">
              <NavDropdown.Item>
                Login
              </NavDropdown.Item>
            </Link>
            <Link to="/register">
              <NavDropdown.Item>
                Register
              </NavDropdown.Item>
            </Link>
          </NavDropdown>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default Navbars;
