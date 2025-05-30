import { NextResponse } from "next/server";

export async function GET() {
	const backendUrl = process.env.NEXT_API_URL;

	try {
		const res = await fetch(`${backendUrl}/seasons`);

		if (!res.ok) {
			return NextResponse.json(
				{
					error: "Failed to fetch seasons",
					status: res.status,
					url: `${backendUrl}/seasons`,
				},
				{ status: res.status },
			);
		}
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
