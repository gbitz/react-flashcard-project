import React, {useState} from "react";
import {createCard, updateCard} from "../utils/api/index";
import {useHistory} from "react-router-dom";

function CardForm({currentCard={}, deck, deckId, formType}) {
    
    const [card, setCard] = useState({});
    const history = useHistory();

    const submitHandler = async (event) => {
        if (formType === "add") {
            try {
                await createCard(deckId, card)
                console.log("created new card");
            } catch (error) {
                console.log("error creating card: ", error);    
            }
        } else if (formType === "edit") {
            try {
                currentCard = {
                    ...currentCard,
                    ...card
                }               

                await updateCard(currentCard)
                console.log("updated card");
            } catch (error) {
                console.log("error updating card: ", error);
            }
        }
        window.location.reload();
    }

    const doneHandler = async (event) => {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
    }

    const inputFrontHandler = (event) => {
        setCard({...card, front: event.target.value})
    }

    const inputBackHandler = (event) => {
        setCard({...card, back: event.target.value})
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">

                    <label>
                        <h4>Card Front</h4>
                    </label>
                    <textarea 
                        className="form-control"
                        name="front"
                        id="front"
                        value={card.front}
                        onChange={inputFrontHandler}
                        placeholder={currentCard ? currentCard.front : ""}
                    />
                </div>
                <div className="form-group">

                    <label>
                        <h4>Card Back</h4>
                    </label>
                    <textarea 
                        className="form-control"
                        name="back"
                        id="back"
                        value={card.back}
                        onChange={inputBackHandler}
                        placeholder={currentCard ? currentCard.back : ""}
                    />
                </div>
                
                <button type="button" className="btn btn-secondary m-2" onClick={doneHandler}>Done</button>
                <button type="submit" className="btn btn-primary m-2">Save</button>
                
            </form>
        </div>
    )
}

export default CardForm;