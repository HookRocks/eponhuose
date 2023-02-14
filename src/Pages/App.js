import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from "./main"

function App() {
  return (
    <Provider>
      <div className='App pt-14'>
        <Router>
          <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Home />} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
