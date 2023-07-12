import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 422 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id  is required", { status: 422 });
    }
    const store = await prismadb.store.updateMany({
      where: { id: params.storeId, userId },
      data: { name, userId },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id  is required", { status: 422 });
    }
    const store = await prismadb.store.deleteMany({
      where: { id: params.storeId, userId },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
