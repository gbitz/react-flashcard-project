import React, {useState, useEffect} from "react";
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index"
import {useParams, Link, useHistory} from "react-router-dom";
import Navbar from "./Navbar"

function Deck() {
    const history = useHistory();
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
      
      async function deleteDeckHandler(deckId) {
        if (window.confirm("Are you certain you want to Delete this deck?")) {
            try {
                await deleteDeck(deckId);
                console.log("Deck Deleted...");
                history.push("/")
                window.location.reload();
            } catch (error) {
                console.log("Deck Deletion Error... ", error);
            }
        }
      }

      async function deleteCardHandler(cardId) {
        if (window.confirm("Are you certain you want to Delete this card?")) {
            try {
                await deleteCard(cardId);
                console.log("Card Deleted...");
            } catch (error) {
                console.log("Card Deletion Error... ", error);
            }
            window.location.reload();
        }
      }

    return (
        <div>
            <div className="mb-2">
                <Navbar deck={deck} currentPage="deck" />
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>

                <Link to={`/decks/${deck.id}/edit`}><button type="button" className="btn btn-primary m-1"><i className="fa-solid fa-pencil"></i> Edit</button></Link>
                <Link to={`${deck.id}/study`}><button type="button" className="btn btn-primary m-1"><i className="fa-solid fa-book"></i> Study</button></Link>
                <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary m-1"><i className="fa-solid fa-plus"></i> Add Cards</button></Link>
                <button style={{float:'right'}} type="button" className="btn btn-danger m-1" onClick={()=>{deleteDeckHandler(deck.id)}}>
                    <i className="fas fa-trash-alt"></i>
                </button>
                {/* <DeleteButton itemToDelete={deck} type="deck" /> */}

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
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary m-1"><i className="fa-solid fa-pencil"></i> Edit</button></Link>
                        <button style={{float:'right'}} type="button" className="btn btn-danger m-1" onClick={()=>{deleteCardHandler(card.id)}}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        {/* <DeleteButton itemToDelete={card} type="card" /> */}
                    </div>
                </div>
                );                
            })}
        </div>
    )
}

export default Deck;