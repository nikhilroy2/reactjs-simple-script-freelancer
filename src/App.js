import './App.css';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Base from './Layout/Base';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
          </Routes>
        </Base>
      </BrowserRouter>
    </div>
  );
}

export default App;


const Homepage = () => {
  return (
    <div id="Homepage">
      <main>
        <div className="container">
          <div className="row row-cols-3 row-cols-md-4 mt-5 g-4">
            <div className="col">
              <Link to="/add_timer" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Add Timer
              </Link>
            </div>
            <div className="col">
              <Link to="/manage_timers" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Manage Timers
              </Link>
            </div>
            <div className="col">
              <Link to="/add_meditation" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Add Meditation
              </Link>
            </div>
            <div className="col">
              <Link to="/manage_meditations" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Manage Meditations
              </Link>
            </div>

            <div className="col">
              <Link to="/add_affirmations" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Add Affirmations
              </Link>
            </div>
            <div className="col">
              <Link to="/manage_affirmations" className="p-5 d-block text-center border bg-dark text-white rounded border-secondary">
                Manage Affirmations
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}