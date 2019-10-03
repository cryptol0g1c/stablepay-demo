import Box from '../';

const props = {
  title: 'test'
}

describe('Box', () => {
  it('should render Box', () => {
    const wrapper = shallow(<Box {...props} />);

    expect(wrapper.hasClass('box')).toBe(true);
    expect(wrapper.type()).toBe('div');
  });

  it('should render title', () => {
    const wrapper = shallow(<Box {...props} />);
    const title = wrapper.find('.title');

    expect(title).toHaveLength(1);
    expect(title.type()).toBe('h3');
    expect(title.text()).toBe(props.title);
  });

  it('should render children prop', () => {
    const wrapper = shallow(
      <Box {...props}>
        <div>Test with children</div>
      </Box>
    );

    expect(wrapper.children()).toHaveLength(2);
  });
});
