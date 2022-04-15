import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
// import {listDecks} from "../utils/api/index";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import {  Route, Switch, Link,  } from "react-router-dom";
import Study from "./Study";
import Deck from "./Deck";
import AddCard from "./AddCard"
import EditCard from "./EditCard"
import EditDeck from "./EditDeck"

function Layout() {
  // const [decks, setDecks] = useState([])
  
  // useEffect(()=> {
  //   async function loadDecks() {
  //     try {
  //       const response = listDecks();
  //       const decksFromAPI = await response;

  //       setDecks(decksFromAPI);
  //     } catch (error) {
  //       console.log("deck loading error... ", error);
        
  //     }
  //   }
    
  //   loadDecks();
  // },[])
  
  

  return (
    <>

      <Header />
      <div style={{width: '40%', margin: '0 auto'}} className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>

          <Route exact={true} path="/">
            <Link to="/decks/new">
              <button type="button" className="btn btn-primary mb-2"><i class="fa-solid fa-plus"></i> Create Deck</button>
            </Link>
            <Home />    
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact={true} path="/decks/:deckId" >
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new" >
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
