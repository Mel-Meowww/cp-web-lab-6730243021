import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    // ดึง URL ของ Backend จากไฟล์ .env.local
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3000';
    
    let fetchUrl = `${backendUrl}/greet`;
    if (name) {
        fetchUrl += `?name=${encodeURIComponent(name)}`;
    }

    try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching from backend" }, { status: 500 });
    }
}