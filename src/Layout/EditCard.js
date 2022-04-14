import React, {useState, useEffect} from "react";
import {readDeck, readCard} from "../utils/api/index";
import {useParams} from "react-router-dom"
import Navbar from "./Navbar"
import CardForm from "./CardForm";

function EditCard() {
    const {deckId, cardId} = useParams();
    const [deck, setDeck] =  useState([]);
    const [card, setCard] = useState({});

    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDeck() {
          try {
            const response =  readDeck(deckId, abortController.signal);
            const deckFromAPI = await response;
            setDeck(deckFromAPI);
            const cardResponse = readCard(cardId, abortController.signal);
            const cardFromAPI = await cardResponse;
            setCard(cardFromAPI)
            
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
        <Navbar deck={deck} currentPage="editCard" />
        <CardForm currentCard={card} deck={deck} formType="edit" />
        </div>
    )

}

export default EditCard