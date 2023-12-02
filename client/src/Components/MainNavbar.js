import React, {useEffect, useState} from 'react';
import {Container, Row, Navbar, Nav} from 'react-bootstrap';
import '../styles.css';

export default function MainNavbar(props){

    const [boards, setBoards] = useState();

    const getBoards = async () => {
        const response = await fetch('http://localhost:3009/api/getallboards')
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('BoardsList getBoards response: ', response);
        setBoards(response);
    }

    useEffect(() => {
        if(!boards){
            getBoards();
        }
    });

    return(
        <Navbar>
            <Container fluid>
                <Nav className='me-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    {boards && boards.map(board => {
                        const boardTag = '/' + board.tag + '/';
                        const boardLink = '/boards' + boardTag;
                        return(
                            <Nav.Link href={boardLink}>{boardTag}</Nav.Link>
                        );
                    })}
                </Nav>
            </Container>
        </Navbar>
    );
}