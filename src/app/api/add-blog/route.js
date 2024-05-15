import connecToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})


export async function POST(req) {
    try {
        await connecToDB();

        const extractBlogData = await req.json();
        const { title, description } = extractBlogData;

        const { error } = AddNewBlog.validate({
            title, description
        })

        if (error) {
            return NextResponse.json({
                sucess: false,
                message: error.details[0].message
            })
        }

        const newlyCreatedBlogItem = await Blog.create(extractBlogData);
        if (newlyCreatedBlogItem) {
            return NextResponse.json({
                success: true,
                message: 'Blog added Successfully'
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: 'Somethimg went wrong ! Please Try Again'

            })
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Somethimg went wrong ! Please Try Again'

        })
    }
}