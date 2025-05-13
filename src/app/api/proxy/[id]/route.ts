import { getProxyById } from "@/services/proxy";
import { NextResponse } from "next/server";

export async function GET(_:Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const proxy = await getProxyById(id);
  if (!proxy) {
    return NextResponse.json({ message: "Proxy not found" }, { status: 404 });
  }

  return NextResponse.json(proxy, { status: 200 });
}
