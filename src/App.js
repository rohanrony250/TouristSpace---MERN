// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import NewPlace from './pages/Places/NewPlaces-Page';
import Users from './pages/Users/Users-Page';
import UserPlaces from "./pages/Places/UserPlaces"
import MainNavigation from "./Shared/Components/Navigation/Main-Header/MainNavigation"
import Editplace from "./pages/Places/EditPlaces";

function App() {
  return (
    <div className="App">
     <Router>
       <MainNavigation />
       <main>
        <Switch>
          <Route path = "/" exact>
            <Users />
          </Route>
          <Route path = "/:uID/places" exact>
            <UserPlaces />
          </Route>
          <Route path = "/places/new" exact>
            <NewPlace/>
          </Route>
          <Route path = "/places/:placeID" exact>
            <Editplace />
          </Route>
        </Switch>
      </main>
     </Router>
    </div>
  );
}

export default App;
