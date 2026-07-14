import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import PurchaseStockModel from "@/models/purchaseStock.model";
import InventoryModel from "@/models/inventory.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const data = await req.json();
        console.log("reached here in purchase stock api", data);

        const stockDocumentId = data.documentId;

        const getStockToBeUpdated = await InventoryModel.findById(stockDocumentId);

        if (!getStockToBeUpdated) {
            return NextResponse.json(
                { success: false, message: "Stock not found" },
                { status: 404 }
            );
        }

        if (data.items && Array.isArray(data.items)) {
            data.items.forEach((purchasedItem: any) => {
                const stockItemIndex = getStockToBeUpdated.items.findIndex(
                    (item: any) => item._id.toString() === purchasedItem.id
                );

                if (stockItemIndex !== -1) {
                    getStockToBeUpdated.items[stockItemIndex].current_stock += Number(purchasedItem.quantity);
                }
            });
        }

        await getStockToBeUpdated.save();

        const createPurchase = await PurchaseStockModel.create(data);

        return NextResponse.json(
            {
                success: true, message: "Purchase stock data saved successfully",
                data: createPurchase
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving purchase stock data:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
