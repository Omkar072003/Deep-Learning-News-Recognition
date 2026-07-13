const tf = require('@tensorflow/tfjs');

// Build RNN/LSTM for video event detection (Pure TensorFlow.js)
const buildRNNModel = (sequenceLength = 10, featureDim = 150528, numClasses = 12) => {
    const model = tf.sequential();

    // Flatten spatial dimensions for RNN input
    // Input: [sequenceLength, 224, 224, 3] -> flatten to [sequenceLength, featureDim]
    
    // LSTM Block 1
    model.add(tf.layers.lstm({
        units: 256,
        returnSequences: true,
        inputShape: [sequenceLength, featureDim]
    }));
    model.add(tf.layers.dropout({ rate: 0.3 }));

    // LSTM Block 2
    model.add(tf.layers.lstm({
        units: 128,
        returnSequences: true
    }));
    model.add(tf.layers.dropout({ rate: 0.3 }));

    // LSTM Block 3
    model.add(tf.layers.lstm({
        units: 64,
        returnSequences: false
    }));
    model.add(tf.layers.dropout({ rate: 0.4 }));

    // Dense Layers
    model.add(tf.layers.dense({
        units: 128,
        activation: 'relu'
    }));
    model.add(tf.layers.dropout({ rate: 0.5 }));

    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu'
    }));

    // Output
    model.add(tf.layers.dense({
        units: numClasses,
        activation: 'softmax'
    }));

    // Compile
    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log('✅ RNN/LSTM Model built (Pure TensorFlow.js)');
    return model;
};

module.exports = buildRNNModel;