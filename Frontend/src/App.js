import "./App.css";
import { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";


const App = () => {
  //Read text from images
  const loadORC = (linkimage) => {
    Tesseract.recognize(linkimage, "kor", {
      logger: (m) => {},
    }).then(({ data: { text } }) => {
      setText(text);
    });
  };
  //read file 
  const readFilePdfDocs = (file) => {
    console.log(file)
    //  const reader = new FileReader();
    // //  reader.onload = async (file) => {
    // //    const text = file;
    // //    console.log(text);
    // //  };
    //  reader.readAsText(file);
    //  console.log(reader)
  };
  // update file
  const handlePreviewImage = (e) => {
    // get the selected file from the input
    const file = e.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("https://localhost:4444/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
		// handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
    // console.log(e.target.files[0])
    // const path=URL.createObjectURL(e.target.files[0])
    // console.log(path);
    // setFile(e.target.file[0])
    // const reader = new FileReader();
    // // Đọc thông tin tập tin đã được đăng tải
    // reader.readAsDataURL(e.target.files[0])
      
    // // Lắng nghe quá trình đọc tập tin hoàn thành
    // reader.addEventListener("load", (event) => {
    //   // Lấy chuỗi Binary thông tin hình ảnh
    //   const img = event.target.result;
      
    //   // Thực hiện hành động gì đó, có thể append chuỗi giá trị này vào thẻ IMG
    //   console.log(img) // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA........
    // })
    // const file = e.target.files[0];
    // if (file != null) {
    //    // 👇 Uploading the file using the fetch API to the server
    //   //
    //   console.log(file)
    //   file.preview = URL.createObjectURL(file);
    //   console.log(file.preview);
    //   console.log(file.type.toString().split("/"));
    //   if (file.type.toString().split("/")[0] == "image") {
    //     setImage(file.preview);
    //     loadORC(file.preview);
    //   } else {
    //     readFilePdfDocs(file.preview);
    //     console.log("else file");
    //   }
    // }
  };
  //Read text 
  const readTexttoSpeech=(textread)=>{
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "ko";
    speech.text=textread;
    window.speechSynthesis.speak(speech);
  }
  const [image, setImage] = useState("http://localhost:3000/test01.png");
  const [text, setText] = useState("Chưa có nội dung");
  const [files, setFile] = useState();
  return (
    <>
      <div style={{ display: "flex", marginTop: "10vh", padding: "0 10vw" }}>
        <div style={{ width: "40vw" }}>
          <input
            type="file"
            accept=".docx, .doc, .pdf, .png, .jpg, .jpeg"
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
        <button className="btn btn-primary" onClick={()=>readTexttoSpeech(text)}><i className="fa-solid fa-volume-high"></i></button>
      </div>
    </>
  );
};

export default App;
