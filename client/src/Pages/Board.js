import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Row, Button} from 'react-bootstrap';
import CreateThreadForm from '../Components/CreateThreadForm';
import '../styles.css';
import ThreadPreview from '../Components/ThreadPreview';

export default function Board(props){

    const {tag} = useParams();
    const [data, setData] = useState();
    const [threads, setThreads] = useState();
    const [showCreateThread, setShowCreateThread] = useState(false);

    const getBoardData = async () => {
        const response = await fetch('http://localhost:3009/api/board?tag=' + tag)
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('Board getBoardData response: ', response);
        setData(response);
    }

    const getThreads = async () => {
        const response = await fetch('http://localhost:3009/api/threads?tag=' + tag)
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('Board getThreads response: ', response);
        setThreads(response);
    }

    useEffect(() => {
        console.log('Board props: ', props);
        console.log('board tag: ', tag);

        if(!data){
            getBoardData();
        }
        if(!threads){
            getThreads();
        }
    });

    return data
        ? (
        <Container>
            <Row className='center-row'>
                {'/' + tag + '/ - ' + data.name}
            </Row>
            <hr/>
            {
                showCreateThread
                    ? (
                        <Row className='center-row'>
                            <CreateThreadForm boardData={data}/>
                            <hr className='padding-small'/>
                        </Row>
                    )
                    : <></>
            }
            {!showCreateThread && (
                <Row className='center-row'>
                    <Button onClick={() => {setShowCreateThread(true)}}>Create a Thread</Button>
                </Row>
            )}

            <Row className='center-row padding-small'>
                Threads
            </Row>
            <hr/>
            {threads && threads.length != 0 && (
                threads.map(thread => {
                    console.log('thread: ', thread);
                    return(
                        <ThreadPreview threadData={thread}/>
                    );
                })
            )}
        </Container>
    )
        : <></>
}