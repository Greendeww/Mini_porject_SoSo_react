import "../src/style.css";
import { Route, Routes} from "react-router-dom";
import AddForm from "./pages/AddForm";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Sign from "./pages/Sign";
import Detail from "./pages/Detail"
// import { updatePost } from "./redux/modules/postSlice";
import UpdatePost from "./pages/UpdatePost";
function App() {

  return (

    <div className="App">
      {/* 백그라운드 객체가 없어도 렌더링 */}
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/post" element={<AddForm />} />
        <Route path="/main" element={<Home />}>
        <Route path="/main/detail/:id" element={<Detail />} />
        <Route path="/main/update/:id" element={<UpdatePost/>} />
        </Route>
      </Routes>
 

    </div>
  );
}
export default App;