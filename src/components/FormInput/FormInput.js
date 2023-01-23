import './formInput.css'

function FormInput(props) {
    const { type, placeholder, register, className } = props
    return (
        <div className={className}>
            <label>{placeholder} : </label>
            <input type={type} placeholder={placeholder} {...register(placeholder,{required: true})}/>
        </div>
    )
}

export default FormInput