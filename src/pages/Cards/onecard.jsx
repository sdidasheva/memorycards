import react, { useState, useRef, useEffect } from "react";
import './onecard.scss';

function Card(word) {
    const { english, transcription, russian } = word;
    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed);
    }
    const ref = useRef()
    useEffect(() => {
        ref.current.focus();
    }, [])
    return (
        <div className='card'>
            <div className='english'>{english}</div>
            <div className='transcription'>{transcription}</div>
            <div className='russian' onClick={handleChange} >{pressed ? russian : <button ref={ref} className='flip'>Show translation</button>}</div>
        </div>
    )
}

export default Card;