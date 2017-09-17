import React from 'react';
import { shallow } from 'enzyme';
import PaginationItems from './PaginationItems';


describe('PageSizeSelectTest', () => {
  it('when hover an item, it must have the class list-item-1', () => {
    const props = {
      hoverIndex: -1,
      page: 3,
      onMouseOver: jest.fn()
    }
    const app = shallow(<PaginationItems {...props} />);
    const e = {
      target: {
        innnerText: '3'
      }
    }
    app.first().simulate('mouseover', e);
    expect(props.onMouseOver).toBeCalledWith(e);
    app.setProps({
      hoverIndex: Number(e.target.innnerText)
    });
    expect(app.first().hasClass('list-items-1')).toEqual(true);
  });

  it('when click an item, it must have the class list-item-1', () => {
    const props = {
      currentIndex: 8,
      page: 3,
      onClick: jest.fn()
    }
    const app = shallow(<PaginationItems {...props} />);
    const e = {
      target: {
        innnerText: '3'
      }
    }
    app.first().simulate('click', e);
    expect(props.onClick).toBeCalledWith(e);
    app.setProps({
      currentIndex: Number(e.target.innnerText)
    });
    expect(app.first().hasClass('list-items-1')).toEqual(true);
  });

  it('when leave an item, it must not have the class list-item-1', () => {
    const props = {
      hoverIndex: 3,
      page: 3,
      onMouseLeave: jest.fn()
    }
    const app = shallow(<PaginationItems {...props} />);
    app.first().simulate('mouseleave');
    expect(props.onMouseLeave).toBeCalled();
    app.setProps({
      hoverIndex: -1
    });
    expect(!app.first().hasClass('list-items-1')).toEqual(true);
  });
  
  it('if the page is ..., it has the class ellipsis', () => {
    const props = {
      page: '...'
    }
    const app = shallow(<PaginationItems {...props} />);
    expect(app.first().hasClass('ellipsis')).toEqual(true);
  });

});

