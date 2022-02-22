import react, { useState } from "react";
import './table.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function AddRow({ error, handleAddFormSubmit, handleAddFormChange }) {

    return (
        <form>
            <div className="table_add">
                <div>
                    {error && <div className="table_error">{error.english[0] ? error.english[1] : " "}</div>}
                    <input
                        type="text"
                        required='required'
                        placeholder='Enter a word...'
                        name="english"
                        onChange={handleAddFormChange}
                    />
                </div>
                <div>
                    {error && <div className="table_error">{error.transcription[0] ? error.transcription[1] : " "}</div>}
                    <input
                        type="text"
                        required='required'
                        placeholder='Enter a transcription...'
                        name="transcription"
                        onChange={handleAddFormChange}
                    />
                </div>
                <div>
                    {error && <div className="table_error">{error.russian[0] ? error.russian[1] : " "}</div>}
                    <input
                        type="text"
                        required='required'
                        placeholder='Enter a russian ...'
                        name="russian"
                        onChange={handleAddFormChange}
                    />
                </div>
                <button className='button button_add' type="submit" onClick={handleAddFormSubmit} disabled={Object.values(error).some((x) => x[0] === true)}><FontAwesomeIcon icon={faAdd} /></button>
            </div>
        </form>
    )
}

export default AddRow;