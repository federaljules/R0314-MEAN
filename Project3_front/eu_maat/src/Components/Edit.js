import React, {useState} from 'react'
import {Form, FormControl, FormLabel, Button, Card } from 'react-bootstrap'
import './css/style.css'

function Edit() {

    const [id, setId] = useState('');                                               // Muuttujat muokattavalle objektille
    const [maa, setMaa] = useState('');
    const [paakaupunki, setPaakaupunki] = useState('');
    const [asluku, setAsluku] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [info, setInfo] = useState('');
    const [lippu, setLippu] = useState('');                                          // Muuttujat muokattavalle objektille

    const handleSubmit =  (e)  => {
        e.preventDefault();
    const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                maa: maa,
                paakaupunki: paakaupunki,
                asluku: asluku,
                coords: {lat: lat, lon: lon},
                info: info,
                lippu: lippu
            })
        };
        fetch("https://node-api-eumaat.herokuapp.com/api/update/"+ id , requestOptions);
        window.location.reload();
    }

    return (
        <Form onSubmit={handleSubmit} className="muokkaaForm">
        <Card><Card.Body>
        <Card.Title>Muokkaa</Card.Title>
{/*Tallenna input kentistä value niiden muuttujiin, jotta saadaan lähetettyä tiedot APIlle --------------------------------------------------------------------------------*/}

            <FormLabel>ID *</FormLabel>
            <FormControl required value={id} onChange={(e) => {setId(e.target.value); console.log(id);}}></FormControl>

            <FormLabel>Maan nimi</FormLabel>
            <FormControl value={maa} onChange={(e) => {setMaa(e.target.value); console.log(maa);}}></FormControl>

            <FormLabel >Pääkaupunki</FormLabel>
            <FormControl value={paakaupunki} onChange={(e) => {setPaakaupunki(e.target.value); console.log(paakaupunki);}}></FormControl>

            <FormLabel>Asukasluku</FormLabel>
            <FormControl type="number" value={asluku} onChange={(e) => {setAsluku(e.target.value); console.log(asluku);}}></FormControl>

            <FormLabel>Lippu (url)</FormLabel>
            <FormControl value={lippu} onChange={(e) => {setLippu(e.target.value); console.log(lippu);}}></FormControl>

            <FormLabel>Info (Wikipedia url)</FormLabel>
            <FormControl value={info} onChange={(e) => {setInfo(e.target.value); console.log(info);}}></FormControl>

            <FormLabel>Maan kordinaatit</FormLabel>
            <FormControl type="number" value={lat} placeholder="Latitude" onChange={(e) => {setLat(e.target.value); console.log(lat);}}></FormControl>
            <FormControl type="number" value={lon} placeholder="Longitude" onChange={(e) => {setLon(e.target.value); console.log(lon);}}></FormControl>
            <br/>

{/*Tallenna input kentistä value niiden muuttujiin, jotta saadaan lähetettyä tiedot APIlle --------------------------------------------------------------------------------*/}

            <Button type="submit" id="lisää" variant="success">Muokkaa</Button>
            </Card.Body></Card>
        </Form>
    )
}

export default Edit
