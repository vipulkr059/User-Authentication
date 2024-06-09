import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
