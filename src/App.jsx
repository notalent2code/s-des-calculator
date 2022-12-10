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
      let keyResult = generateKey(masterKey);
      let finalKeys = keyResult.finalKeys;

      let result = calculateSDES(inputText, finalKeys, Mode);
      let finalPerm = result.finalPerm;

      setOutputText(finalPerm);
    } else {
      alert("Input salah!");
    }
  };

  return (
    <div className="container card mt-5 p-5 prose rounded-md bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200">
      <h1 className="hero-content pt-0 m-0 text-center">
        Simplified DES Calculator
      </h1>
      <div className="bg-white rounded-md drop-shadow-xl">
        <h2 className="text-center pt-3 m-0">Input:</h2>
        <form onSubmit={runSDES}>
          <div className="flex flex-row justify-center gap-20">
            <div>
              <label className="label">8-bit Plaintext/Ciphertext</label>
              <input
                type="text"
                name="input-text"
                maxLength={8}
                placeholder="8-bit Binary"
                className="input input-bordered"
                // value="01001011"
              ></input>
            </div>

            <div>
              <label className="label">10-bit Master Key</label>
              <input
                type="text"
                name="input-key"
                maxLength={10}
                placeholder="10-bit Binary"
                className="input input-bordered"
                // value="0111100001"
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
            <button
              type="reset"
              onClick={() => {
                setMode("ENCRYPT");
                setOutputText("");
              }}
              className="btn btn-error w-32 rounded-full"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="prose card drop-shadow-xl mt-5 p-3 bg-white rounded-md">
        <h2>Hasil: {OutputText}</h2>
      </div>
      <div>{/* <KeyGeneration vars={keyResult} /> */}</div>
    </div>
  );
}

export default App;