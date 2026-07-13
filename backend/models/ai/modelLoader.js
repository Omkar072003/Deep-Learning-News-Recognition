const tf = require('@tensorflow/tfjs');
const buildCNNModel = require('./cnnModel');
const buildRNNModel = require('./rnnModel');
const path = require('path');
const fs = require('fs');

const MODEL_PATH = path.join(__dirname, '../../data/models/trained');

class ModelLoader {
    constructor() {
        this.cnnModel = null;
        this.rnnModel = null;
        this.modelsLoaded = false;
    }

    async loadCNNModel() {
        if (this.cnnModel) return this.cnnModel;

        try {
            const modelJsonPath = path.join(MODEL_PATH, 'cnn_model.json');
            
            // Check if model file exists
            if (fs.existsSync(modelJsonPath)) {
                // Use http-server or loadLayersModel with proper handler
                const handler = tf.io.fileSystem(modelJsonPath);
                this.cnnModel = await tf.loadLayersModel(handler);
                console.log('✅ CNN model loaded from saved weights');
            } else {
                console.log('ℹ️  CNN model not found, building new model for training');
                this.cnnModel = buildCNNModel();
            }

            return this.cnnModel;
        } catch (error) {
            console.log('ℹ️  Building fresh CNN model (no saved weights found)');
            this.cnnModel = buildCNNModel();
            return this.cnnModel;
        }
    }

    async loadRNNModel() {
        if (this.rnnModel) return this.rnnModel;

        try {
            const modelJsonPath = path.join(MODEL_PATH, 'rnn_model.json');
            
            if (fs.existsSync(modelJsonPath)) {
                const handler = tf.io.fileSystem(modelJsonPath);
                this.rnnModel = await tf.loadLayersModel(handler);
                console.log('✅ RNN model loaded from saved weights');
            } else {
                console.log('ℹ️  RNN model not found, building new model for training');
                this.rnnModel = buildRNNModel();
            }

            return this.rnnModel;
        } catch (error) {
            console.log('ℹ️  Building fresh RNN model (no saved weights found)');
            this.rnnModel = buildRNNModel();
            return this.rnnModel;
        }
    }

    async loadAllModels() {
        console.log('🔄 Initializing deep learning models...');
        await Promise.all([
            this.loadCNNModel(),
            this.loadRNNModel()
        ]);
        this.modelsLoaded = true;
        console.log('✅ Models ready (using mock predictions until trained)');
    }

    async saveCNNModel() {
        if (!this.cnnModel) throw new Error('CNN model not loaded');
        
        const savePath = path.join(MODEL_PATH, 'cnn_model.json');
        const handler = tf.io.fileSystem(savePath);
        await this.cnnModel.save(handler);
        console.log('✅ CNN model saved to:', savePath);
    }

    async saveRNNModel() {
        if (!this.rnnModel) throw new Error('RNN model not loaded');
        
        const savePath = path.join(MODEL_PATH, 'rnn_model.json');
        const handler = tf.io.fileSystem(savePath);
        await this.rnnModel.save(handler);
        console.log('✅ RNN model saved to:', savePath);
    }

    getMemoryInfo() {
        return tf.memory();
    }

    cleanupMemory() {
        const numTensors = tf.memory().numTensors;
        console.log(`🧹 Current tensors in memory: ${numTensors}`);
    }
}

const modelLoader = new ModelLoader();

module.exports = modelLoader;