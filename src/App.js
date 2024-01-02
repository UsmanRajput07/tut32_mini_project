import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessRegister from "./pages/BusinessRegister";
import SearchFilter from "./pages/SearchFilter";
import Detail from "./pages/Detail";

function App() {
  if (window.localStorage.getItem("Jwt_token") === null) {
    return <Login />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="search" element={<SearchFilter />}></Route>
            <Route path="detail" element={<Detail />}></Route>
            {window.localStorage.getItem("Jwt_token") !== null && (
              <Route
                path="BusinessRegister"
                element={<BusinessRegister />}
              ></Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
