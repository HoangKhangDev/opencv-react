import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Tesseract from "tesseract.js";

const App = () => {
  const loadORC = (linkimage) => {
    Tesseract.recognize(linkimage, "eng", {
      logger: (m) => {},
      //  console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
    });
  };
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file != null) {
      file.preview = URL.createObjectURL(file);
      setImage(file.preview);
      loadORC(file.preview);
    }
  };
  const [image, setImage] = useState("http://localhost:3000/test01.png");
  const [text, setText] = useState("Chưa có nội dung");
  return (
    <>
      <div style={{ display: "flex", marginTop: "10vh", padding: "0 10vw" }}>
        <div style={{ width: "40vw" }}>
          <input
            type="file"
            onChange={handlePreviewImage}
            style={{
              position: "absolute",
              width: "40vw",
              height: "45vw",
              opacity: " 0",
            }}
          />
          <div>
            <img src={image} style={{ width: "40vw", height: "auto" }} />
            <p
              style={{
                width: "40vw",
                backgroundColor: "rgb(255 108 13)",
                textAlign: "center",
                margin: "0",
                fontWeight: "900",
                color: "white",
                padding: "10px 0",
              }}
            >
              Change Image
            </p>
          </div>
        </div>
        <div style={{ width: "40vw",padding:"10px" }}>
          <h1 style={{width:"40vw",backgroundColor:"cyan",color:"orange",textAlign:"center",margin:"0",padding:"0"}}>Nội Dung Từ Hình Ảnh</h1>
          <pre style={{backgroundColor:"GrayText" ,margin:"0",fontSize:"15px",fontFamily:"fantasy",padding:"10px",color:"white"}}>{text}</pre>
        </div>
      </div>
    </>
  );
};

export default App;
