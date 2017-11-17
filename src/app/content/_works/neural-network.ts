export class Perceptron {
  activation: number;
  delta: number;
  weights: Array<number>;
  bias: number;
  weightsChange: Array<number>;
  biasChange: number;

  constructor(
    numWeights,
    optArgs: {
      activation: number;
      delta: number;
      weights: Array<number>;
      bias: number;
      weightsChange: Array<number>;
      biasChange: number;
    } = {
      activation: 0,
      delta: 0,
      weights: [],
      bias: (Math.random() - 0.5) / 5,
      weightsChange: [],
      biasChange: 0
    }
  ) {
    this.activation = optArgs.activation;
    this.delta = optArgs.delta;
    this.bias = optArgs.bias;
    this.biasChange = optArgs.biasChange;
    this.weights = optArgs.weights;
    this.weightsChange = optArgs.weightsChange;
    if (optArgs.weights.length === 0) {
      for (let i = 0; i < numWeights; i++) {
        this.weights.push((Math.random() - 0.5) / 5);
        this.weightsChange.push(0);
      }
    }
  }
  propagate(activityIn: Array<number>): Promise<number> {
    let activitySum = 0;
    const weights = this.weights;
    for (let i = 0; i < activityIn.length; i++) {
      activitySum += activityIn[i] * weights[i];
    }
    const activation = 1.0 / (1 + Math.pow(Math.E, -(activitySum + this.bias)));
    this.setActivation(activation);
    return Promise.resolve(activation);
  }
  setActivation(newActivation: number): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: newActivation,
      delta: this.delta,
      weights: this.weights,
      bias: this.bias,
      weightsChange: this.weightsChange,
      biasChange: this.biasChange
    });
  }
  setDelta(newDelta: number): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: this.activation,
      delta: newDelta,
      weights: this.weights,
      bias: this.bias,
      weightsChange: this.weightsChange,
      biasChange: this.biasChange
    });
  }
  setWeights(newWeights: Array<number>): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: this.activation,
      delta: this.delta,
      weights: newWeights,
      bias: this.bias,
      weightsChange: this.weightsChange,
      biasChange: this.biasChange
    });
  }
  setBias(newBias: number): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: this.activation,
      delta: this.delta,
      weights: this.weights,
      bias: newBias,
      weightsChange: this.weightsChange,
      biasChange: this.biasChange
    });
  }
  setWeightsChange(newWeightsChange: Array<number>): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: this.activation,
      delta: this.delta,
      weights: this.weights,
      bias: this.bias,
      weightsChange: newWeightsChange,
      biasChange: this.biasChange
    });
  }
  setBiasChange(newBiasChange: number): Perceptron {
    return new Perceptron(this.weights.length, {
      activation: this.activation,
      delta: this.delta,
      weights: this.weights,
      bias: this.bias,
      weightsChange: this.weightsChange,
      biasChange: newBiasChange
    });
  }
}

export class NeuralNetwork {
  tolerance: number;
  learningRate: number;
  momentum: number;
  sigmoidPrimeOffset: number;
  perceptrons: Array<Array<Perceptron>>;
  maxEpoch: number;

  constructor(
    blueprint: Array<number>,
    tolerance: number,
    learningRate: number,
    momentum: number,
    sigmoidPrimeOffset: number
  ) {
    this.tolerance = tolerance;
    this.learningRate = learningRate;
    this.momentum = momentum;
    this.sigmoidPrimeOffset = sigmoidPrimeOffset;
    this.maxEpoch = 300;
    const perceptrons = [];
    for (let i = 1; i < blueprint.length; i++) {
      perceptrons.push([]);
      const layer = perceptrons[i - 1];
      const numWeights = blueprint[i - 1];
      for (let i1 = 0; i1 < blueprint[i]; i1++) {
        layer.push(new Perceptron(numWeights));
      }
    }
    this.perceptrons = perceptrons;
  }
  propagate(perceptrons: Array<Array<Perceptron>>, pattern: Array<number>): Array<number> {
    let activityIn: Array<number>;
    const numLayers = perceptrons.length;
    for (let i = 0; i < numLayers; i++) {
      if (i === 0) {
        activityIn = pattern;
      } else {
        activityIn = [];
        for (const parentPercept of perceptrons[i - 1]) {
          console.log('activity,', parentPercept);
          activityIn.push(parentPercept.activation);
        }
      }
      console.log('activityIn', activityIn);
      this.propagateLayer(perceptrons[i], activityIn).then(resolve => perceptrons[i] = resolve);
    }
    activityIn = [];
    for (const percept of perceptrons[numLayers - 1]) {
      activityIn.push(percept.activation);
    }
    return activityIn;
  }
  propagateLayer(layer: Array<Perceptron>, activityIn: Array<number>): Promise<Array<Perceptron>> {
    const layerSize = layer.length;
    const newLayer: Array<Perceptron> = [];
    // const resultSubject: Subject<number> = new Subject();
    // resultSubject.subscribe(results => this.countResults(results, layer.length));
    for (let i1 = 0; i1 < layerSize; i1++) {
      const percept = layer[i1];
      percept.propagate(activityIn).then(resolve => newLayer.push(percept.setActivation(resolve)));
    }
    // while (newLayer.length < layerSize) {}
    console.log(newLayer);
    return Promise.resolve(newLayer);
  }
  // doLayer(perceptrons: Array<Array<Perceptron>>, index: number, activityIn: Array<number>): Promise<Array<Array<Perceptron>>> {
  //   const layer = perceptrons[index];
  //   const layerSize = layer.length;
  //   let results: Array<number> = [];
  //   for (let i = 0; i < layerSize; i++) {
  //     layer[i].propagate(activityIn).then(result => results = this.countResults(results, result, layerSize));
  //   }
  //   return Promise.resolve(perceptrons);
  // }
  // countResults(results: Array<number>, newResult: number, total: number) {
  //   const lastIndex = results.push(newResult);
  //   if (lastIndex === total) {

