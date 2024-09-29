import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRandomColor, createImageFromInitials } from "../Components/Utils";

const Profile = () => {
  let imgSrc = "";
  const user = useSelector((state) => state?.user?.user);
  return (
    <>
      <h1 className="text-2xl mt-5 font-medium text-gray-900 text-center">
        User Profile
      </h1>
      <div className="bg-white max-w-lg m-auto mt-2 mb-5 overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <img
            className="w-auto h-12 uppercase rounded-full"
            id="preview"
            src={
              imgSrc.length <= 0
                ? createImageFromInitials(500, user?.name, getRandomColor())
                : imgSrc
            }
            alt="profile-pic"
          />
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 grid sm:grid-cols-3 gap-4 px-6">
              <Link
                to="/order"
                className="bg-cyan-800  hover:bg-cyan-900 text-white rounded-lg text-center"
              >
                <button>My Orders</button>
              </Link>
              <Link
                to="/updateProfile"
                className="bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg text-center"
              >
                <button>Update Profile</button>
              </Link>
              <Link
                to="/changePassword"
                className="bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg text-center"
              >
                <button>Change Password</button>
              </Link>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default Profile;
