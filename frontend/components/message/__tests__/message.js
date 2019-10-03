import Message from '../';

const props = {
  title: 'test'
}

describe('Message', () => {
  it('should render Message', () => {
    const wrapper = shallow(<Message {...props} />);

    expect(wrapper.hasClass('ui error message custom-message')).toBe(true);
    expect(wrapper.type()).toBe('div');
  });

  it('should render content', () => {
    const wrapper = shallow(<Message {...props} />);
    const content = wrapper.find('.message');

    expect(content).toHaveLength(1);
  })

  it('should render header', () => {
    const wrapper = shallow(<Message {...props} />);
    const header = wrapper.find('.header');

    expect(header).toHaveLength(1);
    expect(header.text()).toBe(props.title)
  })

  it('should render children', () => {
    const wrapper = shallow(
      <Message {...props}>
        <div>test</div>
      </Message>
    );

    expect(wrapper.text()).toContain('test');
  })
});
