import{BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Tasks from "./components/Tasks";
import Requests from "./components/Requests";
import Leaves from "./components/Leaves";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/tasks" element={<Tasks/>}></Route>
    <Route path="/requests" element={<Requests/>}></Route>
    <Route path="/leaves" element={<Leaves/>}></Route>
    <Route path="/editProfile" element={<EditProfile/>}></Route>
   </Routes>

    </BrowserRouter>
  );
}

export default App;