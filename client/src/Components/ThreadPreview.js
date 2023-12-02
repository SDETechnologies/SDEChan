import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import '../styles.css';

export default function ThreadPreview(props){

    const [imageData, setImageData] = useState();

    const getImageData = async () => {
        const imageID = props.threadData.thumbnail_image_id;
        const fetchURL = 'http://localhost:3009/image?id=' + imageID;
        console.log('fetchURL: ', fetchURL);
        const response = await fetch(fetchURL)
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('ThreadPreview getImageData response: ', response);
        setImageData(response);
    }

    useEffect(() => {
        console.log('ThreadPreview props: ', props);
        if(!imageData){
            getImageData();
        }
    });

    return imageData ? (
        <Container>
            <Row>
                <a href={'/' + props.threadData.tag + '/thread/' + props.threadData.id}>
                    <img className='thread-thumbnail-img'  src={'http://localhost:3009/' + imageData.file_name + '.' + imageData.file_type}></img>
                </a>
                
            </Row>
            <Row>
                {props.threadData.subject}
            </Row>
            <Row>
                {props.threadData.comment}
            </Row>
        </Container>
    ) : <></>
}