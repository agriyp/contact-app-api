import { string, func } from 'prop-types'
import {FiDelete} from 'react-icons/fi'

function DeleteButton({id, onDelete}){
    return (
        <button className="contact-item__delete" onClick={() => onDelete(id)}><FiDelete /></button>
    )
}

DeleteButton.propTypes = {
    id: string.isRequired,
    onDelete: func.isRequired
}

export default DeleteButton