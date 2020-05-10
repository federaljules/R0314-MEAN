import React, {useState} from 'react'
import {Form, FormControl, FormLabel, Button, Card } from 'react-bootstrap'
import './css/style.css'

function Delete() {

    const [id, setId] = useState('');


    const handleSubmit =  (e)  => {
        e.preventDefault();
        if(window.confirm("Oletko varma että haluat poistaa tiedot jotka ovat ID: " +id)){

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }                             //Poista tiedot ID:n avulla ja kysy confirm ennen poistoa
            };
            fetch("https://node-api-eumaat.herokuapp.com/api/delete/" + id, requestOptions);
            window.location.reload();
        }
        
    
    }

    return (
        <Form onSubmit={handleSubmit} className="delForm">
        <Card><Card.Body>
        <Card.Title>Poista ID:n avulla (<b>Varoitus, tiedot poistuvat pysyvästi!</b>)</Card.Title>

            <FormLabel><b>ID *</b></FormLabel>
            <FormControl required value={id} onChange={(e) => {setId(e.target.value); console.log(id);}}></FormControl>     {/*Tallenna input kentän sisältö id muuttujaan setId:n avulla*/}
                <br/>
            <Button type="submit" variant="danger">POISTA</Button>
            </Card.Body></Card>
        </Form>
    )
}

export default Delete
