import React from 'react';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <header className='bg-dark border-bottom border-secondary'>
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Logo</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/add_timer">Add timer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/manage_timers">Manage timers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/add_meditation">Add meditation</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/manage_meditations">Manage meditations</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/add_affirmations">Add affirmations</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/manage_affirmations">Manage affirmations</Link>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="text" placeholder="Search" />
                                <button className="btn btn-primary" type="button">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>

        </header>
    );
}

export default Header;