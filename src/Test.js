import React, { Component } from "react";
import html2canvas from "html2canvas";
import recorder from "react-canvas-recorder";
import { invokeSaveAsDialog } from "recordrtc";
// import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

class Test extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.elementToRecordRef = React.createRef();
    }

    render() {
        const startRecording = () => {
            let elementToRecord = this.elementToRecordRef.current;
            let canvas2d = this.canvasRef.current;
            let canvasContext = canvas2d.getContext("2d");

            canvas2d.width = elementToRecord.clientWidth;
            canvas2d.height = elementToRecord.clientHeight;

            let isRecordingStarted = false;
            let isStoppedRecording = false;

            (function looper() {
                if (!isRecordingStarted) {
                    return setTimeout(looper, 500);
                }

                html2canvas(elementToRecord).then(function (canvas) {
                    canvasContext.clearRect(
                        0,
                        0,
                        canvas2d.width,
                        canvas2d.height
                    );
                    canvasContext.drawImage(
                        canvas,
                        0,
                        0,
                        canvas2d.width,
                        canvas2d.height
                    );
                    if (isStoppedRecording) {
                        return;
                    }

                    requestAnimationFrame(looper);
                });
            })();

            // let recorder = new RecordRTC(canvas2d, {
            //     type: "canvas",
            // });

            isStoppedRecording = false;
            isRecordingStarted = true;
            recorder.createStream(canvas2d);
            recorder.start();

            setTimeout(() => {
                isRecordingStarted = false;
                isStoppedRecording = true;
                recorder.stop();

                console.log(recorder.save());
                let blob = recorder.save();
                invokeSaveAsDialog(blob);
            }, 15000);
        };

        return (
            <div ref={this.elementToRecordRef}>
                {/* <button onClick={window["startRecording"]}>Heading</button> */}
                <button onClick={startRecording}>Heading</button>
                <iframe src="https://excalidraw.com/#room=12345678901234567890,1234567890123456789012" />
                <canvas
                    ref={this.canvasRef}
                    style={{
                        position: "absolute",
                        top: "-99999999px",
                        left: "-9999999999px",
                    }}
                ></canvas>
                <div>
                    <input placeholder="Element to record"></input>
                </div>
            </div>
        );
    }
}

export default Test;
