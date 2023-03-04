import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type Dir = "up" | "down";

function ScriptLol(props: {
    key1: number;
    key2: string;
    keyOpt?: string;
    direction: "up" | "down";
}) {
    type primitives =
        | number
        | boolean
        | string
        | undefined
        | (null & unknown)
        | any;

    type literal = "up" | "down" | "left" | "right";
    type literal2 = "up" | "down" | "sideways";
    type literal3 = literal | literal2;

    let myCount: number = 5;

    // all of this for typescript typing demonstration purposes
}

function Counter(props: { direction: Dir }) {
    const [state, setState] = useState<number>(0);
    const [bgColor, setBgColor] = useState<string>("red");
    const bgColors = ["red", "green", "blue"];

    const sideEffectOne = () => {
        setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
    };

    useEffect(sideEffectOne, [state]);

    // on mount, alert I appeared
    useEffect(() => {
        alert("I appeared!");
    }, []);

    // on unmount, alert that I disappeared
    useEffect(() => {
        return () => {
            alert("I disappeared!");
        };
    }, []);

    useEffect(() => {
        console.log("hi im still here");
    });

    return (
        <div
            style={{
                backgroundColor: bgColor,
            }}
        >
            <h2>{state}</h2>
            <button
                onClick={() => {
                    if (props.direction === "up") {
                        setState(state + 1);
                    } else {
                        setState(state - 1);
                    }
                }}
            >
                Click Me!
            </button>
        </div>
    );
}

function App() {
    const [direction, setDir] = useState<Dir>("up");
    const [show, setShow] = useState<boolean>(true);

    return (
        <div className='App'>
            <h1>A Counter App</h1>
            <button
                onClick={() => {
                    setShow(!show);
                }}
            >
                Show/Hide Me!
            </button>
            <button
                onClick={() => {
                    // toggle from up to down, or down to up
                    if (direction === "up") {
                        setDir("down");
                    } else {
                        setDir("up");
                    }
                }}
            >
                Change my Direction!
            </button>
            {show ? <Counter direction={direction} /> : <></>}
        </div>
    );
}

export default App;
