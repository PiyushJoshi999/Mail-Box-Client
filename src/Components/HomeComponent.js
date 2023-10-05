import React, {Fragment, useState} from "react";
import { Button } from "react-bootstrap";
import Mailer from "./Mailer";
//import Header from "./Header";

const HomeComponent = () => {
    const [showMailLayout, setShowMailLayout] = useState(false);

    const mailLayoutHandler = (e) => {
        e.preventDefault();

        setShowMailLayout(!showMailLayout);
    }
   
    return(
        <Fragment>
            <Button variant="warning" size="lg" onClick={mailLayoutHandler}>Compose Email!</Button>
            {showMailLayout && <Mailer />}
        </Fragment>
    );

};

export default HomeComponent;