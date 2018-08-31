// lobe.js
// Find the evaluation of a neural network

// Main function
var lobe = function (inputs, model, key) {

  // Make sure it's always a promise so we can do lobe().catch(err => ...)
  return Promise.resolve().then(function () {

    // Ensure that we are working with a valid client
    key = key || lobe.key;
    if (!key) throw new Error('Please make sure to add your Lobe key like `lobe.key = \'abc\'`');

    // Ensure that we are working with a valid model
    model = model || lobe.model;
    if (!model) throw new Error('Please make sure to add your model id as the second parameter or globally');

    if (!inputs) throw new Error('Please make sure to pass some inputs as the first parameter lobe(inputs)');

    // The options for fetch, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    var url = "https://api.lobe.ai/predict?key=" + key + "&docID=" + model;
    var body = JSON.stringify({ inputs: inputs });
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Return the output if possible, the whole thing otherwise
    return lobe.fetch(url, { method: 'POST', headers: headers, body: body })
      .then(function (res) { return res.json(); })
      .then(function (res) { return res.output; });
  });
};

// Will load only for Node.js and use the native function on the browser
/* istanbul ignore next */
lobe.fetch = typeof fetch === 'undefined'
  ? require('node-fetch')
  : fetch.bind(window);

/* istanbul ignore next */
export default lobe;
