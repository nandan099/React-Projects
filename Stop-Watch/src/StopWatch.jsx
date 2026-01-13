import React, { useState, useEffect, useRef } from 'react'


function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [isRunning]);

    function Start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function Stop() {
        setIsRunning(false);
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }

    function Reset() {
        setElapsedTime(0);
        setIsRunning(false);
        startTimeRef.current = 0;
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }

    function formatTime() {
        const totalMs = elapsedTime;
        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
        const seconds = Math.floor((totalMs / 1000) % 60);
        const milliseconds = Math.floor((totalMs % 1000) / 10); 

        const pad = (num, size = 2) => String(num).padStart(size, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={Start} className="Start-button">Start</button>
                <button onClick={Stop} className="Stop-button">Stop</button>
                <button onClick={Reset} className="Reset-button">Reset</button>
            </div>
        </div>
    );
}
export default StopWatch