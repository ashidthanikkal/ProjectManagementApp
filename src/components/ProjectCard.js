import React, { useState } from 'react'
import './ProjectCard.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseurl } from '../services/baseUrl';
import { Col, Row } from 'react-bootstrap';


function ProjectCard({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='my-2' onClick={handleShow}>
        <figure className="snip1563 rounded">
          <img style={{ height: "15rem", width: "100%" }} src={`${baseurl}/uploads/${data.coverImg}`} alt="sample110" />
          <figcaption >
            <h3>{data.title}</h3>
          </figcaption>
        </figure>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div>
                <img style={{ width: "100%" }} src={`${baseurl}/uploads/${data.coverImg}`} alt="" />
              </div>
            </Col>
            <Col>
              <div>
                <h5>Project Description:</h5>
                <p>{data.description}</p>
              </div>
              <div>
                <h5>Technologies:</h5>
                <p>{data.technologies}</p>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
          <a href={data.gitHub}><i className="fa-brands fa-github fa-2x"></i></a>
          <a href={data.website}><i  className="fa-solid fa-link fa-2x"></i></a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard
