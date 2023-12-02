import logo from './logo.svg';
import './App.css';
import {Container, Row} from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainNavbar from './Components/MainNavbar';
import Home from './Pages/Home';
import Board from './Pages/Board';
import Thread from './Pages/Thread';

function App() {
  return (
    <div className="App">
      <MainNavbar/>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/:tag/" element={<Board/>}></Route>
            <Route path="/:tag/thread/:id" element={<Thread/>}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
