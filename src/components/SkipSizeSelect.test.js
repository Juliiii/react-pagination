import { shallow } from 'enzyme';
import React from 'react';
import SkipSizeSelect from './PageSizeSelect';

describe('SkipSizeSelectTest', () => {
  it('when the value of select change, the props method should be called', () => {
    const e = {
      target: {value: 20}
    };
    const pageSizesChange = jest.fn();
    const app = shallow(<SkipSizeSelect pageSizes={[10,20, 30, 40]} pageSizesChange={pageSizesChange} />);
    app.find('select').simulate('change', e);
    expect(pageSizesChange).toBeCalledWith(e);
  });
})