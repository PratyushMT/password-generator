import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const generator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (number) str += "0123456789";
    if (characters) str += "!@#$&*{}[]-_?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, characters, setPassword]);


  useEffect(() => {
    generator();
  }, [length, number, characters, generator]);

  const pwdRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);

    setShowAlert(true);
  }, [password]);

  const handleModalClick = (e) =>{
    if(!e.target.closest('.message-content')){
      setShowAlert(false)
    }
  } 

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-max font-mono mx-auto my-9 shadow-md rounded-lg px-4 py-3 text-emerald-500 bg-gray-800 ">
        <h1 className="font-semibold text-3xl text-center text-white my-3">
          PASSWORD GENERATOR
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input
            type={hidePassword ? "password" : "text"}
            value={password}
            className="bg-gray-200 outline-none w-full py-1 px-3"
            placeholder="PASSWORD"
            readOnly
            ref={pwdRef}
          />
          <button
            onClick={copyToClipboard}
            id="copyButton"
            className="outline-none bg-green-600 text-white px-3 py-0.5 shrink-0 transition duration-200 ease-in-out hover:bg-green-700 active:bg-green-800"
          >
            COPY
          </button>
          {showAlert && (
            <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center bg-black bg-opacity-50"
            onClick={handleModalClick}>
              <div className="message-content bg-gray-200 p-4 mt-5 rounded shadow flex flex-col">
                <p className="text-red-500">COPIED TO CLIPBOARD!</p>
                <button className=" shadow-sm mt-4 self-end bg-blue-500 outline-none text-white rounded-lg px-3 py-0.5 transition duration-150 ease-in-out hover:bg-blue-600 active:bg-blue-700" onClick={() => setShowAlert(false)}>OK</button>
              </div>
            </div>
          )}
          <button
            onClick={generator}
            className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            REFRESH
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="text-red-300 flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={24}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>LENGTH: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={(e) => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="charInput "
              onChange={(e) => {
                setCharacters((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={setHidePassword}
              id="showpwd"
              onChange={(e) => {
                setHidePassword((prev) => !prev);
              }}
            />
            <label htmlFor="showpwd">Hide Password</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;