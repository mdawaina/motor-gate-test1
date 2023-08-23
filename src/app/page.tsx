"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { CompanyCards } from "./CompanyCards";
import { getUser } from "@/util/getUser";
import Cookies from "js-cookie";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("currentUser");
    window.location.href = "/login";
  };
  var user = getUser();
  return (
    <>
      <div className="col login-form">
        {/* <h5>Welcome to Motor Gate</h5> */}
        <h5>Welcome on MotorGate</h5>
        <Image
          className="center-image"
          src="/images/motor-gate-logo.png" // Route to the image file
          height={200} // Desired size in pixels
          width={200} // Desired size in pixels
          alt="Description for screen readers"
        />
        {!user && (
          <>
            {" "}
            <Link href="/login">Login</Link>
            <Link href="#" onClick={handleShow}>
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link href="/account/dashboard">Dashboard</Link>
            <Button variant="link" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Choose your registration type:</p>
            <Row>
              <Col>
                <Link href="/account/register/individual">
                  <Button variant="primary" onClick={handleClose}>
                    Register as Individual
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link href="/register" className="btn btn-pramiry">
                  <Button variant="primary">Register as Company</Button>
                </Link>
              </Col>

              <Col>
                <Link href="/register/customer" className="btn btn-pramiry">
                  <Button variant="primary">Register as customer</Button>
                </Link>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        {/* write html for card */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Motor Gate</h5>
            <p className="card-text">
              Motor Gate is a platform that allows you to manage your vehicles
              and their maintenance.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>

          {/*  <div className="card">
          <div className="card-body">
            <h5 className="card-title">Motor Gate</h5>
            <p className="card-text">
              Motor Gate is a platform that allows you to manage your vehicles
              and their maintenance.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div> */}
        </div>
        <CompanyCards />
      </div>
    </>
  );
}
