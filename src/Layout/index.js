import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {listDecks} from "../utils/api/index"
import Home from "./Home"
// import CreateDeck from "./CreateDeck"
import {  Route, Switch } from "react-router-dom";
import Study from "./Study"

function Layout() {
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
  },[])
  
  

  return (
    <>

      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <button type="button" className="btn btn-primary">Create Deck</button>
            <Home decks={decks} />    
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route>      
            <NotFound />
          </Route>  

        </Switch>
      </div>
    </>
  );
}

export default Layout;
