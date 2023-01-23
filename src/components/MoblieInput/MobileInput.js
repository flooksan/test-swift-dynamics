import './moblieinput.css'


function MoblieInput(props) {
    const { placeholder, option, register} = props
    
    
    return (
        <div className="selectInput">
            <label>{placeholder} : </label>
            <select {...register(placeholder)} >
                {option.map((mobile,index) => (
                    <option key={index} value={option[index].split("+")[1]} >{mobile}</option>
                ))}
            </select> 
        </div>
    )
}

export default MoblieInput

{/* <select name="countries" onChange={(e)=>{console.log(e.target.value)}}>
        <option value={moblieFlag[0].split("+")[1]}>{moblieFlag[0]}</option>
        
      </select> */}