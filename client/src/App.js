import logo from './logo.svg';
import './App.css';
import {Container, Row} from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home';
import Board from './Pages/Board';

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/boards/:name/" element={<Board/>}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
