import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import connecToDB from "@/database";

export async function GET(){
    try {
        await connecToDB();
        const extractAllBlogsFromDataBase = await Blog.find({});

        if(extractAllBlogsFromDataBase) {
            return NextResponse.json({
                success: true,
                data : extractAllBlogsFromDataBase,
            });

        }
        else{
            return NextResponse.json({
            success: false,
            message: "Something not works Properly !! Try again Later"
        });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Works Wrong!! Try again Later"
        });
    }

}