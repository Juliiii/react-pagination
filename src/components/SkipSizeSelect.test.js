import { shallow } from 'enzyme';
import React from 'react';
import SkipSizeSelect from './PageSizeSelect';

const setup = () => {
  const props = {
    pageSizesChange: jest.fn(),
    pageSizes: [10, 20, 30]
  };
  const app = shallow(<SkipSizeSelect {...props} />);  
  return {
    props,
    app
  };
};

describe('SkipSizeSelectTest', () => {
  const {props, app} = setup();

  it('the component will render without any error', () => {
    expect(app.exists()).toEqual(true);
  });

  it('when the value of select change, the props method should be called', () => {
    const e = {
      target: {value: 10}
    };
    app.find('select').simulate('change', e);
    expect(props.pageSizesChange).toBeCalled();
  });
})