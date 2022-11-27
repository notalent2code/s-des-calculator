import { useState } from "react";
import { render } from "react-dom";
import "./App.css";
import { generateKey } from "./utils/HelperFunctions";
import KeyGeneration from "./components/KeyGeneration";
import SimplifiedDES from "./components/SimplifiedDES";

function App() {
  let keyGeneration = generateKey("0111100001");

  return (
  <KeyGeneration vars={keyGeneration} />
  );
}

export default App;

// function App(){
//   return <h1>Hello World</h1>
// }

// export default App;
