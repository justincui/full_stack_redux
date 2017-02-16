import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate,
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';

import {Results} from '../../src/components/Results';

describe('Results', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('AA', 'BB');
        const tally = Map({AA: 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [t0, t1] = entries.map(e => e.textContent);
        expect(entries.length).to.equal(2);
        expect(t0).to.contain('AA');
        expect(t0).to.contain('5');
        expect(t1).to.contain('BB');
        expect(t1).to.contain('0');
    });

    it('invoke the next callback when the next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;
        const pair = List.of('AA', 'BB');
        const component = renderIntoDocument(
            <Results
                pair={pair}
                tally={Map()}
                next={next}
            />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));
        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results
                winner="AA"
                pair={List.of("AA", "BB")}
                tally={Map()}
            />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('AA');
    });
});