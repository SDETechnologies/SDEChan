import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import BoardsList from '../Components/BoardsList';

export default function Home(props){
    return(
        <Container>
            <Row className='center-row'>
                <h5>SDE Chan Technologies</h5>
            </Row>
            <Row className='center-row'>
                Boards List
            </Row>
            <hr/>
            <BoardsList/>
        </Container>
    );
}