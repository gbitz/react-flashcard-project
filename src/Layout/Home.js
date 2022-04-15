import React, {useState, useEffect} from "react";
import {listDecks, deleteDeck} from "../utils/api/index";
import {Link, useHistory} from "react-router-dom"

function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState([])
  
    useEffect(()=> {
      async function loadDecks() {
        try {
          const response = listDecks();
          const decksFromAPI = await response;
  
          setDecks(decksFromAPI);
        } catch (error) {
          console.log("deck loading error... ", error);
          
        }
      }
 
      loadDecks();
    },[]);

    
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

    return decks.map((deck, index) => {
        return (
                <div className="card mb-2"   key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                        <p className="card-text">{deck.description}</p>
                        <Link to={`/decks/${deck.id}`}>
                            <button type="button" className="btn btn-secondary m-2"><i className="fa-solid fa-eye"></i> View</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button type="button" className="btn btn-info m-2"><i className="fa-solid fa-book"></i> Study</button>
                        </Link>
                        <button style={{float:'right'}} type="button" className="btn btn-danger m-1" onClick={()=>{deleteDeckHandler(deck.id)}}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        {/* <DeleteButton itemToDelete={deck} type="deck" /> */}
                    </div>
                </div>
            )
    })
}

export default Home