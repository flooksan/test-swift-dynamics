import './pagination.css'

function Pagination(props) {
    // Define variable
    const {  usersPerPage, totalUsers, paginate } = props
    const totalPage = Math.ceil(totalUsers/usersPerPage)
    const pageNumbers = [];

    for(let i =1; i <= totalPage; i++) {
        pageNumbers.push(i)
    }
    
    return (
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" >
                        <div style={{cursor:"pointer"}} onClick={()=> paginate(number)}   className="page-link">{number}</div>
                    </li> 
                ))}
            </ul>
            
        </nav>
    )
}

export default Pagination