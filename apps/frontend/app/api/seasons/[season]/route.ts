import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: { season: string } },
) {
	const backendUrl = process.env.NEXT_API_URL;
	const season = params.season;

	try {
		const res = await fetch(`${backendUrl}/seasons/${season}`);

		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch seasons" },
				{ status: res.status },
			);
		}
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
