import {Home} from '../Home/Home';
import {Question} from '../Question/Question';
import {Finished} from '../Finished/Finished';
import {Route} from "react-router-dom";  //for setting routes

function App() {
  return (
    <div className="App">
          <Route path="/" exact render={ () => <Home/>}/>
          <Route path="/question" exact render={ () => <Question/>}/>
          <Route path="/finished" exact render={ () => <Finished/>}/>
    </div>
  );
}

export default App;
