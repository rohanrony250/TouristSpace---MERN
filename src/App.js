// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import NewPlace from './pages/Places/NewPlaces-Page';
import Users from './pages/Users/Users-Page';
import MainNavigation from "./Shared/Components/Navigation/Main-Header/MainNavigation"

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
          <Route path = "/places/new" exact>
              <NewPlace/>
          </Route>
        </Switch>
      </main>
     </Router>
    </div>
  );
}

export default App;
