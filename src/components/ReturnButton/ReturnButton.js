import React, { Component } from 'react';
import './ReturnButton.css';

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
                <div className="returnbutton" onClick={() => this.onBackButtonPress()}>
                    ←
                </div>
            </div>
        );
    }
}

export default ReturnButton;