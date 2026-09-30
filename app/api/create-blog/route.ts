import { NextResponse } from "next/server";

export async function POST() {
  console.log("hello sserver:");
  return NextResponse.json({ success: true });
}
