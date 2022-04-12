import React from "react";
import {Link} from "react-router-dom"

function Home({decks}) {
    return decks.map((deck, index) => {
        return (
                <div className="card mb-2"  key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                        <p className="card-text">{deck.description}</p>
                        <Link to={`/decks/${deck.id}`}>
                            <button type="button" className="btn btn-secondary m-2">View</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button type="button" className="btn btn-info m-2">Study</button>
                        </Link>
                        <button type="button" className="btn btn-danger m-2">Delete</button>
                    </div>
                </div>
            )
    })
}

export default Home