  //   }
  //   return results;
  // }
  calcError(patterns: Array<Array<number>>, targets: Array<Array<number>>): [number, number] {
    const tolerance = this.tolerance;
    const numPatts = patterns.length;
    let TSS = 0;
    let error = 0;
    for (let i = 0; i < numPatts; i++) {
      const result = this.propagate(this.perceptrons, patterns[i]);
      let numIncorrect = 0;
      for (let i1 = 0; i1 < result.length; i1++) {
        console.log('results', result[i1], targets[i][i1]);
        numIncorrect += (Math.abs(result[i1]) - Math.abs(targets[i][i1]));
      }
      TSS += Math.pow(numIncorrect, 2);
      error += (tolerance >= numIncorrect && numIncorrect >= -tolerance) ? 1 : 0;
      console.log(result, numIncorrect, TSS, error);
    }
    const percentCorrect = Math.round(error) / numPatts;
    return [TSS, percentCorrect];
  }
  adjustWeights(pattern: Array<number>, target: Array<number>): void {
    const result = this.propagate(this.perceptrons, pattern);
    this.calcDeltas(this.perceptrons, result, target).then(resolve => this.calcWeightAdjustments(resolve, pattern));
  }
  calcDeltas(perceptrons: Array<Array<Perceptron>>, result: Array<number>, target: Array<number>): Promise<Array<Array<Perceptron>>> {
    const lastLayerIndex = perceptrons.length - 1;
    for (let i = lastLayerIndex; i >= 0; i--) {
      const layer = perceptrons[i];
      for (let i1 = 0; i1 < layer.length; i1++) {
        const percept = layer[i1];
        const activation = percept.activation;
        let correct: number;
        if (i === lastLayerIndex) {
          correct = target[i1] - activation;
        } else {
          correct = 0;
          for (const parent of perceptrons[i + 1]) {
            correct += parent.delta * parent.weights[i1];
          }
        }
        percept.delta = correct * activation * (1 - activation);
      }
    }
    return Promise.resolve(perceptrons);
  }
  calcWeightAdjustments(perceptrons: Array<Array<Perceptron>>, pattern: Array<number>) {
    const learningRate = this.learningRate;
    const momentum = this.momentum;
    let childActivations = pattern;
    for (let i = 0; i < perceptrons.length; i++) {
      const layer = perceptrons[i];
      if (i > 0) {
        const parentLayer = perceptrons[i - 1];
        childActivations = [];
        for (let i1 = 0; i1 < parentLayer.length; i1++) {
          childActivations.push(parentLayer[i1].activation);
        }
      }
      const numWeights = childActivations.length;
      for (const percept of layer) {
        const delta = percept.delta;
        const weightsChange = percept.weightsChange;
        const weights = percept.weights;
        let biasChange = percept.biasChange;
        let bias = percept.bias;
         for (let i1 = 0; i1 < numWeights; i1++) {
           weightsChange[i1] = learningRate * delta * childActivations[i1] + momentum * weightsChange[i1];
           weights[i1] = weights[i1] + weightsChange[i1];
         }
         biasChange = learningRate * delta + momentum * biasChange;
         bias = bias + biasChange;
      }
    }
    return Promise.resolve(perceptrons);
  }
  train(patterns: Array<Array<number>>, targets: Array<Array<number>>) {
    const calcError = this.calcError.bind(this, patterns, targets);
    const adjustWeights = this.adjustWeights.bind(this);
    let iEpoch = 0;
    let percent = 0;
    const maxEpoch = this.maxEpoch;
    while (percent < 1 && iEpoch < maxEpoch) {
      const errors = calcError();
      percent = errors[1];
      const statsString =
      'Epoch #' + iEpoch.toString()
      + ': TSS error is ' + errors[0].toString()
      + ', percent correct is ' + percent.toString();
      console.log(statsString);
      iEpoch++;
      // for (let i = 0; i < patterns.length; i++) {
      //   adjustWeights(patterns[i], targets[i]);
      // }
    }
    return iEpoch;
  }
}
