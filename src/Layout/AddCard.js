import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {readDeck} from "../utils/api/index";
import Navbar from "./Navbar"
import CardForm from "./CardForm";

function AddCard() {
    const [deck, setDeck] = useState([]);
    // const [cards,setCards] = useState([]);
    const {deckId} = useParams();
    
    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDeck() {
          try {
            const response =  readDeck(deckId, abortController.signal);
            const deckFromAPI = await response;
            setDeck(deckFromAPI);
            // setCards(deckFromAPI.cards);
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

    return(
        <div>
            <Navbar deck={deck} currentPage="addCard" />
            <h1>Add Card to Deck</h1>
            <CardForm deck={deck} deckId={deckId} formType="add" />
        </div>
    )
}

export default AddCard;