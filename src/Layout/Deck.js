import React, {useState, useEffect} from "react";
import {readDeck} from "../utils/api/index"
import {useParams, Link} from "react-router-dom";
import Navbar from "./Navbar"
import DeleteButton from "./DeleteButton";

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

                <Link to={`/decks/${deck.id}/edit`}><button type="button" className="btn btn-primary m-1">Edit</button></Link>
                <Link to={`${deck.id}/study`}><button type="button" className="btn btn-primary m-1">Study</button></Link>
                <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary m-1">Add Cards</button></Link>

                <DeleteButton itemToDelete={deck} type="deck" />

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
                        <DeleteButton itemToDelete={card} type="card" />
                    </div>
                </div>
                );                
            })}
        </div>
    )
}

export default Deck;