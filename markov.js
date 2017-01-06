// Markov Chain Library
function Markov() {
  // List of items to use in the chain.
  this.items = {};
  // Version ID - incremented with each change to the chain.
  this.version = 0;
  // Enter a pair into the Markov chain.
  this.pair = function (a, b) {
    if (!this.items[a]) this.items[a] = {};
    if (!this.items[a][b]) this.items[a][b] = 0;
    this.items[a][b]++;
    this.version++;
  }
  // Enter an array into the Markov chain.
  this.seed = function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i + 1]) this.pair(list[i], list[i + 1]);
    }
  }
  // Prepare for use - precalculates weights.
  this.weigh = function () {
    // Only weigh if this hasn't been weighed before - to save time.
    if (!this.weights || this.lastWeighed !== this.version) {
      var keys = Object.keys(this.items);
      this.weights = {};
      // Iterate each item.
      for (var i = 0; i < keys.length; i++) {
        var values = this.items[keys[i]];
        this.weights[keys[i]] = {};
        var vkeys = Object.keys(values);

        // Get sum of all items in array of possible outcomes.
        var totalCount = 0;
        for (var j = 0; j < vkeys.length; j++) {
          totalCount += values[vkeys[j]];
        }

        // Copy array with values out of 1.
        for (var j = 0; j < vkeys.length; j++) {
          this.weights[keys[i]][vkeys[j]] = values[vkeys[j]] / totalCount;
        }
      }
      this.lastWeighed = this.version;
    }
  }
  // Gets a random weighted value.
  this.getFromWeights = function (weights) {
    var keys = Object.keys(weights);

    // Check which weight was chosen.
    var n = Math.random();
    var bottomRange = 0;
    for (var i = 0; i < keys.length; i++) {
      if (n >= bottomRange && n <= weights[keys[i]] + bottomRange) {
        return keys[i];
      } else {
        bottomRange += weights[keys[i]];
      }
    }
  }
  // Get a value from the chain given a keyword.
  this.get = function (key) {
    // Get the weights.
    if (!this.weights) this.weigh();
    return this.getFromWeights(this.weights[key]);
  }
  // Generate a chain from a starting point.
  this.chain = function (starter, length) {
    var generated = [starter];
    for (var i = 1; i < length; i++) {
      generated.push(this.get(generated[i - 1]));
    }
    return generated;
  }
}
