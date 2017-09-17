import SkipInput from './SkipInput';
import React from 'react';
import { shallow } from 'enzyme';

const setup = () => {
  const props = {
    onKeyDown: jest.fn()
  };

  const app = shallow(<SkipInput {...props} />);

  return {
    props,
    app
  };
};


describe('SkipInputTest', () => {
  const { props, app } = setup();

  it('SkipInput must has a input dom', () => {
    expect(app.find('input').exists()).toEqual(true);
  });

  it('the props methods onKeyDown must be called when keydown event trigger', () => {
    const e = {
      keyCode: 13,
      target: {
        value: 123
      }
    };
    app.find('input').simulate('keydown', e);
    expect(props.onKeyDown).toBeCalled();
  })
});
