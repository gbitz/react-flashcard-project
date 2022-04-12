import React, {useState, useEffect} from "react";
import {readDeck} from "../utils/api/index"
import {useParams, Link} from "react-router-dom";
import Navbar from "./Navbar"

function Deck() {
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDeck() {
          try {
            const response =  readDeck(deckId, abortController.signal);
            const deckFromAPI = await response;
            setDeck(deckFromAPI);
            setCards(deckFromAPI.cards);
          } catch (error) {
              if (error.name !== 'AbortError') {
                  throw error;
              } else {
                console.log("deck view load error... ", error);
              }
          }
        }
        loadDeck();
        return () => {
            abortController.abort();
          };
      }, [deckId]);


    return (
        <div>
            <div className="mb-2">
                <Navbar deck={deck} currentPage="deck" />
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>

                <Link to="/edit"><button type="button" className="btn btn-primary">Edit</button></Link>
                <Link to={`${deck.id}/study`}><button type="button" className="btn btn-primary">Study</button></Link>
                <Link to="/addCard"><button type="button" className="btn btn-primary">Add Cards</button></Link>

                <button className="btn btn-danger">Future delete deck button</button>

            
            </div>
            
            <h1>Cards</h1>
            {cards.map((card, index)=> {
                return(
                <div className="card mb-2" key={index}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="col">{card.front}</div>
                            <div className="col">{card.back}</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary m-2">Edit</button></Link>
                        <button className="btn btn-danger">Future delete card button</button>
                    </div>
                </div>
                );                
            })}
        </div>
    )
}

export default Deck;