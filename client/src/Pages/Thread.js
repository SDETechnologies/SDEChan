import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Row, Button} from 'react-bootstrap';
import '../styles.css';

export default function Thread (props) {

    const {tag, id} = useParams();

    return(
        <Container>
            tag: {tag}
        </Container>
    );
}