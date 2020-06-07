import React, { useState } from 'react'
import {Form, Card, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
import { Map, Marker, TileLayer } from 'react-leaflet'



const Etusivu = () => {

    const [position, setPosition] = useState([52.5200, 13.4050])                    // Kartan position
    const [marker, setMarker] = useState([1,1])                                        // Merkin position
    const [results, setResults] = useState([]);                                     // APIsta saatu tulos
    const [zoom, setZoom] = useState(4);                                     // APIsta saatu tulos
    const [haku, setHaku] = useState('');                                           // Hakukentän tulos                                    

    const getAll = async () => {            
        // const response = await fetch("https://node-api-eumaat.herokuapp.com/api/getall");           // Hae kaikki tulokset ja aseta ne results muuttujaan setResults avulla
       const response = await fetch("https://node-api-eumaat.herokuapp.com/api/getall");           // Hae kaikki tulokset ja aseta ne results muuttujaan setResults avulla
     
        const jsonRes = await response.json();
        setResults(jsonRes);
        console.log(jsonRes)
    };
 


    const getOne = async  (e)  => {
        console.log(haku)
        if(haku === ''){
            window.alert('Anna maan nimi')
        }else{
        const response = await fetch("https://node-api-eumaat.herokuapp.com/api/get/" + haku.charAt(0).toUpperCase()+ haku.slice(1));        //Tee haun ensimmäisestä kirjaimesta aina iso kirjan, jotta se vastaa tietokannassa olevaa tietoa
        const jsonRes = await response.json();              
        console.log(jsonRes)                                                            // Hae tulos hakukentässä annetun maan nimen perusteella ja aseta se results muuttujaan setResults avulla
        if(jsonRes == null){
            window.alert("Maata ei löydy")
        }else{
        setResults([jsonRes]);
        pos([jsonRes])                                                               
        }
    }
    } //getOne päättyy

  const pos =  (items) => {
      items.map((item, i) => {                                                     
          console.log([item.coords.lat +", "+item.coords.lon])
          setPosition([item.coords.lat, item.coords.lon])
          setMarker([item.coords.lat, item.coords.lon])
          setInterval(function(){setZoom(6)}, 1000)
        
      })
  }
  

  function getPositionMap(e){

    let title = e.target.parentElement.children[1].innerHTML;

    results.map((item, i) => {
        if(title === item.nimi){
            setPosition([item.coords.lat, item.coords.lon])
            setMarker([item.coords.lat, item.coords.lon])
            setZoom(6)
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    })

  }

  let enterEtsi = (e) => {
      
      if (e.keyCode === 13) {
        e.preventDefault()
        document.getElementById("etsi").click();
      }else{

      }
    };

 
 

//Liittyy kartan ja kordinaattien määrittämiseen -------------------------------------------------------------------------------



    return (
      <div className="container">

            <Card className="search">
                <Card.Body>
                    <Form onSubmit={e => {e.preventDefault();}}>
                    <h3>Etsi EU maata</h3>
                    <Form.Control id="input" value={haku} type="text" onKeyUp={enterEtsi} onChange={(e) => {setHaku(e.target.value);}} placeholder="Maan nimi"/>
                    <br/>
                    <Button id="etsi" onClick={getOne} variant="success">Etsi</Button>&nbsp;&nbsp;
                    <Button id="kaikki" onClick={getAll}  variant="primary">Kaikki maat</Button>
                    </Form>
                </Card.Body>
            </Card>
{/*Kartta ------------------------------------------------------------------*/}
         <Map className="map" center={position} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=2c4496dd54cb4815a450770484bbc9e1"
          attribution="&copy; <a href='http://www.thunderforest.com/'>Thunderforest</a>, &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {marker !== [1,1] ? <Marker position={marker}></Marker> : console.log('no marker')}
      </Map>
{/*Kartta -------------------------------------------------------------------*/}

            <div className="kortit" >

                        {results.map((item, i) => {        //Looppaa APIsta saadut tulokset ja luo niistä kortti elementti, jossa on saatua tietoa
                          return (
                            <Card key={i} className="kortti">
                                <Card.Body  className="korttiStyle">

                                    <Card.Img  variant="top" className="korttiKuva" src={item.lippu} />
                                    <Card.Title id="title" className="title">{item.nimi}</Card.Title>
                                    <Card.Text >{item.pääkaupunki}</Card.Text>
                                    <Card.Text >{(item.asukasluku/1000000).toFixed(2) + " milj."}</Card.Text>
                                    <Button  variant="success" id="position" onClick={getPositionMap} className="bottom">Kartalla</Button>
                                    <Button  variant="secondary" href={item.info} target="_blank" className="bottom">Wikipedia</Button>
                                </Card.Body>
                            </Card>)
                        })}

            </div>



      </div>
    );
}

export default Etusivu

