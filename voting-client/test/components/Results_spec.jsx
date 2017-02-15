import {expect} from 'chai';
import React from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';

import Results from '../../src/components/Results';

describe('Results', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('AA', 'BB');
        const tally = Map({AA: 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );
        const entries=scryRenderedDOMComponentsWithClass(component, 'entry');
        const [t0, t1]=entries.map(e=>e.textContent);
        expect(entries.length).to.equal(2);
        expect(t0).to.contain('AA');
        expect(t0).to.contain('5');
        expect(t1).to.contain('BB');
        expect(t1).to.contain('0');
    });
});