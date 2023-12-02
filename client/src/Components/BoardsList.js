import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import '../styles.css';

export default function BoardsList(props){

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
        <Container>
            {
                boards && boards.length > 0
                    ? (
                        boards.map(board => {
                            console.log('board: ', board);
                            const boardName = board.name;
                            const boardTag = '/' + board.tag + '/';
                            const boardLink = '/' + board.tag;
                            return(
                                <Row className='center-row'>
                                    <a href={boardLink}>{boardName}</a>
                                </Row>
                            );
                            
                        })
                    )
                    : <p>No boards</p>
            }
        </Container>
    );
}