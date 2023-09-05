import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as lamejs from 'lamejs';
import { Observable, lastValueFrom } from 'rxjs';
import { PYTHON_API_ENDPOINT } from '../../environments/environment';
import MPEGMode from 'lamejs/src/js/MPEGMode';
import Lame from 'lamejs/src/js/Lame';
import BitStream from 'lamejs/src/js/BitStream';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    /**
     * 
     */
    constructor(private http: HttpClient) {
        window['MPEGMode'] = MPEGMode;
        window['Lame'] = Lame;
        window['BitStream'] = BitStream;
    }

    /**
     * Function to modify and convert audio to Blob
     */
    modifyAndConvertAudio(file: File): Observable<Blob> {
        return new Observable<Blob>((observer) => {
            // const audioContext = new AudioContext();
            const offlineCtx = new OfflineAudioContext(2, 44100 * 40, 44100);

            // Load the audio file
            const reader = new FileReader();
            reader.onload = (event) => {
                const audioData = event.target.result as ArrayBuffer;

                // Decode the audio data
                offlineCtx.decodeAudioData(audioData, (buffer) => {
                    // Modify the audio here (e.g., apply effects, filters, etc.)
                    // You can use the Web Audio API functions for modification.

                    // Encode the modified audio back to a Blob
                    offlineCtx.createBufferSource().buffer = buffer;
                    offlineCtx.startRendering().then((renderedBuffer) => {
                        const audioBlob = new Blob([this.bufferToArrayBuffer(renderedBuffer)], { type: 'audio/wav' });
                        observer.next(audioBlob);
                        observer.complete();
                    });
                });
            };

            reader.readAsArrayBuffer(file);
        });
    }

    /**
     *
     */
    bufferToArrayBuffer(buffer: AudioBuffer): ArrayBuffer {
        const channelData = buffer.getChannelData(0);
        const arrayBuffer = new ArrayBuffer(channelData.length * Float32Array.BYTES_PER_ELEMENT);
        const dataView = new DataView(arrayBuffer);

        for (let i = 0; i < channelData.length; i++) {
            dataView.setFloat32(i * Float32Array.BYTES_PER_ELEMENT, channelData[i], true);
        }

        return arrayBuffer;
    }

    /**
     * 
     */
    async streamCompressedAudio(audioBlob: Blob): Promise<void> {
        const compressedBlob = await this.compressAudio(audioBlob);
        const formData = new FormData();
        formData.append('audio', compressedBlob, 'audio.mp3');

        return lastValueFrom(this.http.post<any>(`${PYTHON_API_ENDPOINT}/stream-audio`, formData));
    }

    /**
     * 
     */
    private async compressAudio(inputBlob: Blob): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer = reader.result as ArrayBuffer;
                const wavData = new Uint8Array(buffer);

                const lame = new lamejs.Mp3Encoder(1, 44100, 128);
                const mp3Data = lame.encodeBuffer(wavData);
                const mp3Blob = new Blob([new Uint8Array(mp3Data)], { type: 'audio/mpeg' });

                resolve(mp3Blob);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(inputBlob);
        });
    }

    /**
     *
     */
    async streamAudio(audioBlob: Blob): Promise<void> {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.mp3');

        return lastValueFrom(this.http.post<any>(`${PYTHON_API_ENDPOINT}/stream-audio`, formData));
    }

    /**
     *
     */
    streamAudioFile(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('audio', file, file.name);

        return lastValueFrom(this.http.post<any>(`${PYTHON_API_ENDPOINT}/stream-audio`, formData));
    }
}
