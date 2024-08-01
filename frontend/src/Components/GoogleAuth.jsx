import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context";
import SummaryApi from "../common";
import React, { useContext } from "react";
export default function GoogleAuth() {
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.displayName);
      console.log(result.user.email);
      console.log(result.user.photoURL);
      const res = await fetch("https://mern-a77g.onrender.com/api/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
