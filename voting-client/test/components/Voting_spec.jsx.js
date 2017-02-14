/**
 * Created by justicui on 2/13/17.
 */
import {describe} from 'mocha';
import {expect} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import Voting from '../../src/components/Voting';

describe('Voting', ()=>{
    it('renders a pair of buttons', ()=>{
       const component = renderIntoDocument(
        <Voting pair={["AA", "BB"]} />
       );
       const buttons=scryRenderedDOMComponentsWithTag(component, 'button');
       expect(buttons.length).to.equal(2);
       expect(buttons[0].textContent).to.equal('AA');
       expect(buttons[1].textContent).to.equal('BB');
    });
});


