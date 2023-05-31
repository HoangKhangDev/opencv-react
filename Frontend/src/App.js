import "./App.css";
import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";


const App = () => {
  const msg = new SpeechSynthesisUtterance();

  //Read text from images
  const loadORC = (linkimage) => {
    Tesseract.recognize(linkimage, languageorc, {
      logger: (m) => {},
    }).then(({ data: { text } }) => {
      setText(text);
    });
  };
  //read file
  const readFilePdfDocs = (file) => {
    console.log(file);
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
    const file = e.target.files[0];
    console.log(file);
    file.preview = URL.createObjectURL(file);
    console.log(file.preview);
    console.log(file.type.toString().split("/"));
    if (file.type.toString().split("/")[0] == "image") {
      setImage(file.preview);
      loadORC(file.preview);
    } else {
      readFilePdfDocs(file.preview);
      console.log("else file");
    }
  };

  //Read text
  const readTexttoSpeech = (textread) => {
    msg.lang = languagespeech;
    msg.text = textread;
    window.speechSynthesis.speak(msg);
  };
  //set language
  const setLanguage = (language) => {
    if (language == "eng") {
      setLanguageorc("eng");
      setLanguagespeech("en-US");
    } else if (language == "korea") {
      setLanguageorc("kor");
      setLanguagespeech("ko-KR");
    }
    else if (language == "vietnam"){
      setLanguageorc("vie");
      setLanguagespeech("vi");
    }
  };

  const [image, setImage] = useState("http://localhost:3000/test01.png");
  const [text, setText] = useState("Chưa có nội dung");
  const [languageorc, setLanguageorc] = useState("eng");
  const [languagespeech, setLanguagespeech] = useState("en-US");

  const [files, setFile] = useState();
  useEffect(() => {
    console.log(languagespeech);
    console.log(languageorc)
  }, [languagespeech]);
  // useEffect(() => {
  //   msg.text = text;
  //   window.speechSynthesis.speak(msg);
  // }, [text]);
  return (
    <>
      <div>
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="eng">English</option>
          <option value="korea">Korean</option>
          <option value="vietnam">VietNam</option>
        </select>
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
          <div style={{ width: "40vw", padding: "10px" }}>
            <h1
              style={{
                width: "40vw",
                backgroundColor: "cyan",
                color: "orange",
                textAlign: "center",
                margin: "0",
                padding: "0",
              }}
            >
              Nhap Text vao day de doc
            </h1>
            <textarea
              onClick={() => setText("")}
              onChange={(val) => {
                setText(val.target.value);
              }}
              style={{
                backgroundColor: "GrayText",
                margin: "0",
                fontSize: "15px",
                // fontFamily: "fantasy",
                padding: "10px",
                color: "white",
              }}
              name="textarial"
              id=""
              cols="80"
              rows="10"
              value={text}
            >
              {text}
            </textarea>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "10vh", padding: "0 10vw" }}>
        {" "}
      </div>
      <div style={{ display: "flex", marginTop: "10vh", padding: "0 10vw" }}>
        <button
          className="btn btn-primary"
          onClick={() => readTexttoSpeech(text)}
        >
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <div style={{ width: "80vw", padding: "10px" }}>
          <h1
            style={{
              width: "100%",
              backgroundColor: "cyan",
              color: "orange",
              textAlign: "center",
              margin: "0",
              padding: "0",
            }}
          >
            Nội Dung Từ Hình Ảnh
          </h1>
          <pre
            style={{
              backgroundColor: "GrayText",
              margin: "0",
              fontSize: "15px",
              fontFamily: "fantasy",
              padding: "10px",
              color: "white",
            }}
          >
            {text}
          </pre>
        </div>
      </div>
    </>
  );
};

export default App;
