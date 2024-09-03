import App from "../src/App";
import {Routes, Route} from 'react-router-dom'
import Create from "../src/pages/Create";
import Update from "../src/pages/Update";
import Home from "../src/pages/Home";

export default function AppRoutes() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/home" element={<Home />}/>
        
         <Route path="/create" element={<Create />}/>
          <Route path="/update/:taskId" element={<Update />}/>
    </Routes> 
    </div>
  )
}

