"use client"

import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddNewBlog from "../add-new-blog";
// import DeleteBlog from "../"
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function BlogOverview({ blogList }) {

    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const initialBlogFormData = {
        title: ' ',
        description: ' '
    }

    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
    const [currentEditedBlogID, setCurrentEditedBlogId] = useState(null);

    //to refresh page

    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])

    console.log(blogFormData);

    async function handleSaveBlogData() {
        try {
            setLoading(true);
            const apiResponse = currentEditedBlogID !== null ?
                await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData),
                })
                : await fetch("/api/add-blog", {
                    method: "POST",
                    body: JSON.stringify(blogFormData),
                });
            const result = await apiResponse.json();
            if (result.success) {
                setBlogFormData(initialBlogFormData);
                setOpenBlogDialog(false);
                setCurrentEditedBlogId(null);
                setLoading(false);

                router.refresh()
            }
            console.log(result);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setBlogFormData(initialBlogFormData)

        }
    }

    async function handleDeleteBlogByID(getCurrentID) {

        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
                method: "DELETE",
            });
            const result = await apiResponse.json();

            if (result?.success) router.refresh();

        } catch (error) {
            console.log(error);

        }
    }

    function handleEdit(getCurrentBlog) {
        setCurrentEditedBlogId(getCurrentBlog?._id);
        setBlogFormData({
            title: getCurrentBlog?.title,
            description: getCurrentBlog?.description,
        })
        setOpenBlogDialog(true)
    }

    console.log(currentEditedBlogID);

    return (
        <div className=" min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <AddNewBlog
                openBlogDialog={openBlogDialog}
                setOpenBlogDialog={setOpenBlogDialog}
                loading={loading}
                setLoading={setLoading}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                handleSaveBlogData={handleSaveBlogData}
                currentEditedBlogID={currentEditedBlogID}
                setCurrentEditedBlogId={setCurrentEditedBlogId}
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 '>
                {
                    blogList && blogList.length > 0 ? blogList.map(blogItem =>
                        <Card className='p-5'>
                            <CardContent className='mb-3'>
                                <CardTitle>{blogItem?.title}</CardTitle>
                                <CardDescription>{blogItem?.description}</CardDescription>
                                <div className='mt-5 flex gap-5 items-center'>
                                    <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                                    <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>Delete</Button>
                                </div>

                            </CardContent>
                        </Card>
                    ) : <Label className='text-3xl font-extrabold'>Please Add Something First or Check your Database Connection </Label>
                }
            </div>
        </div>
    );
}
export default BlogOverview;

