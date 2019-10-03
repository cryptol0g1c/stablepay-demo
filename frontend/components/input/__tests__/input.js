import Input from '../';

const props = {
  icon: 'test',
  prefix: 'ETH',
  value: 'test'
}

describe('Input', () => {
  it('should render Input', () => {
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.hasClass('input')).toBe(true);
    expect(wrapper.type()).toBe('div');
  });

  it('should render prefix', () => {
    const wrapper = shallow(<Input {...props} />);
    const prefix = wrapper.children().first();

    expect(prefix.hasClass('ui basic label')).toBe(true);
    expect(prefix.type()).toBe('div');
    expect(prefix.text()).toBe(props.prefix);
  });

  it('should render input', () => {
    const wrapper = shallow(<Input {...props} />);
    const input = wrapper.children().at(1);

    expect(input.type()).toBe('input');
    expect(input.prop('value')).toBe(props.value);
    expect(input.prop('readOnly')).toBe(true);
    expect(input.prop('type')).toBe('text');
  });

  it('should render icon', () => {
    const wrapper = shallow(<Input {...props} />);
    const icon = wrapper.children().at(2);

    expect(icon.hasClass(props.icon)).toBe(true);
    expect(icon.type()).toBe('i');
    expect(icon.prop('aria-hidden')).toBe('true');
  });
});
