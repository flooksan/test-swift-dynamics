import { createContext, useEffect, useState } from "react";


const UserDBContext = createContext({ 
    DB: [],
    handleAddUserData: (userData) => {}, 
    handleRemoveUserData: (id) => {},
    handleEditUserData: (userData) => {}
,})

export function UserDBContextProvider (props) {
    const [ userDB, setUserDB ] = useState([]);
    
    const handleAddUserData =(userData) => {
        
        setUserDB((prevUser) => {
            return prevUser.concat(userData)
        })
        
    }

    const handleRemoveUserData =(id) => {
        // console.log(`context delete : ${id}`)
        setUserDB((prevUser) => {
            return prevUser.filter(user => user.id !== id)
        })
    }

    const handleEditUserData = (userData) => {
        // console.log(userData,userDB)
        userDB.filter((user,index) => {
            if(user.id === userData.id) {
                // console.log(index)
                let userDBCopy = [...userDB]
                userDBCopy[index] = userData
                // console.log(userDBCopy)
                setUserDB(userDBCopy)
            }
        })

    }
    
    
    const context = {
        DB: userDB,
        handleAddUserData: handleAddUserData, 
        handleRemoveUserData: handleRemoveUserData,
        handleEditUserData: handleEditUserData
    }

    useEffect(() => {
        if(!userDB) {
            JSON.parse(localStorage.getItem("userDBArr"))
        } 
        localStorage.setItem("userDBArr",JSON.stringify(userDB))
    },[userDB])

    return (
        <UserDBContext.Provider value={context}>
            {props.children}
        </UserDBContext.Provider>
    )
}

export default UserDBContext