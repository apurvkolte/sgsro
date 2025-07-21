import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const sendMessage = async () => {
        const token = "EAAIXfEZAhmdgBO3dZCEb2JKRmax0UDcR8HUFli6Aqup8c64XmeZCfGoaJzw4YmN593otb9U5ZAkRBh3dbAoIoL9Uky80iRKRnIGxzhZA2ua3daZBPHZBZA2Jc6zVyjLefG4bkoNIsfBhqzZBkoQ0N2pDBLFUZBVfAioLz66EDjzZCimQNykrMO9QqxhIxseuwbHbhSmIFexED6XkJtSHCwZAyiZAd9iH2KdLSgaKqWrZBO";
        const url = "https://graph.facebook.com/v22.0/616281548241889/messages";

        const payload = {
            messaging_product: "whatsapp",
            to: phone,
            // type: "text",
            // text: { body: message },
            type: "template",
            template: {
                name: "discount",
                language: {
                    code: "en"
                    // code: "en_US"
                },
                components: [
                    {
                        type: "header",
                        parameters: [
                            { type: "text", text: "40" }  // {{1}} in header
                        ]
                    },
                    {
                        type: "body",
                        parameters: [
                            { type: "text", text: "Apurv" },       // {{1}}
                            { type: "text", text: "30%" }          // {{2}}
                        ]
                    }
                ]
            }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        setStatus(JSON.stringify(data, null, 2));
    };

    return (
        <main className="p-10 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Send WhatsApp Message</h1>
            <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Phone Number (e.g. 917896XXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
                className="border p-2 w-full mb-2"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={sendMessage} className="bg-success text-white p-2 rounded">
                Send Message
            </button>
            <pre className="mt-4 bg-gray-100 p-4 text-sm whitespace-pre-wrap">{status}</pre>
        </main>
    );
}
