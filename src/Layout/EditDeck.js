import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import Navbar from "./Navbar";
import {updateDeck, readDeck} from "../utils/api/index"

function EditDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);

    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDeck() {
            try {
            const response =  readDeck(deckId, abortController.signal);
            const deckFromAPI = await response;
            setDeck(deckFromAPI);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    throw error;
                } else {
                console.log("deck edit load error... ", error);
                }
            }
        }
        loadDeck();
        return () => {
            abortController.abort();
            };
        }, [deckId]);
    
    const nameInputHandler = (event) => {
        setDeck(
            {...deck,
            name: event.target.value}
        )
    }

    const descriptionInputHandler = (event) => {
        setDeck(
            {...deck,
            description: event.target.value}
        )
    }

    const submitFormHandler = async (event) => {
        event.preventDefault();
        const response = await updateDeck(deck);
        
        
        history.push(`/decks/${response.id}`)
    }

    const cancelHandler = async (event) => {
        event.preventDefault();
        await history.push("/")
    }    

    return (
        <div>
            <Navbar deck={deck} currentPage="editDeck"/>
            <h1>Create Deck</h1>
            <form onSubmit={submitFormHandler}>
                <div className="form-group">
                <label>
                    <h3>Name</h3>
                </label>
                    <input
                        className="form-control"
                        name="name"
                        id="name"
                        type="text"
                        defaultValue={deck.name}
                        onChange={nameInputHandler}
                    />

                <label>
                    <h3>Description</h3>    
                </label>              
                    <textarea 
                        className="form-control"
                        name="description"
                        id="description"
                        rows="4"
                        onChange={descriptionInputHandler}
                        defaultValue={deck.description}
                    />  
                </div>

                <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;