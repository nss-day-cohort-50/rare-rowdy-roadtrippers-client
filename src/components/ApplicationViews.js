import React from "react"
import { Route } from "react-router-dom"
import { PostForm } from "./posts/PostForm"
import { Posts } from "./posts/Posts"

{/* <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main> */}

export const ApplicationViews = () => {
    return (<>
        <Route exact path="/posts">
            <Posts />
        </Route>
        <Route exact path="/posts/create">
            <PostForm />
        </Route>
    </>
    )
}
