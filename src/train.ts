import * as tf from '@tensorflow/tfjs';

export const initializeModel = async () => {
    try {
        const model = await tf.loadLayersModel('localstorage://my-model-1');
        return model
    } catch {
        console.log('training')
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });
        model.summary();
        const xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1]);
        const ys = tf.tensor2d([-3.0, -1.0, 2.0, 3.0, 5.0, 7.0], [6, 1]);
        await model.fit(xs, ys,
            {
                epochs: 500,
                callbacks: {
                    onEpochEnd: async (epoch: number, logs: any) => {
                        console.log("Epoch:"
                            + epoch
                            + " Loss:"
                            + logs.loss);

                    }
                }
            });
        await model.save('localstorage://my-model-1');
        return model;
    }
}

