import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import Lisää from './Lisää'
import Edit from './Edit'
import './css/style.css'
import Delete from './Delete'

function Muokkaa() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getAll = async () => {
        const response = await fetch("http://localhost:8081/api/getall");           //Hae kaikki APIn tulokset ja niiden tiedot listaan, jotta on helppo nähdä mitä haluat muokata 
        const jsonRes = await response.json();                                      // ja saat ID: tätä kautta
        setResults(jsonRes);
    };

 getAll()

}, []);


    return (
        <div  className="container-muokkaa">
            
            <div className="container-lista">
                <ul>
                {results.map((item, i) => {                                           //Looppaa APIsta saadut tulokset ja luo niistä kortti elementti, jossa on saatua tietoa
                          return (
                            <li key={i}><Card className="korttiEdit">
                                <Card.Body className="korttiStyle">

                                    <Card.Img className="korttiKuva" src={item.lippu} />
                                    <Card.Title className="title">{item.nimi}</Card.Title>
                                    <Card.Text>{item.pääkaupunki}</Card.Text>
                                    <Card.Text>{item.asukasluku}</Card.Text>
                                    <Card.Text>{item.lippu}</Card.Text>
                                    <Card.Text>{item.info}</Card.Text>

                                    <Card.Text><b>{"ID : "+item._id}</b></Card.Text>
                                
                                </Card.Body>
                            </Card></li>)
                        })}

                </ul>
            </div>

            <Lisää />               {/*Lisää komponentti*/}

            <Edit />                {/*Edit komponentti*/}

            <Delete />              {/*Delete komponentti*/}
            
        </div>
    )
}

export default Muokkaa
