import React, { useState, useEffect } from "react";
import {readDeck} from "../utils/api/index";
import { useParams, Link, useHistory} from "react-router-dom";
import Navbar from "./Navbar";


function Study() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const {deckId} = useParams();
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
        setCardFront(true);           
        if (cardCounter +1  === cards.length) {
            if(window.confirm("Restart Cards? Or click 'cancel' to return to Homepage")) {
                console.log("...restarting deck");
                setCardCounter(0);
            } else {
                history.push("/");
            }  
        } else {
            setCardCounter((currentcount) => currentcount + 1);
        }
    }

    const flipCardHandler = (event) => {
        setCardFront(!cardFront)

    }
    
    if (cards.length < 3) {
        return (
            <div>
                <Navbar deck={deck} currentPage="study" />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Not Enough Cards</h5>
                        <Link to="/"><button className="btn btn-primary m-2">Add more cards</button></Link>
                    </div>
                </div>
            </div>
        );
    } 
    if (cards.length >= 3) {

            return (
                <div>
                    <Navbar deck={deck} currentPage="study"/>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card {cardCounter + 1} of {cards.length}</h5>
                            <p className="card-text">{cardFront ? cards[cardCounter].front : cards[cardCounter].back}</p>
                            
                            
                            <button type="button" className="btn btn-primary m-2" onClick={flipCardHandler}>Flip</button>
                            {!cardFront ?<button type="button" className="btn btn-primary m-2" onClick={nextCardHandler}>Next</button> : ""}
                            

                        </div>
                    </div>
                </div>
            )
    }
    return "loading..."


}

export default Study