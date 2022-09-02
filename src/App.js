import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './components/Navbar';
import {Routes,HashRouter as Router,Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import './css/themes.css'

import React, { useState ,createContext, useEffect } from 'react'
import News from './components/News';
import Alert from './components/Alert';
import Error404 from './components/Error404';
import About from './components/About';

export const context=createContext();

export default function App(){
  let pageSize=20;
  let apiKey=process.env.REACT_APP_NEWS_API_KEY;
  
  const [progress,setProgress]=useState(0);

  const dark={color:"#FAF9F6",backgroundColor:"#121212"}
  const light={color:"#000",backgroundColor:"#fff"}

    const [theme,setTheme]=useState(light);
    const toggleTheme=()=>{
        if(theme.color===dark.color){
            setTheme(light);
            document.body.classList.toggle("theme-dark");
            showAlert("success","Switched to Light Mode") 
          }
          else{
            setTheme(dark);
            document.body.classList.toggle("theme-dark"); 
            showAlert("success","Switched to Dark Mode") 
        }
    }

  const [alert,setAlert]=useState(null);
  const showAlert=(type,msg,time=1500,toHide=true)=>{
    setAlert({msg:msg,type:type});
    if(toHide){
      setTimeout(() => {
        setAlert(null);
      }, time);
    }
  }
  useEffect(()=>{showAlert("success","Welcome to NewNews. Daily Dose of Latest News!",0,false)},[])
    return (
      <>
      <Router>
          <Navbar theme={{}} changeTheme={toggleTheme}></Navbar>
          <LoadingBar progress={progress} height={3} onLoaderFinished={()=>setProgress(0)}></LoadingBar>
          <Alert alert={alert}/>
          <context.Provider value={{Alert:showAlert,theme:theme}}>
            <Routes>
              <Route path='/'               element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="Daily News"/>}></Route>
              <Route path='/business'       element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="business" key="business"/>}></Route>
              <Route path='/entertainment'  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="entertainment" key="entertainment"/>}></Route>
              <Route path='/general'        element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="general" key="general"/>}></Route>
              <Route path='/health'         element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="health" key="health"/>}></Route>
              <Route path='/science'        element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="science" key="science"/>}></Route>
              <Route path='/sports'         element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="sports" key="sports"/>}></Route>
              <Route path='/technology'     element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="technology" key="technology"/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='*' element={<Error404 theme={theme}/>}/>
            </Routes>
          </context.Provider>
      </Router>
      </>
    )
}
