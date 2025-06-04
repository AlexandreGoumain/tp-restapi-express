import { Button } from "@/components/ui/button";
import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className="text-center">
            <div className="flex justify-center space-x-8 mb-8">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="text-4xl font-bold mb-8">Vite + React</h1>
            <div className="card mb-8">
                <Button
                    onClick={() => setCount((count) => count + 1)}
                    className="mb-4"
                >
                    count is {count}
                </Button>
                <p className="text-gray-600">
                    Edit{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                        src/App.tsx
                    </code>{" "}
                    and save to test HMR
                </p>
            </div>
            <p className="read-the-docs text-gray-500">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}
