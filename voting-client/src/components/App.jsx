import React, {Component} from 'react';
import {List, Map} from 'immutable';

const pair = List.of('CC', 'DD');
const tally = Map({'CC':5, 'DD':18});

export default class App extends Component{
    render(){
        return React.cloneElement(this.props.children, {
            pair: pair,
            tally:tally,
        });
    }
}