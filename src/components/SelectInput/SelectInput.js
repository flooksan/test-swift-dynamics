import './selectinput.css'

function SelectInput(props) {
    const { placeholder, option, register, className, } = props

    
    
    
    return (
        <div className={className}>
            <label>{placeholder} : </label>
            <select {...register(placeholder,{required: true})}>
                {option.map((item,index) => (
                    <option key={index} value={item} >{item}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput