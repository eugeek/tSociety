import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateForm ({functionRef}) {
    const [visible, setVisible] = useState(false);
    const [cabs, setCabs] = useState(1);

    useEffect(() => {
        functionRef.current = setVisible
    }, [functionRef]);

    if (!visible) return null;

    function handleSubmit (e) {
        e.preventDefault();

        const data = {
            coords: 'lat, lng',
            cabs: cabs
        };

        axios
            .post('http://localhost:3080/api/createtoilet', data)
            .then( res => console.log(res));

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Количество кабинок > </label>
                <input type='text' id='cabs' value={cabs} onChange={(e) => setCabs(e.target.value)} />
            </div>
            <button type={"submit"}>Отправить</button>
        </form>
    );
}

export default CreateForm;