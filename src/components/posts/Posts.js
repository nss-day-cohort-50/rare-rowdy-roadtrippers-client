import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


export const Posts = () => {
    const [posts, updatePosts] = useState([])
    const history = useHistory()


    useEffect(
        () => {
             fetch ("http://localhost:8088/posts")
            .then(response => response.json())
            .then((posts) => {
                updatePosts(posts)
            })
        },
        []
    )

    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                return fetch ("http://localhost:8088/posts")
                .then((posts) => {
                    updatePosts(posts)
                })
            })
    }

    return (
        <>
            <div>
                <button className="createPost" onClick={() => history.push("/posts/create")}>New Post</button>
            </div>

            {
                posts.map(
                    (post) => {
                        return <div key={post.id} className="posts__list">
                            <section>
                                <h4 key={post.id}>Posted by...</h4>
                                <div className="item__postList">Post Title: {post.title}</div>
                                <div className="item__postList">Posted by: {post.user.username}</div>
                                <div className="item__postList">Category: {post.category}</div>
                            </section>
                        </div>
                    }
                ).reverse()
            }
        </>
    )
}