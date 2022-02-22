import React, { useEffect, useState } from 'react';
import './table.scss';
import axios from 'axios';
import { nanoid } from "nanoid";
import ReadOnlyRow from './readonlyrow';
import EditableRow from './editablerow';
import AddRow from './addrow';

function Table() {
    const [words, setWords] = useState([]);
    const [addForm, setAddForm] = useState({
        english: '',
        transcription: '',
        russian: '',
    })

    const [editForm, setEditForm] = useState({
        english: '',
        transcription: '',
        russian: '',
    })

    const [editWordId, setEditWordId] = useState(null);

    const [error, setError] = useState({
        english: [false, "Empty!"],
        russian: [false, "Empty!"],
        transcription: [false, "Empty!"],
    });

    //Axios API Requests
    const api = axios.create({
        baseURL: `http://localhost:3006`
    });
    const retrieveWords = async () => {
        const response = await api.get("/words");
        return setWords(response.data);
    };

    useEffect(() => {
        const getAllWords = async () => {
            const allWords = await retrieveWords();
            if (allWords) setWords(allWords);
        }
        getAllWords();
    }, []);

    //AddRow Component
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        if (fieldValue.trim() === "") {
            setError({ ...error, [fieldName]: [true, "Empty!"] });
        } else
            switch (fieldName) {
                case "english":
                    fieldValue.match(/^[A-Za-z0-9]*$/)
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "Not in english"] });
                    break;
                case "transcription":
                    fieldValue !== ''
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "EMPTY!"] });
                    break;
                case "russian":
                    fieldValue.match(/^[а-яё -]+$/i)
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "Not in russian"] });
                    break;
                default:
                    console.log('Error');
            }
        const newForm = { ...addForm };
        newForm[fieldName] = fieldValue;
        setAddForm(newForm);
    }

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const newWord = {
            id: nanoid(),
            english: addForm.english,
            transcription: addForm.transcription,
            russian: addForm.russian,
        };
        const response = await api.post(`/words`, newWord);
        const newWords = [...words, newWord];
        setWords(newWords);
    }

    //EditableRow Component

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        if (fieldValue.trim() === "") {
            setError({ ...error, [fieldName]: [true, "Empty!"] });
        } else
            switch (fieldName) {
                case "english":
                    fieldValue.match(/^[A-Za-z0-9]*$/)
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "Not in english"] });
                    break;
                case "transcription":
                    fieldValue !== ''
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "EMPTY!"] });
                    break;
                case "russian":
                    fieldValue.match(/^[а-яё -]+$/i)
                        ? setError({ ...error, [fieldName]: [false, ""] })
                        : setError({ ...error, [fieldName]: [true, "Not in russian"] });
                    break;
                default:
                    console.log('Error');
            }
        const newForm = { ...editForm };
        newForm[fieldName] = fieldValue;


        setEditForm(newForm);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const editedWord = {
            id: editWordId,
            english: editForm.english,
            transcription: editForm.transcription,
            russian: editForm.russian,
        };
        try {
            const response = await api.patch(`/words/${editWordId}`, editedWord);
            const newWords = [...words];
            const index = words.findIndex((word) => word.id === editWordId);
            newWords[index] = editedWord;
            setWords(newWords);
            setEditWordId(null);
        } catch (err) {
            console.log(err)
        }
    };

    const handleCancel = () => {
        setEditWordId(null);
    }

    // ReadOnlyRow Component
    const handleEdit = (event, word) => {
        event.preventDefault();
        setEditWordId(word.id);

        const formValues = {
            english: word.english,
            transcription: word.transcription,
            russian: word.russian,
        }
        setEditForm(formValues)
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/words/${id}`);
            const newWordList = words.filter((word) => {
                return word.id !== id;
            });
            setWords(newWordList);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
            <AddRow error={error} handleAddFormChange={handleAddFormChange} handleAddFormSubmit={handleAddFormSubmit} />
            <div className='table'>
                <form >
                    <table>
                        <thead>
                            <tr className='table_header'>
                                <th>Word</th>
                                <th>Transcription</th>
                                <th>Translation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {words.map((word, index) => (
                                <>
                                    {editWordId === word.id ? (
                                        <EditableRow key={index} editForm={editForm}
                                            error={error} handleEditFormChange={handleEditFormChange} handleCancel={handleCancel}
                                            handleUpdate={handleUpdate} />) : (
                                        <ReadOnlyRow key={index} word={word} handleEdit={handleEdit} handleDelete={handleDelete} />)}
                                </>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}

export default Table;