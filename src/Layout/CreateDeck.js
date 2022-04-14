import React, {useState} from "react";
import {createDeck} from "../utils/api/index";
import Navbar from "./Navbar.js";
import {useHistory} from "react-router-dom";

function CreateDeck() {
    const [deck, setDeck] = useState([]);
    const history = useHistory();

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
        const response = await createDeck(deck);
        
        
        history.push(`/decks/${response.id}`)
    }

    const cancelHandler = async (event) => {
        event.preventDefault();
        await history.push("/")
    }
    return (
        <div>
        <Navbar deck={deck} currentPage="createDeck" />
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
                    value={deck.name}
                    onChange={nameInputHandler}
                    placeholder="Deck Name"
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
                    value={deck.description}
                    placeholder="Brief description of the deck"
                />  
            </div>

            <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        
        </div>
    )
}

export default CreateDeck