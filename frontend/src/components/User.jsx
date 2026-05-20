import { useLocation } from "react-router"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

function User() {

  let {state}=useLocation();
  const { currentUser } = useContext(UserContext);

  const displayUser = state || currentUser;

  if (!displayUser) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-4xl font-bold text-gray-600">No User Selected</h2>
        <p className="text-2xl text-gray-400 mt-4">Please log in to a user from the User List first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-10 mt-10 border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mb-6">
          {displayUser.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{displayUser.name}</h2>
        <p className="text-2xl text-blue-500 font-medium mb-6">{displayUser.email}</p>
        
        <div className="w-full space-y-4 text-left border-t border-gray-100 pt-6">
          <div className="flex justify-between">
            <span className="text-xl text-gray-400">Date of Birth:</span>
            <span className="text-xl font-medium text-gray-700">{displayUser.dateOfBirth || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl text-gray-400">Mobile:</span>
            <span className="text-xl font-medium text-gray-700">{displayUser.mobileNumber || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User