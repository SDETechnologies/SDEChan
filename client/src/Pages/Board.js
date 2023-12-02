import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Row, Button} from 'react-bootstrap';
import '../styles.css';

export default function Board(props){

    const {name} = useParams();
    const [data, setData] = useState();
    const [threads, setThreads] = useState();

    const getBoardData = async () => {
        const response = await fetch('http://localhost:3009/api/board?name=' + name)
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('Board getBoardData response: ', response);
        setData(response);
    }

    const getThreads = async () => {
        const response = await fetch('http://localhost:3009/api/threads/' + name)
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('Board getBoardData response: ', response);
        setData(response);
    }

    useEffect(() => {
        console.log('Board props: ', props);
        console.log('board name: ', name);

        if(!data){
            getBoardData();
        }
    });

    return(
        <Container>
            <Row className='center-row'>
                {'/' + name + '/'}
            </Row>
            <Row className='center-row'>
                <Button>Create a Thread</Button>
            </Row>
            <Row className='center-row'>
                Threads
            </Row>
            <hr/>
        </Container>
    );
}