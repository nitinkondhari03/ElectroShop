import "./App.css";
import AllRoutes from "./Routers/AllRoutes.jsx";
import Context from "./context";
import { useEffect } from "react";
import SummaryApi from "./common";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    console.log(dataApi);
  };
  useEffect(() => {
    /**user Details */
    fetchUserDetails();
  }, []);
  return (
    <div>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
        }}
      >
        <ToastContainer />
        <AllRoutes />
      </Context.Provider>
    </div>
  );
}

export default App;
