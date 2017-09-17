import React from 'react';
import { mount } from 'enzyme';
import Pagination from './Pagination';
import PageSizeSelect from './PageSizeSelect';

const setup = () => {
  const props = {
    defaultCurrent:   1,
    defaultpageSize: 10,
    pageSize:        -1,
    total:           100,
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizes:       [10, 20, 30, 40],    
  }

  const wrapper = mount(<Pagination {...props} />);
  return {
    props,
    wrapper
  };
}



describe('integrated test', () => {
  // test showQuickJumper
  const { wrapper } = setup();
  it('if showQuickJumber true, it may contain skipInput', () => {
    // 这个时候是false, 应该没有
    expect(wrapper.find('SkipInput').exists()).toBe(false);
    wrapper.setProps({ showQuickJumper: true });
    // 这个时候是true, 应该有
    expect(wrapper.find('SkipInput').exists()).toBe(true);    
  });
  // test showSizeChanger
  it('if showSizeChanger true, it may contain PageSizeSelect', () => {
    // 这个时候是false, 应该没有
    expect(wrapper.find('PageSizeSelect').exists()).toBe(false);
    wrapper.setProps({ showSizeChanger: true });
    // 这个时候是true, 应该有
    expect(wrapper.find('PageSizeSelect').exists()).toBe(true);    
  }); 
});