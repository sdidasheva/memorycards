import react, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import './table.scss';

const EditableRow = ({ error, editForm, handleUpdate, handleEditFormChange, handleCancel }) => {
    return (
        <tr>
            <td>
                {error && <div className="table_error">{error.english[0] ? error.english[1] : " "}</div>}
                <input
                    type="text"
                    required='required'
                    placeholder='Enter a word...'
                    name="english"
                    value={editForm.english}
                    onChange={handleEditFormChange} />
            </td>
            <td>
                {error && <div className="table_error">{error.transcription[0] ? error.transcription[1] : " "}</div>}
                <input
                    type="text"
                    required='required'
                    placeholder='Enter a transcription...'
                    name="transcription"
                    value={editForm.transcription}
                    onChange={handleEditFormChange} />
            </td>
            <td>
                {error && <div className="table_error">{error.russian[0] ? error.russian[1] : " "}</div>}
                <input
                    type="text"
                    required='required'
                    placeholder='Enter a russian ...'
                    name="russian"
                    value={editForm.russian}
                    onChange={handleEditFormChange} />
            </td>
            <td>
                <button className='button button_save' onClick={handleUpdate} disabled={Object.values(error).some((x) => x[0] === true)}><FontAwesomeIcon icon={faSave} /></button>
                <button className='button button_cancel' onClick={handleCancel}><FontAwesomeIcon icon={faTimes} /></button>
            </td>
        </tr>
    )
}

export default EditableRow;