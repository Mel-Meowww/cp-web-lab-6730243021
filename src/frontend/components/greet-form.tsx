'use client';

import { useState } from 'react';

export default function GreetForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const fetchGreeting = async () => {
        let url = '/api/greet';
        if (name) {
            url += `?name=${encodeURIComponent(name)}`;
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Error fetching data");
        }
    };

    return (
        <div className="p-8 border rounded-xl shadow-sm bg-white max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">Say hello</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="nameInput">
                    Your name
                </label>
                <input
                    id="nameInput"
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-md text-black"
                    placeholder="รหัสนักศึกษา และ ชื่อ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button
                onClick={fetchGreeting}
                className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition"
            >
                Get greeting
            </button>
            {message && (
                <p className="mt-6 text-gray-800 font-medium">
                    {message}
                </p>
            )}
        </div>
    );
}