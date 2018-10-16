import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class ReturnButton extends Component {
    constructor(props){
        super(props)
        this.onBackButtonPress = this.onBackButtonPress.bind(this);
    
    }
    onBackButtonPress() {
        this.props.children.history.goBack()
    }
    render() {
        return (
            <div className="">
                <Button className="" onClick={() => this.onBackButtonPress()}>
                    ←
                </Button>
            </div>
        );
    }
}

export default ReturnButton;