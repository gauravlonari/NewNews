import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import React from 'react'
import VisitCount from './VisitCount';

export default function Navbar(props) {
  
    return (
      <>
      <nav className="navbar sticky-top navbar-expand-sm bg-dark navbar-dark" style={{zIndex:2}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewNews</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li> */}
              <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><p className='visually-hidden'></p></li>
                  <li><Link className="dropdown-item" to="/business">Business</Link></li>
                  <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                  <li><Link className="dropdown-item" to="/general">General</Link></li>
                  <li><Link className="dropdown-item" to="/health">Health</Link></li>
                  <li><Link className="dropdown-item" to="/science">Science</Link></li>
                  <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                  <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Country
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/business">Business</Link></li>
                </ul>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item align-self-center mx-3">
                <VisitCount/>
              </li>
              
            </ul> 
            <span className="navbar-text">
              Daily Dose of Latest News!
            </span>
            <button onClick={props.changeTheme} className="btn-secondary me-3 btn-sm btn mx-3">Toggle Dark Mode</button>
          </div>
        </div>
      </nav>
      </>
    )
}

Navbar.propTypes={
  theme:PropTypes.object.isRequired,
}