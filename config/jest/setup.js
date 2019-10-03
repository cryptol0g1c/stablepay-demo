import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, render, shallow } from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
