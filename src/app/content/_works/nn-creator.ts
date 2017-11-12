// import { Work } from './work';

// class Perceptron {
//   activation: number;
//   delta: number;
//   weights: Array<number>;
//   bias: number;
//   weightsChange: Array<number>;
//   biasChange: number;

//   constructor(numWeights) {
//     this.bias = (Math.random() - 0.5) / 5;
//     this.weights = [];
//     for (let i = 0; i < numWeights; i++) {
//       this.weights.push((Math.random() - 0.5) / 5);
//     }
//   }

//   propagate(activityIn: Array<number>): Promise<number> {
//     let activitySum = 0;
//     const weights = this.weights;
//     for (let i = 0; i < activityIn.length; i++) {
//       activitySum += activityIn[i] * weights[i];
//     }
//     const activation = 1.0 / (1 + Math.pow(Math.E, -(activitySum + this.bias)));
//     this.activation = activation;
//     return Promise.resolve(activation);
//   }
// }

// class NeuralNetwork {
//   tolerance: number;
//   learningRate: number;
//   momentum: number;
//   sigmoidPrimeOffset: number;
//   perceptrons: Array<Array<Perceptron>>;

//   constructor(
//     blueprint: Array<number>,
//     tolerance: number,
//     learningRate: number,
//     momentum: number,
//     sigmoidPrimeOffset: number
//   ) {
//     this.tolerance = tolerance;
//     this.learningRate = learningRate;
//     this.momentum = momentum;
//     this.sigmoidPrimeOffset = sigmoidPrimeOffset;
//     const perceptrons = [];
//     for (let i = 1; i < blueprint.length; i++) {
//       perceptrons.push([]);
//       const layer = perceptrons[i - 1];
//       const numWeights = blueprint[i - 1];
//       for (let i1 = 0; i1 < blueprint[i]; i1++) {
//         layer.push(new Perceptron(numWeights));
//       }
//     }
//     this.perceptrons = perceptrons;
//   }
//   propagate(pattern: Array<number>): Array<number> {
//     const perceptrons = this.perceptrons;
//     let activityIn = pattern;
//     let newActivityIn: Array<number>;
//     for (let i = 0; i < perceptrons.length; i++) {
//       const layer = perceptrons[i];
//       newActivityIn = [];
//       for (let i1 = 0; i1 < layer.length; i1++) {
//         const percept = layer[i1];
//         percept.propagate(activityIn).then(resolve => newActivityIn.push(resolve));
//       }
//       activityIn = newActivityIn;
//     }
//     return activityIn;
//   }
//   calcError(patterns: Array<Array<number>>, targets: Array<Array<number>>): [number, number] {
//     const tolerance = this.tolerance;
//     const numPatts = patterns.length;
//     let TSS = 0;
//     let error = 0;
//     for (let i = 0; i < numPatts; i++) {
//       const result = this.propagate(patterns[i]);
//       let numIncorrect = 0;
//       for (let i1 = 0; i1 < result.length; i1++) {
//         numIncorrect += (Math.abs(result[i1]) - Math.abs(targets[i][i1]));
//       }
//       TSS += Math.pow(numIncorrect, 2);
//       error += (tolerance >= numIncorrect && numIncorrect >= -tolerance) ? 1 : 0;
//     }
//     const percentCorrect = Math.round(error) / numPatts;
//     return [TSS, percentCorrect];
//   }

