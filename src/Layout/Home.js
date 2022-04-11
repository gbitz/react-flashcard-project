import React from "react";
import {Link} from "react-router-dom"

function Home({decks}) {
    return decks.map((deck, index) => {
        return (
                <div className="card"  key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                        <p className="card-text">{deck.description}</p>
                        <button type="button" className="btn btn-secondary">View</button>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button type="button" className="btn btn-info">Study</button>
                        </Link>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            )
    })
}

export default Home