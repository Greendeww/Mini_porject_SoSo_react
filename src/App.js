import "../src/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Main } from "./Main";
import { Modal } from "./Modal";
import AddForm from "./pages/AddForm";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Sign from "./pages/Sign";
import HomeConModal from "./components/modal/HomeConModal";
function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      {/* 백그라운드 객체가 없어도 렌더링 */}
      <Routes location={!background || location}>
        <Route path="/" element={<Home/>}>
          {background && <Route path="detail" element={<HomeConModal/>} />}
          <Route path="/addform" element={<AddForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/signin" element={<Sign />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;