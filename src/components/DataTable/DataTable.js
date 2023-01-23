import './datatable.css'
import { useEffect, useState, useContext } from 'react';
import UserDBContext from '../../context/contextAPI';
import { userData_test as db_test } from '../../data_mockup/data_mockup.js'
import Pagination from '../Pagination.js/Pagination';
import { hover } from '@testing-library/user-event/dist/hover';
import { TfiAngleUp, TfiArrowUp, TfiAngleDown, TfiArrowDown, TfiLayoutLineSolid  } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import EditData from '../EditData/EditData';


function DataTable() {
  // Context
  const userDBContext = useContext(UserDBContext)

  // Local storage
  const userLocal = JSON.parse(localStorage.getItem("userDBArr"))

  // State
    // Userdata
    const [ userData, setUserData ] = useState([])
    const [ userData2, setUserData2 ] = useState([])
    // Re-render page
    const [ rerender, setRender ] = useState(false)
    // Checkbox
    const [ checkBokData, setCheckBoxData ] = useState([])
    const [ toggleCheckAll, setToggleCheckAll ] = useState(false)
    // Sorted
    const [ sortedValue , setSortedValue ] = useState({sorted:"name", reversed: false})
    // Edit
    const [ showEditUser, setShowEditUser ] = useState({show:false , userData:{}})
    

  // Pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ usersPerPage, setUsersPerPage ] = useState(5)

  // Get current userdata
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  let currentUserArr = db_test.slice(indexOfFirstUser, indexOfLastUser)
  
  const totalPage = Math.ceil(db_test.length/usersPerPage)
  let currentUserArr2, totalPage2
  if(userLocal) {
    currentUserArr2 = userData.slice(indexOfFirstUser, indexOfLastUser)
    totalPage2 = Math.ceil(userData.length/usersPerPage)
  }
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const prevPage = () => (currentPage === 1) ? currentPage : setCurrentPage(currentPage-1)
  const nextPage = () => (currentPage === totalPage) ? currentPage : setCurrentPage(currentPage+1)
  
  // logic checke all checkbox
  let checkAll
  if(toggleCheckAll) {
    checkAll = toggleCheckAll
  } 

  // Fuction

    // Check,find,delete and edit one data
    const findId = (userId) => {
      return checkBokData.some(id => id === userId) 
    }

    const confirmDelete = () => {
      return window.confirm("Can delete") 
    }

    const handleCheckbox = (userId) => {
      
      if(findId(userId)) {
        checkAll = findId(userId)
        setCheckBoxData(prevState =>{
          return prevState.filter(id => id !== userId)
        })
      } else if(!findId(userId)) {
        checkAll = findId(userId)
        return setCheckBoxData(prevState => prevState.concat(userId))
      }
    }

    const handleRemove = (userId) => {
      console.log(userId)
      setRender(true)
      if(findId(userId)) {
        confirmDelete()
        if(confirmDelete) {
          userDBContext.handleRemoveUserData(userId)
        }
  
      } else if(!findId(userId)) {
        console.log("Not delete")
      }

    }

    // Check all and delete all dat
    const checkedAllBox = () => {
      if(checkAll) {
        setToggleCheckAll(false)
      } else {
        setToggleCheckAll(true)
      }
    }

    const handleRemoveAll = () => {
      setUserData('')
      
    }

    // Sorted Fuction

    const sortByText = (column) => {
      setSortedValue({ sorted:column, reversed: !sortedValue.reversed })

      const usersDataCopy2 = [...userData2];
      usersDataCopy2.sort((userA, userB) => {
        const fullNameA = `${userA.fname}  ${userA.lname}`
        const fullNameB = `${userB.fname}  ${userB.lname}`
        if (sortedValue.reversed) {
          return fullNameB.localeCompare(fullNameA)
        } else {
          return fullNameA.localeCompare(fullNameB)
        } 
      })
      setUserData2(usersDataCopy2)
    }

    const sortByMobile = (column) => {
      setSortedValue({ sorted:column, reversed: !sortedValue.reversed })

      const usersDataCopy2 = [...userData2]
      usersDataCopy2.sort((userA, userB) => {
        if (sortedValue.reversed) {
          return userA.mobile - userB.mobile
        } else {
          return userB.mobile - userA.mobile
        }
      })

      setUserData2(usersDataCopy2)
      
    }

    // Render/switch arrow of sort
    const switchArrow = () => {
      if (sortedValue.reversed) {
        return <TfiAngleUp style={{color:"#68B984",fontWeight:"bold",fontSize:"18px"}}/>
      } 
      return <TfiAngleDown style={{color:"#F55050",fontWeight:"bold",fontSize:"18px"}}/>
    }

    

  useEffect(() => {
    setRender(false)
    setUserData(userLocal)
    setUserData2(currentUserArr)

  },[rerender,currentPage])

  // console.log(userData)
  // console.log(checkBokData)

  // Reder EditUser component
  if(showEditUser) {
    const passProps = () => {
      
    }
  }

  
  return (
    <>
      <div className='ontop'>

        <div className='ontop__left'>
          <input type="checkbox" onClick={checkedAllBox} className="checkbox"/><label>Select All</label>
          <button onClick={handleRemoveAll}>DELETE</button>
          <Link to="/"><button>BACK TO REGISTER</button></Link>
        </div>

        <div className='ontop__right'>
              <div 
                className='page-continue'
                onClick={prevPage}
                >PREV</div>
              <Pagination 
                usersPerPage={usersPerPage} 
                totalUsers={db_test.length} 
                paginate={paginate}
              />
              <div 
                className='page-continue'
                onClick={nextPage}
              >Next</div>
        </div>

      </div>
      
      <table className='table'>
        <tbody>
          <tr className='table__header'>
            <th>select</th>
            
            <th 
              onClick={()=>sortByText("name")}
              style={{cursor:"pointer"}}
            >
              NAME {sortedValue.sorted === "name" ? switchArrow() : <TfiLayoutLineSolid style={{color:"#86A3B8"}}/>}
            </th>

            <th>GENDER</th>
            
            <th 
              onClick={()=>sortByMobile("moblie")}
              style={{cursor:"pointer"}}
            >
              MOBLIE PHONE {sortedValue.sorted === "moblie" ? switchArrow() : <TfiLayoutLineSolid style={{color:"#86A3B8"}}/>}
            </th>
            
            <th>NATIONALITY</th>
            
            <th>EDIT/DELETE</th>
          </tr>
          {userData2.map(({ id, fname, lname, gender, nation, mobile, title ,bday, salary, passport }) => (
            <tr className='table__row' key={id} >
              <td><input type="checkbox" onClick={()=>handleCheckbox(id)} checked={checkAll} className="checkbox" /> </td>
              <td>{fname+'   '+lname}</td>
              <td>{gender}</td>
              <td>+{mobile}</td>
              <td>{nation}</td>
              <td>
                <span 
                  style={{cursor:"pointer"}} 
                  onClick={()=>{
                    setShowEditUser({show:true, userData: {id, fname, lname, gender, nation, mobile, title, bday, salary, passport}})
                  }}>2EDIT</span> 
                  / 
                <span style={{cursor:"pointer"}} onClick={()=>handleRemove(id)}>DELETE</span>
              </td>
            </tr>
          ))}
          {userLocal && currentUserArr2.map(({id, fname, lname, gender, nation, mobile, title, bday, salary, passport}) => (
            <tr className='table__row' key={id} >
              <td><input type="checkbox" onClick={()=>handleCheckbox(id)} checked={checkAll} className="checkbox" /> </td>
              <td>{fname+' '+lname}</td>
              <td>{gender}</td>
              <td>+{mobile}</td>
              <td>{nation}</td>
              <td>
                <span 
                  style={{cursor:"pointer"}} onClick={()=>{
                  
                  setShowEditUser({show:true, userData: {id, fname, lname, gender, nation, mobile, title, bday, salary, passport}})
                  }}>2EDIT</span> 
                  / 
                <span style={{cursor:"pointer"}} onClick={()=>handleRemove(id)}>DELETE</span>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      {showEditUser.show && 
        <EditData data={showEditUser.userData} setShowEditUser={setShowEditUser}/>
      }
    </>
    
  )
}

export default DataTable

/* 
  {user.Data.map(({ id, fname, lname, gender, nation, mobile }) => (
    <tr>
      <td>{fname+' '+lname}</td>
      <td>{gender}</td>
      <td>{mobile}</td>
      <td>{nation}</td>
      <td>EDIT/DELETE</td>
    </tr>
  ))}
*/ 
