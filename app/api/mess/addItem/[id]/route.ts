import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import InventoryModel from "@/models/inventory.model";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await params;

        console.log("reacher here in item api");

        const { item_name, item_id, unit, quantity } = await req.json();
        console.log("item_name", item_name);
        console.log("item_id", item_id);
        console.log("unit", unit);
        console.log("quantity", quantity);

        const checkInventory = await InventoryModel.findById(id);
        if (!checkInventory) {
            return NextResponse.json(
                { success: false, message: "Inventory not found" },
                { status: 404 }
            );
        }

        console.log("inventory found", checkInventory);



    } catch (error: any) {
        console.error("Error adding item:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}