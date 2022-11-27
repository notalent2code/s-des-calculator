import { useState } from "react";
import "./App.css";
import { generateKey, calculateSDES } from "./utils/HelperFunctions";
import { validateInputText, validateMasterKey } from "./utils/ValidateInput";
import KeyGeneration from "./components/KeyGeneration";
import SimplifiedDES from "./components/SimplifiedDES";

function App() {
  const [OutputText, setOutputText] = useState("");
  const [Mode, setMode] = useState("ENCRYPT");

  const runSDES = (e) => {
    e.preventDefault();
    let inputText = e.target[0].value;
    let masterKey = e.target[1].value;

    if (validateInputText(inputText) && validateMasterKey(masterKey)) {
      let { finalKeys } = generateKey(masterKey);
      let { finalPerm } = calculateSDES(inputText, finalKeys, Mode);
      setOutputText(finalPerm);
    }
  };

  return (
    <div className="container mt-5 p-3 prose rounded-md bg-violet-200">
      <h1 className="hero-content pt-0 m-0 text-center">Simplified DES Calculator</h1>
      <div className="bg-white rounded-md">
        <h2 className="text-center pt-3 m-0">Input:</h2>
        <form onSubmit={runSDES}>
          <div className="flex flex-row justify-center gap-20">
            <div>
              <label className="label">8-bit Plaintext/Ciphertext</label>
              <input
                type="text"
                maxLength={8}
                placeholder="8-bit Binary"
                className="input input-bordered"
                value="01001011"
              ></input>
            </div>

            <div>
              <label className="label">10-bit Master Key</label>
              <input
                type="text"
                maxLength={10}
                placeholder="10-bit Binary"
                className="input input-bordered"
                value="0111100001"
              ></input>
            </div>
          </div>
          <div className="flex flex-row m-2 p-2 justify-center">
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Encrypt</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "ENCRYPT"}
                  value="ENCRYPT"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Decrypt</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "DECRYPT"}
                  value="DECRYPT"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row mb-5 p-2 gap-10 justify-center">
            <button
              type="submit"
              className="btn btn-secondary w-32 rounded-full"
            >
              Submit
            </button>
            <button type="reset" onClick={() => {setMode('ENCRYPT')}} className="btn btn-error w-32 rounded-full">
              Reset
            </button>
          </div>
        </form>
        <h2>Hasil: {OutputText}</h2>
      </div>
      {/* <KeyGeneration  /> */}
    </div>
  );
}

export default App;

// function App(){
//   return <h1>Hello World</h1>
// }

// export default App;
