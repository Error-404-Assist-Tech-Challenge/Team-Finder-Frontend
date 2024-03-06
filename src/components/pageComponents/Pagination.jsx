
import { Button } from "@mantine/core";
import React from "react";

export default function PaginationComp({totalPosts, postsPerPage, setCurrentPage}){

    let pages = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
    {
        pages.push(i);
    }

    return(
        <div className="flex justify-center space-x-2 mt-4 mb-6">
            {
                pages.map((page, index) => (
                    <Button key={index} onClick={() => setCurrentPage(page)} variant='outline' color='gray'>{page}</Button>
                ))
            }
        </div>
    )
}
