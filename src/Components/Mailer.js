import {Button, Form} from 'react-bootstrap';
//import JoditEditor from 'jodit-react';
import React, {useState, useRef} from 'react';
import { useSelector } from 'react-redux';


const Mailer = () => {

    //const editor = useRef(null);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    //const [from, setFrom] = useState('');
    const email = useSelector(state => state.user.email);
    
	

    const sendEmail = (e) => {
        e.preventDefault();

        const mailData = {
            to : to,
            subject : subject,
            message: message,
            from: email
        }
        console.log(mailData);
        fetch('https://mail-box-client-22a46-default-rtdb.firebaseio.com/mailData.json',{
            method: 'POST',
            body: JSON.stringify(mailData),
            headers: {
                'Content-Type': 'application/json' 
            }
        }).then((res) => {
            if(res.ok){
                console.log(res)
            }
            if(!res.ok){
                alert('Mail is not sent');
            }
        }).catch((err) => {
            alert(err);
        });

        setTo('');
        setSubject('');
        setMessage('');

    }


  return (
    <Form onSubmit={sendEmail}>
           
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>From : </Form.Label>
        <Form.Control plaintext readOnly defaultValue={email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>To : </Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={to} onChange={(e) => setTo(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control placeholder='Write Message...' as="textarea" rows={8} onChange={(e) => setMessage(e.target.value)} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
}

export default Mailer;