import React, {useEffect, useState} from 'react';
import {Container, Row, Button, Form, Col} from 'react-bootstrap';
import util from '../util';
import '../styles.css';

export default function CreateThreadForm(props){

    const [name, setName] = useState('Anonymous');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');
    const [uploadFile, setUploadFile] = useState();
    const [newFilename, setNewFilename] = useState();
    const [message, setMessage] = useState('');

    
    const createThread = async (e) => {
        console.log('createThread()');
        e.preventDefault();
        if(name == '' || name == null){
            setMessage('Name field is empty');
            return;
        }
        if(subject == '' || subject == null){
            setMessage('Subject field is empty');
            return;
        }
        if(subject.length <= 4){
            setMessage('Subject must be at least 5 characters');
            return;
        }
        if(comment == '' || comment == null){
            setMessage('Comment field is empty');
            return;
        }
        if(comment.length <= 10){
            setMessage('Comment must be at least 10 characters');
            return;
        }
        if(!uploadFile){
            setMessage('Valid thumbnail image file must be included');
            return;
        }

        const thumbnailInfo = await sendFileToServer(uploadFile);
        const imageInfo = await createImage(thumbnailInfo);


        const response = await fetch('http://localhost:3009/api/createthread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                board_id: props.boardData.id,
                subject: subject,
                user_name: name,
                comment: comment,
                thumbnail_url: newFilename,
                thumbnail_info: thumbnailInfo,
                thumbnail_image_id: imageInfo.id
            })
        })
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

            // console.log('');
        
    }

    const validateFile = async (file) => {
        const fileType = file.type;
        if(!fileType.includes("image")){
            return {
                valid: false,
                message: 'File must be an image'
            };
        }

        return {
            valid: true
        }
    }

    const handleFileUpload = async (e) => {
        e.preventDefault();
        console.log('e: ', e.target.files[0]);
        const file = e.target.files[0];

        console.log('file: ', file);

        const validateFileResponse = await validateFile(file);

        console.log('validateFileResponse: ', validateFileResponse);

        if(validateFileResponse.valid == false){
            setUploadFile(null);
            setMessage(validateFileResponse.message);
            return;
        }

        

        setMessage('');
        setUploadFile(file);
        setNewFilename(newFilename);

    }

    const sendFileToServer = async (file) => {

        const fileType = file.type.split('/')[1];
        const newFilename = await util.generateImageFilename() + '.' + fileType;
        console.log('newFilename: ', newFilename);

        const formData = new FormData();
        formData.append("name", newFilename);
        formData.append("file", file);

        const fetchURL = 'http://localhost:3009/fileupload';
        const response = await fetch(fetchURL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));
        console.log('CreateThreadForm sendFileToServer response: ', response)
        return response;
    }

    const createImage = async (thumbnailInfo) => {

        console.log('createImage(thumbnailInfo=',thumbnailInfo,')');

        const filename = thumbnailInfo.filename;
        const fileType = thumbnailInfo.mimetype.split('/')[1];

        const fetchURL = 'http://localhost:3009/api/insertimage';
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                file_name: filename,
                file_type: fileType
            })
        })
            .then(res => res.json())
            .then(data => {return data})
            .catch(err => console.log('error: ', err));

        console.log('CreateThreadForm createImage response: ', response);
        return response;
    }

    useEffect(() => {
        console.log('CreateThreadForm props: ', props);
    });

    return(
        <Row className='center-row'>
            <Row className='center-row'>Create a thread</Row>
            <Form onSubmit={(e) => createThread(e)}>
                <table>
                    <tr>
                        <th>Name</th>
                        <th><Form.Control value={name} placeholder='Anonymous' onChange={(e) => {console.log('new name: ', e.target.value);setName(e.target.value)}}></Form.Control></th>
                    </tr>
                    <tr>
                        <th>Subject</th>
                        <th><Form.Control value={subject} onChange={(e) => {setSubject(e.target.value)}}></Form.Control></th>
                    </tr>
                    <tr>
                        <th>Comment</th>
                        <th className='no-padding-no-margin'><textarea rows="4" cols="48" value={comment} onChange={(e) => {setComment(e.target.value)}}></textarea></th>
                    </tr>
                    <tr>
                        <th>File</th>
                        <td><input className='fill-container no-padding-no-margin' type='file' onChange={(e) => handleFileUpload(e)}></input></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td><button className='fill-container' type='submit'>Create Thread</button></td>
                    </tr>
                </table>
            </Form>
            {message != '' && (
                // <Row className='center-row'>
                    <p className='text-danger'>{message}</p>
                // </Row>
            )}
        </Row>
    );
}