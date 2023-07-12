importScripts("../onnxruntime-web/dist/ort.min.js");

// Disable streaming compilation
const options = { executionProviders: ['webgl'], disableWebAssemblyStreaming: true };

onmessage = async(event) => {
    const input = event.data;
    const output = await run_model(input);
    postMessage(output);
}

async function run_model(input) {
    const modelUrl = new URL("../model/best.onnx", location.href).href;
    const model = await ort.InferenceSession.create(modelUrl, options);
    input = new ort.Tensor(Float32Array.from(input),[1, 3, 640, 640]);
    const outputs = await model.run({images:input});
    return outputs["output0"].data;
}
