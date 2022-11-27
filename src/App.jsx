import { useState } from "react";
import { render } from "react-dom";
import "./App.css";
import { generateKey, calculateSDES } from "./utils/HelperFunctions";
import KeyGeneration from "./components/KeyGeneration";
import SimplifiedDES from "./components/SimplifiedDES";

function App() {
  let keyGeneration = generateKey("0111100001");
  let result = calculateSDES("01001011", keyGeneration.finalKeys, "ENCRYPT");
  console.log(result)

  return (
    <div className="container p-3 prose bg-violet-200">
      <h1 className="hero-content text-center">Simplified DES Calculator</h1>
      <div className="bg-white rounded-md">
        <h2 className="text-center ">Input:</h2>
        <form>
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
                  value="ENCRYPT"
                  className="radio checked:bg-blue-500"
                  // onChange={() => {}}
                />
              </label>
            </div>
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Decrypt</span>
                <input
                  type="radio"
                  name="mode"
                  value="DECRYPT"
                  className="radio checked:bg-blue-500"
                  // onChange={() => {}}
                />
              </label>
            </div>
          </div>


          <div className="flex flex-row mb-5 p-2 gap-10 justify-center">
            <button type="submit" className="btn btn-secondary w-32 rounded-full">
              Submit
            </button>
            <button type="reset" className="btn btn-error w-32 rounded-full">
              Reset
            </button>
          </div>
        </form>
      </div>
      <KeyGeneration vars={keyGeneration} />
    </div>
  );
}

export default App;

// function App(){
//   return <h1>Hello World</h1>
// }

// export default App;
