import React from "react"
import { Route } from "react-router-dom"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoryList } from "./categories/CategoryList"
import { MyPosts } from "./myPosts/myPosts"
import { PostDetails } from "./posts/PostDetails"
import { PostForm } from "./posts/PostForm"
import { Posts } from "./posts/Posts"
import { TagDetails } from "./tags/TagDetails"
import { TagForm } from "./tags/TagForm"
import { TagsList } from "./tags/TagsList"

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
        <Route exact path="/posts/:id(\d+)">
            <PostDetails />
        </Route>
        <Route exact path="/posts/create">
            <PostForm />
        </Route>
        <Route exact path ="/myPosts">
            <MyPosts />
        </Route>
        <Route exact path ="/tags/posts/:post_id">
            <TagsList />
        </Route>
        <Route exact path ="/tags">
            <TagsList />
        </Route>
        <Route exact path ="/tags/create">
            <TagForm />
        </Route>
        <Route exact path ="/tags/:id(\d+)">
            <TagDetails />
        </Route>
        <Route exact path="/categories">
            <CategoryList />
        </Route>
        <Route exact path="/categories/create">
            <CategoryForm />
        </Route>
    </>
    )
}
