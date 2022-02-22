import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateForm ({functionRef, coords}) {
    const [visible, setVisible] = useState(false);
    const [cabs, setCabs] = useState(1);
    const [paperChecked, setPaperChecked] = useState(false)

    useEffect(() => {
        functionRef.current = setVisible
    }, [functionRef]);

    if (!visible) return null;

    const checkPaper = () => {
        setPaperChecked(!paperChecked);
    };

    function handleSubmit (e) {
        e.preventDefault();

        const data = {
            latlng: {
                lat: coords[0],
                lng: coords[1],
            },
            cabs: cabs,
            hasPaper: paperChecked,
        };

        axios
            .post('http://localhost:3080/api/createtoilet', data)
            .then( res => console.log(res));

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Добавить новый туалет</h1>
            <div>
                <label htmlFor='email'>Количество кабинок > </label>
                <input type='text' id='cabs' value={cabs} onChange={(e) => setCabs(e.target.value)} />
            </div>
            <div>
                <label htmlFor='email'>Туалетная бумага > </label>
                <input type="checkbox" checked={paperChecked} onChange={checkPaper} />
            </div>
            <button type={"submit"}>Добавить</button>
        </form>
    );
}

export default CreateForm;