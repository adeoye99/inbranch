import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Webcam from "react-webcam";

export default function Selfie({ showTerm, handleClose, SubmitSelfie }) {
  const [imageSrc, setImageSrc] = useState(null);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const videoConstraints = {
    width: 280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      {/* <Button variant="primary" onCpck={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={showTerm}
        onHide={handleClose}
        style={{ height: "90vh", margin: "20px" }}
      >
        <Modal.Header closeButton style={{ justifyContent: "center" }}>
          <Modal.Title style={{ color: "#efb331" }}>Take Selfie</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <div>
            <Webcam
              audio={false}
              height={120}
              screenshotFormat="image/jpeg"
              width={280}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Button
                  variant="primary"
                  onClick={() => {
                    // const imageSrc = getScreenshot();
                    // console.log(imageSrc);
                    setImageSrc(getScreenshot());
                  }}
                  style={{
                    backgroundColor: "green",
                    width: "30%",
                    height: "50px",
                  }}
                >
                  Capture
                </Button>
              )}
            </Webcam>
          </div>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "red",
              width: "30%",
              height: "50px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => SubmitSelfie(imageSrc)}
            style={{
              backgroundColor: "green",
              width: "30%",
              height: "50px",
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Terms />);
