import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog"


const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});


export async function PUT(req) {
    try {

        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: ' Blog Id Is Required '
            })
        }

        const { title, description } = await req.json()

        const { error } = EditBlog.validate({
            title,
            description,
        })

        if (error) {
            return NextResponse.json({
                sucess: false,
                message: error.details[0].message
            })
        }


        const updateBlogByBlogID = await Blog.findOneAndUpdate(
            {
                _id: getCurrentBlogID,
            },
            { title, description },
            { new: true }
        );

        if (updateBlogByBlogID) {
            return NextResponse.json({
                success: true,
                message: 'Blog is updated Successfully '
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong!! Do it Again Properly!!"
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong!! Do it Again Properly"
        });
    }
}