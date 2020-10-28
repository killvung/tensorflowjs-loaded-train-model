import React from 'react';
import { initializeModel } from './train';
import * as tf from '@tensorflow/tfjs';
import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

// Initialize a model by training it or loaded the trained model from localStorage
initializeModel().then((model) => {
  console.log(model.predict(tf.tensor2d([10], [1, 1])));
});
export default App;
