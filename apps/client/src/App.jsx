import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(()=>{
   const checkProxy = async () =>{
    const response = await fetch('/api/v1/user/test')
    const data = await response.json();
    console.log(data)
   }
   checkProxy();
  },[])

  return <div>Hello from Client App!</div>;
}

export default App;
