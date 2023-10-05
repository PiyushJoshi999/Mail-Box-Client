import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Alert, Button } from 'react-bootstrap';

const Sent = () => {
    const [mailDataList, setMailDataList] = useState([]);
    const [error, setError] = useState('');
    //const [status, setStatus] = useState('UnSeen');

    useEffect(() => {
        fetch('https://mail-box-client-22a46-default-rtdb.firebaseio.com/mailData.json')
        .then((res) => {
            if (res.ok) {
                return res.json(); // Parse response body as JSON
            }
             setError('Something went wrong');
        })
        .then((data) => {
            const mailData = [];
            for (const key in data) {
                mailData.push({
                    id: key,
                    to: data[key].to,
                    subject: data[key].subject,
                    message: data[key].message,
                });
            }
            setMailDataList(mailData);
        })
        .catch((err) => {
            setError(err);
        });
    }, []);


    const handleDeleteMail = (mailId) => {
        // Update the mailDataList state to remove the mail being deleted
        setMailDataList(prevList => prevList.filter(mail => mail.id !== mailId));

        // Delete the mail data from Firebase
        fetch(`https://mail-box-client-22a46-default-rtdb.firebaseio.com/mailData/${mailId}.json`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Mail deleted successfully from Firebase');
            } else {
                 setError('Failed to delete mail from Firebase');
            }
        })
        .catch(error => {
            setError(error);
        });
    };

    const handleAccordionClick = (mailId) => {
        // Update the status of the clicked mail to 'Seen'
        setMailDataList(prevList =>
            prevList.map(mail =>
                mail.id === mailId ? { ...mail, status: 'Seen' } : mail
            )
        );
    };

    return (
        <Fragment>
            <ul>
                {error && <Alert variant='danger'>{error}</Alert>}
                {mailDataList.map((mail) => (
                     <Accordion>
                     <Accordion.Item eventKey={mail.id}>
                       <Accordion.Header onClick={() => handleAccordionClick(mail.id)}>To: {mail.to}, Subject: {mail.subject}, Status: {mail.status}</Accordion.Header>
                       <Accordion.Body>
                        {mail.message}
                        <Button variant="danger" onClick={() => handleDeleteMail(mail.id)}>Delete</Button>
                       </Accordion.Body>
                     </Accordion.Item>
                   </Accordion>
                ))}
            </ul>
        </Fragment>
    );
};

export default Sent;
