import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateForm ({showCreateForm, coords}) {
    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [cabs, setCabs] = useState(1);
    const [paperChecked, setPaperChecked] = useState(false)

    useEffect(() => {
        setVisible(showCreateForm);
    }, [showCreateForm]);

    if (!visible) return null;

    const checkPaper = () => {
        setPaperChecked(!paperChecked);
    };

    async function handleSubmit (e) {
        e.preventDefault();

        const data = {
            latlng: {
                lat: coords[0],
                lng: coords[1]
            },
            description: description,
            props: {
                cabs: cabs,
                paper: paperChecked
            }
        };

        await axios
            .post('http://localhost:3080/api/createtoilet', data)
            .then( res => console.log(res));

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Добавить новый туалет</h1>
            <div>
                <label htmlFor='desc'>Описание > </label>
                <input type='text' id='desc' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label htmlFor='cabs'>Количество кабинок > </label>
                <input type='text' id='cabs' value={cabs} onChange={(e) => setCabs(e.target.value)} />
            </div>
            <div>
                <label htmlFor='paper'>Туалетная бумага > </label>
                <input type='checkbox' id='paper' checked={paperChecked} onChange={checkPaper} />
            </div>
            <button type={"submit"}>Добавить</button>
        </form>
    );
}

export default CreateForm;