
import { Button } from "@mantine/core";
import React from "react";

export default function PaginationComp({totalPosts, postsPerPage, currentPage, setCurrentPage}){

    let pages = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
    {
        pages.push(i);
    }

    return(
        <div className="flex justify-center space-x-2 mt-4 mb-6">
            <div className='pagination'>
            {
                pages.map((page, index) => (
                    <button
                        key={index}
                        className={page == currentPage ? "active" : ""}
                        onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))
            }
            </div>
        </div>
    )
}
