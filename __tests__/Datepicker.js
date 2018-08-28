import React from 'react'
import Datepicker from '../src/Datepicker'
import { mount, shallow } from 'enzyme';
import addDays from 'date-fns/add_days'

test('calendar should be hidden by default', () => {
  const datepicker = mount(<Datepicker />)
  expect(datepicker.state().showCalendar).toBeFalsy()
});

test('input should be readOnly by default', () => {
  const datepicker = shallow(<Datepicker />)
  const input = datepicker.find('input')

  expect(input.props().readOnly).toBeTruthy()
  
  input.simulate('change', {target: {value: '10/10/2010'}});
  expect(input.props().value).not.toBe('10/10/2010')
})

test('if passed enableTextInput, input should accept typed text', () => {
  const datepicker = mount(<Datepicker dateFormat="MM/DD/YYYY" enableTextInput />)
  const input = datepicker.find('input')
  
  expect(input.props().readOnly).toBeFalsy()
  
  input.simulate('change', {target: {value: '10/10/2010'}});
  
  expect(input.props().value).toBe('10/10/2010')
})

test('if passed enableTextInput, state should only change on valid date', () => {
  const startDate = new Date('2020-01-04T06:00:00.000Z')
  const datepicker = mount(<Datepicker dateFormat="MM/DD/YYYY" startDate={startDate} enableTextInput/>)
  const input = datepicker.find('input')
  
  input.simulate('change', {target: {value: '10/10/201a'}});
  expect(datepicker.state().selectedDate).toBe(startDate)
  
  input.simulate('change', {target: {value: '10/10/2020'}});
  expect(datepicker.state().selectedDate).toBe('10/10/2020')

  input.simulate('change', {target: {value: 'ZZ/10/2020'}});
  expect(datepicker.state().selectedDate).toBe('10/10/2020')
})

test('if passed enableTextInput, should respect mindate & maxdate', () => {
  const startDate = new Date('2020-01-04T06:00:00.000Z')
  const datepicker = mount(<Datepicker dateFormat="MM/DD/YYYY" startDate={startDate} minDate={startDate} maxDate={addDays(startDate, 10)} enableTextInput/>)
  const input = datepicker.find('input')
  
  input.simulate('change', {target: {value: '01/10/2020'}});
  expect(datepicker.state().selectedDate).toBe('01/10/2020')
  
  input.simulate('change', {target: {value: '01/15/2020'}});
  expect(datepicker.state().selectedDate).toBe('01/10/2020')

  input.simulate('change', {target: {value: '01/03/2020'}});
  expect(datepicker.state().selectedDate).toBe('01/10/2020')
})

test('selecing a date updates date state and hides component', () => {
  const datepicker = mount(<Datepicker />)
  datepicker.instance().dateChange('Thu Dec 01 2019 00:00:00 GMT+0000 (GMT)')
  expect(datepicker.state().selectedDate).toEqual('Thu Dec 01 2019 00:00:00 GMT+0000 (GMT)')
  expect(datepicker.state().showCalendar).toBeFalsy()
});

test('handleCalendarVisibility updates visibility of component', () => {
  const datepicker = mount(<Datepicker />)
  datepicker.instance().handleCalendarVisibility()
  expect(datepicker.state().showCalendar).toBeTruthy()

  datepicker.instance().handleCalendarVisibility()
  expect(datepicker.state().showCalendar).toBeFalsy()
});
