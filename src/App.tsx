import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="w-12 h-12 bg-red-500">hello from tailwindcss</div>
    </div>
  );
}

export default App;
