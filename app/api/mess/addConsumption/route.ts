import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import ConsumptionModel from "@/models/consumption.model";
import InventoryModel from "@/models/inventory.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const data = await req.json();
        console.log("reached here in add consumption api", data);

        const stockDocumentId = data.documentId;

        const getStockToBeUpdated = await InventoryModel.findById(stockDocumentId);

        if (!getStockToBeUpdated) {
            return NextResponse.json(
                { success: false, message: "Stock not found" },
                { status: 404 }
            );
        }


        //console.log("here is that stock", getStockToBeUpdated);

        const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Other'];

        mealTypes.forEach(meal => {
            if (data[meal] && Array.isArray(data[meal])) {
                data[meal].forEach((consumedItem: any) => {
                    const stockItemIndex = getStockToBeUpdated.items.findIndex(
                        (item: any) => item._id.toString() === consumedItem.id
                    );

                    if (stockItemIndex !== -1) {
                        getStockToBeUpdated.items[stockItemIndex].current_stock -= Number(consumedItem.quantity);
                    }
                });
            }
        });

        await getStockToBeUpdated.save();


        const createConsumption = await ConsumptionModel.create(data);

        return NextResponse.json(
            {
                success: true, message: "Consumption data saved successfully",
                data: createConsumption
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving consumption data:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
