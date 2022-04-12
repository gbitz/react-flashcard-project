import React, { useState, useEffect } from "react";
import {readDeck} from "../utils/api/index";
import { useParams, Link, useHistory} from "react-router-dom";
import Navbar from "./Navbar";


function Study() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const deckId = useParams().deckId;
    const [cardFront, setCardFront] = useState(true);
    const [cardCounter, setCardCounter] = useState(0);
    const history = useHistory();

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
                console.log("deck Study error... ", error);
              }
          }
        }
        loadDeck();
        return () => {
            abortController.abort();
          };
      }, [deckId])

    const nextCardHandler = (event) => {
        if (cardCounter +1  === cards.length) {
            if(window.confirm("Restart Cards? Or click 'cancel' to return to Homepage")) {
                console.log("...restarting deck");
                setCardCounter(0);
                setCardFront(true);           
            } else {
                history.push("/");
            }  
        } else {
            setCardCounter((currentcount) => currentcount + 1);
        }
    }

    const flipCardHandler = (event) => {
        if (cardFront === true) {
            setCardFront(false);
        } else {
            setCardFront(true);
        }
    }
    
    if (cards.length < 3) {
        return (
            <div>
                <Navbar deck={deck} currentPage="study" />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Not Enough Cards</h5>
                        <Link to="/"><button className="btn btn-primary">Add more cards</button></Link>
                    </div>
                </div>
            </div>
        );
    } 
    if (cards.length >= 3) {
        if (cardFront) {
            return (
                <div>
                    <Navbar deck={deck} />
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{cardCounter + 1} of {cards.length}</h5>
                            <p className="card-text">{cards[cardCounter].front}</p>
                            <button type="button" className="btn btn-primary" onClick={flipCardHandler}>Flip</button>
                            <button type="button" className="btn btn-primary" onClick={nextCardHandler}>Next Card</button>

                        </div>
                    </div>
                </div>
            )

        } else {
            return (
                <div>
                    <Navbar deck={deck} />
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{cardCounter+ 1} of {cards.length}</h5>
                            <p className="card-text">{cards[cardCounter].back}</p>
                            <button type="button" className="btn btn-primary" onClick={flipCardHandler}>Flip</button>
                            <button type="button" className="btn btn-primary" onClick={nextCardHandler}>Next Card</button>
                        </div>
                    </div>
                </div>
            )

        }
    }
    return "loading..."


}

export default Study