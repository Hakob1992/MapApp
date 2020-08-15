import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map';
import './App.css';

const App = () => {
return <Map zoom={6} center={{ lat: 51.5287718, lng: -0.2416804 }} />
} 
render(<App />, document.getElementById('root'));
