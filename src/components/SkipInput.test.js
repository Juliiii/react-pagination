import SkipInput from './SkipInput';
import React from 'react';
import { shallow } from 'enzyme';

describe('SkipInputTest', () => {

  it('the props methods onKeyDown must be called when keydown event trigger', () => {
    const e = {
      keyCode: 13,
      target: {
        value: 10
      }
    };
    const props = {
      onKeyDown: jest.fn()
    };
    const app = shallow(<SkipInput {...props} />);
    app.find('input').simulate('keydown', e);
    expect(props.onKeyDown).toBeCalledWith(e.target.value);
  });
});
