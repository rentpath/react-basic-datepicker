[![npm version](https://badge.fury.io/js/react-basic-datepicker.svg)](https://badge.fury.io/js/react-basic-datepicker)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/chrisborrowdale/react-basic-datepicker)

# React Basic Datepicker

A barebones, super-simple datepicker built with React.  This was built to be as simple and small as I could make it, if you want something with a few more features then check out [React Datepicker](https://github.com/Hacker0x01/react-datepicker).

[Check out the demo](https://chrisborrowdale.github.io/react-basic-datepicker/demo/)

## Usage

Render the datepicker and supply any of the props listed below.

`ReactDOM.render(<Datepicker dateFormat="DD/MM/YYYY" />, document.getElementById('react-root'));`

There are basic styles defined in the demo directory which can be copied into your project.

## Props

You can customise the datepicker by supplying the follow props.

- `dateFormat` e.g. DD-MM-YYYY
- `startDate` e.g. `new Date()`
- `minDate` e.g. `new Date(2016, 11)`
- `maxDate` e.g. `new Date(2019, 9)`
- `prevButtonLabel` e.g. 'Previous Month'
- `nextButtonLabel` e.g. 'Next Month'
- `handleDateChange` e.g. set state or do whatever with the date...
- `datepickerName` e.g. `my-date-picker`
- `datepickerId` e.g. `my-date-picker`
- `datepickerClassName` e.g. `my-date-picker`
