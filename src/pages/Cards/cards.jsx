import React, { useState, useRef, useEffect } from 'react';
import Card from './onecard';
import './cards.scss';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

function Cards() {
    const [current, setCurrent] = useState(0)
    const [words, setWords] = useState([]);
    const length = words.length
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

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(words) || words.length <= 0) {
        return null;
    }
    return (
        <div className='cards'>
            <FontAwesomeIcon icon={faArrowCircleLeft} className='left-arrow' onClick={prevSlide} />
            <FontAwesomeIcon icon={faArrowCircleRight} className='right-arrow' onClick={nextSlide} />
            {words.map((word, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>{index === current && (<Card english={word.english} transcription={word.transcription} russian={word.russian} />)}</div>
                );
            })}
            <div className='card-number'>{current + 1}/{length}</div>
        </div>
    )
}

export default Cards