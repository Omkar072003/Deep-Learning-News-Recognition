const tf = require('@tensorflow/tfjs');

// Build CNN for news image classification (Pure TensorFlow.js)
const buildCNNModel = (inputShape = [224, 224, 3], numClasses = 25) => {
    const model = tf.sequential();

    // Conv Block 1
    model.add(tf.layers.conv2d({
        inputShape: inputShape,
        filters: 32,
        kernelSize: 3,
        activation: 'relu',
        padding: 'same'
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
    model.add(tf.layers.dropout({ rate: 0.25 }));

    // Conv Block 2
    model.add(tf.layers.conv2d({
        filters: 64,
        kernelSize: 3,
        activation: 'relu',
        padding: 'same'
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
    model.add(tf.layers.dropout({ rate: 0.25 }));

    // Conv Block 3
    model.add(tf.layers.conv2d({
        filters: 128,
        kernelSize: 3,
        activation: 'relu',
        padding: 'same'
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
    model.add(tf.layers.dropout({ rate: 0.3 }));

    // Conv Block 4
    model.add(tf.layers.conv2d({
        filters: 256,
        kernelSize: 3,
        activation: 'relu',
        padding: 'same'
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
    model.add(tf.layers.dropout({ rate: 0.4 }));

    // Dense Layers
    model.add(tf.layers.flatten());
    
    model.add(tf.layers.dense({
        units: 512,
        activation: 'relu'
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.dropout({ rate: 0.5 }));

    model.add(tf.layers.dense({
        units: 256,
        activation: 'relu'
    }));
    model.add(tf.layers.dropout({ rate: 0.5 }));

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

    console.log('✅ CNN Model built (Pure TensorFlow.js)');
    return model;
};

module.exports = buildCNNModel;