import { NextResponse } from "next/server"
import connectToDB from "@/database";
import Blog from "@/models/blog"



export async function DELETE(req){

    try{
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: 'Blog Id is required'
            })
        }

        const deleteCurrentBlogByID = await Blog.findByIdAndDelete(getCurrentBlogID);

        if (deleteCurrentBlogByID) {
            return NextResponse.json({
                success: true,
                message: 'Succesfully deleted '
            });
            
        }
        else{
               return NextResponse.json({
            success: false,
            message: 'Something Wentt wrong!! Please try again  '
        })

        }
     
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something Wentt wrong!! Please try again  '
        })
    }

}