import react from "react";
import './table.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ReadOnlyRow = ({ word, handleEdit, handleDelete }) => {
    return (
        < tr >
            <td>{word.english}</td>
            <td>{word.transcription}</td>
            <td>{word.russian}</td>
            <td>
                <button className='button button_edit' onClick={(event) => handleEdit(event, word)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className='button button_delete' onClick={() => handleDelete(word.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
            </td>
        </tr >
    )
}

export default ReadOnlyRow;