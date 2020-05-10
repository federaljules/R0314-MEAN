import React, {useState} from 'react'
import {Form, FormControl, FormLabel, Button, Card } from 'react-bootstrap'
import './css/style.css'

function Lisää() {

    const [maa, setMaa] = useState('');                                                 // Muuttujat lisättävälle objektille
    const [paakaupunki, setPaakaupunki] = useState('');                                 
    const [asluku, setAsluku] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [info, setInfo] = useState('');
    const [lippu, setLippu] = useState('');                                             // Muuttujat lisättävälle objektille

    const handleSubmit =  (e)  => {
        e.preventDefault();
    const requestOptions = {
            method: 'POST',
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
        fetch("https://node-api-eumaat.herokuapp.com/api/add", requestOptions);
        window.location.reload();
    }

    return (
        <Form onSubmit={handleSubmit} className="muokkaaForm">
        <Card><Card.Body>
        <Card.Title>Lisää uusi</Card.Title>
{/*Tallenna input kentistä value niiden muuttujiin, jotta saadaan lähetettyä tiedot APIlle --------------------------------------------------------------------------------*/}
            <FormLabel>Maan nimi *</FormLabel>
            <FormControl required value={maa} onChange={(e) => {setMaa(e.target.value); console.log(maa);}}></FormControl>

            <FormLabel >Pääkaupunki *</FormLabel>
            <FormControl required value={paakaupunki} onChange={(e) => {setPaakaupunki(e.target.value); console.log(paakaupunki);}}></FormControl>

            <FormLabel>Asukasluku *</FormLabel>
            <FormControl required type="number" value={asluku} onChange={(e) => {setAsluku(e.target.value); console.log(asluku);}}></FormControl>

            <FormLabel>Lippu (url) *</FormLabel>
            <FormControl required value={lippu} onChange={(e) => {setLippu(e.target.value); console.log(lippu);}}></FormControl>

            <FormLabel>Info (Wikipedia url) *</FormLabel>
            <FormControl required value={info} onChange={(e) => {setInfo(e.target.value); console.log(info);}}></FormControl>

            <FormLabel>Maan kordinaatit *</FormLabel>
            <FormControl required type="number" value={lat} placeholder="Latitude" onChange={(e) => {setLat(e.target.value); console.log(lat);}}></FormControl>
            <FormControl required type="number" value={lon} placeholder="Longitude" onChange={(e) => {setLon(e.target.value); console.log(lon);}}></FormControl>

{/*Tallenna input kentistä value niiden muuttujiin, jotta saadaan lähetettyä tiedot APIlle --------------------------------------------------------------------------------*/}

            <br/>
            <Button type="submit" id="lisää" variant="success">Lisää</Button>
            </Card.Body></Card>
        </Form>
    )
}

export default Lisää
