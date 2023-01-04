import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
// import "./App.css";

import CreateUser from "./components/CreateUser";

import Login from "./components/Login";
import Home from "./components/Home";
import Poll from "./components/Poll";
import Pie from "./components/Pie";
import QuestionForm from "./components/QuestionForm";
import { ProtectedRoute } from "./components/Protected";
import UnAuth from "./components/UnAuth";
import DashboardUser from "./components/DashboardUser";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App"> 
      <Routes>
      <Route path="/result/:id" element={<Pie/>}/>
      <Route path="/poll/:id" element={<Poll/>}/>
      <Route path="/valid" element={<ProtectedRoute><QuestionForm/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/registration" element={<CreateUser/>}/>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/polls" element={<Home/>}/>
      <Route path="/unauth" element={<UnAuth/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashboardUser/></ProtectedRoute> }/>
      </Routes>
    </div>
  );
}
export default App;
