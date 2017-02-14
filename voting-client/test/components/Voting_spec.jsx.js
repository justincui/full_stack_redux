/**
 * Created by justicui on 2/13/17.
 */
import {expect} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate,
} from 'react-addons-test-utils';

import Voting from '../../src/components/Voting';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["AA", "BB"]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('AA');
        expect(buttons[1].textContent).to.equal('BB');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Voting pair={["AA", "BB"]} vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);
        expect(votedWith).to.equal('AA');
    });

    it('disable buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={["AA", "BB"]} hasVoted="AA"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });
});


