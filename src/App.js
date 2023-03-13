import './App.css';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Base from './Layout/Base';
import AddTimer from './Pages/AddTimer/AddTimer';
import ManageTimers from './Pages/ManageTimers/ManageTimers';
import AddMeditation from './Pages/AddMeditation/AddMeditation';
import ManageMeditations from './Pages/ManageMeditations/ManageMeditations';
import AddAffirmations from './Pages/AddAffirmations/AddAffirmations';
import ManageAffirmations from './Pages/ManageAffirmations/ManageAffirmations';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
            <Route path="/add_timer" element={<AddTimer></AddTimer>}></Route>
            <Route path="/manage_timers" element={<ManageTimers></ManageTimers>}></Route>
            <Route path="/add_meditation" element={<AddMeditation></AddMeditation>}></Route>
            <Route path="/manage_meditation" element={<ManageMeditations></ManageMeditations>}></Route>
            <Route path="/add_affirmations" element={<AddAffirmations></AddAffirmations>}></Route>
            <Route path="/manage_affirmations" element={<ManageAffirmations></ManageAffirmations>}></Route>
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