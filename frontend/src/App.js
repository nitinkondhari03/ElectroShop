import "./App.css";
import AllRoutes from "./Routers/AllRoutes.jsx";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { showUser } from "./store/userSlice/userSlice.js";
import Header from "./Components/Header.jsx";
import { showCart } from "./store/cartSlice/cartSlice.js";
import Footer from "./Components/Footer.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
    dispatch(showCart());
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <AllRoutes />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