//   adjustWeights(pattern: Array<number>, target: Array<number>): void {
//     const result = this.propagate(pattern);
//     this.calcDeltas(this.perceptrons, result, target).then(resolve => this.calcWeightAdjustments(resolve, pattern));
//   }
//   calcDeltas(perceptrons: Array<Array<Perceptron>>, result: Array<number>, target: Array<number>): Promise<Array<Array<Perceptron>>> {
//     const lastLayerIndex = perceptrons.length - 1;
//     for (let i = lastLayerIndex; i >= 0; i--) {
//       const layer = perceptrons[i];
//       for (let i1 = 0; i < layer.length; i1++) {
//         const percept = layer[i1];
//         const activation = percept.activation;
//         let correct: number;
//         if (i === lastLayerIndex) {
//           correct = target[i1] - activation;
//         } else {
//           correct = 0;
//           for (const parent of perceptrons[i + 1]) {
//             correct += parent.delta * parent.weights[i1];
//           }
//         }
//         percept.delta = correct * activation * (1 - activation);
//       }
//     }
//     return Promise.resolve(perceptrons);
//   }
//   calcWeightAdjustments(perceptrons: Array<Array<Perceptron>>, pattern: Array<number>) {
//     const learningRate = this.learningRate;
//     const momentum = this.momentum;
//     let childActivations = pattern;
//     for (let i = 0; i < perceptrons.length; i++) {
//       const layer = perceptrons[i];
//       if (i > 0) {
//         const parentLayer = perceptrons[i - 1];
//         childActivations = [];
//         for (let i1 = 0; i < parentLayer.length; i1++) {
//           childActivations.push(parentLayer[i1].activation);
//         }
//       }
//       const numWeights = childActivations.length;
//       for (const percept of layer) {
//         const delta = percept.delta;
//         const weightsChange = percept.weightsChange;
//         const weights = percept.weights;
//         let biasChange = percept.biasChange;
//         let bias = percept.bias;
//          for (let i1 = 0; i1 < numWeights; i1++) {
//            weightsChange[i1] = learningRate * delta * childActivations[i1] + momentum * weightsChange[i1];
//            weights[i1] = weights[i1] + weightsChange[i1];
//          }
//          biasChange = learningRate * delta + momentum * biasChange;
//          bias = bias + biasChange;
//       }
//     }
//     return Promise.resolve(perceptrons);
//   }
//   train(patterns: Array<Array<number>>, targets: Array<Array<number>>) {
//     const calcError = this.calcError.bind(this, patterns, targets);
//     const adjustWeights = this.adjustWeights.bind(this);
//     let iEpoch = 0;
//     let percent = 0;
//     while (percent < 1) {
//       const errors = calcError();
//       percent = errors[1];
//       const statsString =
//       'Epoch #' + iEpoch.toString()
//       + ': TSS error is ' + errors[0].toString()
//       + ', percent correct is ' + percent.toString();
//       console.log(statsString);
//       iEpoch++;
//       for (let i = 0; i < patterns.length; i++) {
//         adjustWeights(patterns[i], targets[i]);
//       }
//     }
//     return iEpoch;
//   }
// }
// export class NNCreator extends Work {
//   // inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
//   // ANDtargets  = [[0], [0], [0], [1]];
//   // ORtargets   = [[0], [1], [1], [1]];
//   // NANDtargets = [[1], [1], [1], [0]];
//   // NORtargets  = [[1], [0], [0], [0]];
//   // XORtargets  = [[0], [1], [1], [0]];
//   // XNORtargets = [[1], [0], [0], [1]];

//   constructor(parentEl: Element) {
//     super(parentEl);
//   }
//   // start(): void {
//   //   const n = new NeuralNetwork([2, 2, 1], 0.1, 0.5, 0, 0);
//   //   n.train(this.inputs, this.XORtargets);
//   // }
//   setupSettings(): HTMLElement {
//     return document.createElement('div');
//   }
//   applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
//     return context;
//   }
//   drawAll(context: CanvasRenderingContext2D): void {}
//   undo(): void {}
//   redo(): void {}
//   clearWorkData(): void {}
//   clearUndoData(): void {}
//   onPointerDown(e: PointerEvent): void {
//     if (e.srcElement.closest('.button') === null) {
//       // this.start();
//     }
//   }
//   onPointerMove(e: PointerEvent): void {}
//   onPointerUp(): void {}
// }
