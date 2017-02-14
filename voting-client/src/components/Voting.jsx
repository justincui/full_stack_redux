import React, {Component} from 'react';

export default class Voting extends Component{
    render(){
        return <div className="voting">
            {this.props.pair.map(entry=>
                <button key={entry}>
                    <h1>{entry}</h1>
                </button>
            )}
        </div>
    }
}