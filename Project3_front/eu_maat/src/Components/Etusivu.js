import React, { useState } from 'react'
import {Form, Card, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'



const Etusivu = () => {

    const [position, setPosition] = useState([52.5200, 13.4050])                    // Kartan position
    const [results, setResults] = useState([]);                                     // APIsta saatu tulos
    const [haku, setHaku] = useState('');                                           // Hakukentän tulos

    const getAll = async () => {            
        const response = await fetch("https://node-api-eumaat.herokuapp.com/api/getall");           // Hae kaikki tulokset ja aseta ne results muuttujaan setResults avulla
        const jsonRes = await response.json();
        setResults(jsonRes);
    };
 


    const getOne = async  (e)  => {
        console.log(haku)
        const response = await fetch("https://node-api-eumaat.herokuapp.com/api/get/" + haku.charAt(0).toUpperCase()+ haku.slice(1));        //Tee haun ensimmäisestä kirjaimesta aina iso kirjan, jotta se vastaa tietokannassa olevaa tietoa
        const jsonRes = await response.json();              
        console.log(jsonRes)                                                            // Hae tulos hakukentässä annetun maan nimen perusteella ja aseta se results muuttujaan setResults avulla
        if(jsonRes == null){
            window.alert("Maata ei löydy")
        }else{
        setResults([jsonRes]);

//Liittyy kartan ja kordinaattien määrittämiseen (KESKEN)------------------------------------------------------------------------------

        //pos([jsonRes])                                                               
       // setPosition(jsonRes.coords.lat+","+ jsonRes.coords.lon)
    }
        
    }

    // const pos =  (items) => {
    //     items.map((item, i) => {                                                     
    //         console.log([item.coords.lat +", "+item.coords.lon])
    //         setPosition([item.coords.lat +", "+item.coords.lon])
    //     })
    // }

//Liittyy kartan ja kordinaattien määrittämiseen (KESKEN)-------------------------------------------------------------------------------



    return (
      <div className="container">

            <Card className="search">
                <Card.Body>
                    <Form>
                    <h3>Etsi EU maata</h3>
                    <Form.Control value={haku} type="text" onChange={(e) => {setHaku(e.target.value); console.log(haku)}} placeholder="Maan nimi / Pääkaupunki"/>
                    <br/>
                    <Button id="etsi" onClick={getOne} variant="success">Etsi</Button>&nbsp;&nbsp;
                    <Button id="kaikki" onClick={getAll} variant="primary">Kaikki</Button>
                    </Form>
                </Card.Body>
            </Card>
{/*Kartta ------------------------------------------------------------------*/}
         <Map className="map" center={position} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
      </Map>
{/*Kartta -------------------------------------------------------------------*/}

            <div className="kortit" >

                        {results.map((item, i) => {        //Looppaa APIsta saadut tulokset ja luo niistä kortti elementti, jossa on saatua tietoa
                          return (
                            <Card key={i} className="kortti">
                                <Card.Body  className="korttiStyle">

                                    <Card.Img  variant="top" className="korttiKuva" src={item.lippu} />
                                    <Card.Title  className="title">{item.nimi}</Card.Title>
                                    <Card.Text >{item.pääkaupunki}</Card.Text>
                                    <Card.Text >{(item.asukasluku/1000000).toFixed(2) + " milj."}</Card.Text>
                                    <Button  variant="success" id="position" className="bottom">Kartalla (WIP)</Button>
                                    <Button  variant="secondary" href={item.info} target="_blank" className="bottom">Wikipedia</Button>
                                </Card.Body>
                            </Card>)
                        })}

            </div>



      </div>
    );
}

export default Etusivu

