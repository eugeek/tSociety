import React, { useEffect, useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";

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
        <div className="container sigcont center-block">
            <Form onSubmit={handleSubmit}>
                <h1>Создание туалета</h1>
                <Form.Text className="text-muted">
                    Посмотрите на карту и убедитесь в правильности установки метки
                </Form.Text>
                <Form.Group controlId="form.Desc">
                    <Form.Label>Описание:</Form.Label>
                    <Form.Control type="text" placeholder="Опишите здесь данное место" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="form.Cabs">
                    <Form.Label>Количество кабинок:</Form.Label>
                    <Form.Control type="text" placeholder="Укажите количество кабинок здесь" value={cabs} onChange={(e) => setCabs(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="- есть ли туалетная бумага" checked={paperChecked} onChange={checkPaper} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default CreateForm;