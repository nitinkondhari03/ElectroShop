import React, { useContext, useState } from "react";
import Logo from "../assets/Logo/OnlineShop.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../store/userSlice/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state?.user);
  const { cart } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
const [searchvisible,setsearchvisible]=useState(false)
  const handleLogout = async () => {
    dispatch(logoutUser());
    if (!isAuthenticated) {
      toast.success("Logout Successful");
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
     
    } else {
      navigate("/search");
      
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40 pt-2">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            {" "}
            <img src={Logo} alt="Logo" width={84} h={50} />
          </Link>
        </div>

        <div className="hidden sm:flex items-center text-sm sm:w-50% md:w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search Product Here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-7 bg-cyan-800 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
        <div className="sm:hidden">
<GrSearch size={20} onClick={()=>setsearchvisible(!searchvisible)}/>
</div>
          {user?._id && (
            <div className="relative flex justify-center">
              <div
                className="text-2xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                <FaRegCircleUser />
              </div>

              {menuDisplay && (
                <div className="absolute bg-white bottom-0 text-sm top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((preve) => !preve)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user && (
                      <Link
                        to={"/profile"}
                        className="whitespace-nowrap block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((preve) => !preve)}
                      >
                        My Profile
                      </Link>
                    )}

                    <Link
                      to={"/order"}
                      className="whitespace-nowrap block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Your Order
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          )}

          {user?._id && (
            <Link to={"/cart"} className="text-xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-cyan-800 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{cart ? cart?.length : 0}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 text-sm py-1 rounded-full text-white bg-cyan-800 hover:bg-cyan-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 text-sm py-1 rounded-full text-white bg-cyan-800 hover:bg-cyan-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {searchvisible && <div className=" h-full bg-white sm:hidden mx-auto flex items-center px-4 mb-10 m-auto ">
       

        <div className="sm:hidden flex m-auto items-center text-sm w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search Product Here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-7 bg-cyan-800 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
      </div>}
    </header>
  );
};

export default Header;
