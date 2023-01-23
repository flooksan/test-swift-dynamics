
import './editdata.css';
import FormInput from '../FormInput/FormInput';
import MoblieInput from '../MoblieInput/MobileInput';
import SelectInput from '../SelectInput/SelectInput';
import  { moblieFlag, national, gender, }  from '../../data_mockup/data_mockup';
import { useForm,  } from 'react-hook-form';
import { useEffect, useState, useContext } from 'react';
import UserDBContext from '../../context/contextAPI';


function EditData(props) {
  // Props
  const { title, fname, lname, bday, id, gender: gender2, mobile, passport, salary, nation } = props.data
  console.log(props)
  const  setShowEditUser  = props.setShowEditUser

  // Context
  const userDBContext = useContext(UserDBContext)
  console.log(userDBContext.DB)

  const titleOption = ["Mr.","Mrs.","Miss"] // Mrs. W married , Miss W all + not married
  const { register, handleSubmit } = useForm({
    defaultValues: {
      Title:title , Firstname: fname, Lastname: lname,
      Birthday: bday, Nationality:nation,
      c1:id.slice(0,1) , c2:id.slice(1,5), c3:id.slice(5,10), c4:id.slice(10,12), c5: id.slice(12,13),
      Gender:gender2,
      Moblie2: mobile.slice(2,9),
      "Passport No": passport,
      Salary: salary,
    }
  });
  const [ userData, setUserData ] = useState([]); // ต้องทำ context มาเก็บค่าเพราะจะเอาไปส่งให้อีก components
  const [ showSalary, setShowSalary ] = useState()
  // const getItemStorage = JSON.parse( localStorage.getItem("userArray") || "[]")


  const onSubmit = (data) => {
    // Pre-data before save to context
    let preData = {
      title: data.Title, fname: data.Firstname, lname: data.Lastname,
      bday: data.Birthday, nation: data.Nationality,
      id:data.c1+data.c2+data.c3+data.c4+data.c5,
      gender: data.Gender,
      mobile: data.Moblie+data.Moblie2,
      passport: data["Passport No"], // to object name with space
      salary: data.Salary
    }

    userDBContext.handleEditUserData(preData)

    setUserData(prevState => 
      prevState.concat(preData)
    )
    
    console.log(preData)
  }

  const handleAutoComma = (e) => {
    let num = e.target.value
    // num = num.split('')
    setShowSalary(num)
    console.log(num)
  }

  useEffect(() => {
    // localStorage.setItem('userArray',JSON.stringify(userData)) 
  },[userData,])
  
  console.log("Context DB : ",userDBContext.DB)
  // console.log(userData)

  return (
    
      
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h1>EDIT USER </h1>
        <div className="title" >
        
          <SelectInput className="title__title" placeholder="Title" option={titleOption} register={register}/>
          <FormInput className="title__fname" placeholder="Firstname" type="text" register={register}/>
          <FormInput className="title__lname" placeholder="Lastname" type="text" register={register}/>
        </div>

        <div className="date">
          <FormInput className="date__date" placeholder="Birthday" type="date" register={register}/>
          <SelectInput className="date__national" placeholder="Nationality" option={national} register={register}/>
        </div>

        <div className="id">
          {/* CitizenID */}
          <label className="id__label">CitizenID : </label>
          <input type="text" className="id__num1" maxLength="1"  {...register("c1", {maxLength:1, required: true})} /><span>-</span> 
          <input type="text" className="id__num2" maxLength="4"  {...register("c2", {maxLength:4, required: true})} /><span>-</span> 
          <input type="text" className="id__num3" maxLength="5"  {...register("c3", {maxLength:5, required: true})} /><span>-</span> 
          <input type="text" className="id__num4" maxLength="2"  {...register("c4", {maxLength:2, required: true})} /><span>-</span> 
          <input type="text" className="id__num5" maxLength="1"  {...register("c5", {maxLength:1, required: true})} />
        </div>

        <div className="gender">
          {/* Gender */}
          <legend className="gender__legend">Gender : 
          
              {gender.map((gender,index) => ( 
                <> &emsp;
                  <input key={index} type="radio"  id={gender} {...register("Gender")} />
                  <label key={gender} htmlFor={gender} >{gender}</label>
                </>
              ))}
          
            
          </legend>
        </div>

        <div className="mobile">
          {/* Moblie */}
          <MoblieInput className="mobile__input1" placeholder="Moblie" option={moblieFlag} register={register} /> 
          <span>-</span>
          <input className="mobile__input2" maxLength="9" type="text" {...register("Moblie2", {maxLength:9, required: true})} />

        </div>

        <div className="passpost">
          {/* Passpost */}
          <FormInput className="passpost__input" placeholder="Passport No" type="text" register={register} />
        </div>

        <div className="salary">
          {/* I want Salary */}
          <label>Expected Salary : </label>
          <input 
            className="salary__input" value={showSalary} placeholder="Expected Salary" 
            type="text" onChange={handleAutoComma} {...register("Salary", {require: true})} />
        </div>
        
        <div className="btn">
          
          <input className="btn__submit" value="SUBMIT" type="submit"  />
        
            

              <button 
                className="btn__link"
                onClick={()=>setShowEditUser(false)}
                >
                Cancel
              </button>
            
    
        </div>
        
      </form>
    
  );
}

export default EditData;

// &emsp; space 1 space bar