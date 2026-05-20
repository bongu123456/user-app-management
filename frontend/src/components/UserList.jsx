import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

function UserList() {

  let [loading,setLoading]=useState(false)
  let [error,setError]=useState(null)
  let [users,setUsers]=useState([])
  let navigate=useNavigate();

  useEffect(()=>{
      async function getUsers() {
        setLoading(true);
        try{
          let res=await fetch("https://user-management-app-1-0eey.onrender.com/user-api/users",{
          method: "GET"
          });

          if(res.status === 200){
            //extract json data
            let data = await res.json();
            //update the state 
            setUsers(data.payload)
          } else{
              throw new Error("error occurred")
            } 
        }catch(err){
          setError(err);
        }finally{
          setLoading(false);
        }
      }
      getUsers();
  },[])
    

  const { currentUser, login } = useContext(UserContext);

  //go to user
  const gotoUser=(userObj)=>{
    navigate("/user", { state: userObj })
  }

  const handleLogin = (e, userObj) => {
    e.stopPropagation();
    login(userObj);
  }

  return (
    <div>
      <h1 className="text-5xl text-gray-600 mb-6">List of Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          users.map(userObj=><div key={userObj.email} onClick={() => gotoUser(userObj)} className="p-10 shadow-2xl cursor-pointer flex flex-col justify-between rounded-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow">
            <div>
              <p className="text-3xl font-semibold text-gray-800">{userObj.name}</p>
              <p className="text-2xl text-gray-500 mt-2">{userObj.email}</p>
            </div>
            <button 
              onClick={(e) => handleLogin(e, userObj)} 
              className={`mt-6 p-2 rounded-md text-white text-xl font-medium transition-colors ${currentUser?.email === userObj.email ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {currentUser?.email === userObj.email ? 'Logged In' : 'Login'}
            </button>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default UserList