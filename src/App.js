import "../src/style.css";
import { Route, Routes} from "react-router-dom";
import AddForm from "./pages/AddForm";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Sign from "./pages/Sign";
import Detail from "./pages/Detail"
function App() {

  return (

    <div className="App">
      {/* 백그라운드 객체가 없어도 렌더링 */}
      <Routes >
        <Route path="/" element={<Home />}>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<AddForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        </Route>
      </Routes>

    </div>
  );
}
export default App;