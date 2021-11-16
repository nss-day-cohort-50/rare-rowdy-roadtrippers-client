import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"


export const Posts = () => {
    const [posts, updatePosts] = useState([])
    const history = useHistory()


    useEffect(
        () => {
             fetch ("http://localhost:8000/posts", {
                 headers: {
                     "Authorization": `Token ${localStorage.getItem("token")}`
                 }
             })
            .then(response => response.json())
            .then((posts) => {
                updatePosts(posts)
            })
        },
        []
    )

    const deletePost = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                fetch ("http://localhost:8000/posts")
                .then(response => response.json())
                .then((posts) => {
                    updatePosts(posts)
                })
            })
    }

    const confirmPostDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this request?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deletePost(id) }
                },
                {
                    label: 'Cancel',
                    onClick: () => alert('Cancel Request')
                }
            ]
        })

    };

    return (
        <>
            <div>
                <button className="createPost" onClick={() => history.push("/posts/create")}>New Post</button>
            </div>

            {
                posts.map(
                    (post) => { 
                        return <> <div key={post.id} className="posts__list">
                            <section>
                                <h4 key={post.id}>Posted by...</h4>
                                <div className="item__postList">Post Title: {post.title}</div>
                                <div className="item__postList">Posted by: {post.user.username}</div>
                                <div className="item__postList">Category: {post.category}</div>
                                <Link to={`/posts/${post.id}`}>Post Details</Link>
                            </section>
                        </div>
                        <button color="primary" onClick={() => {
                            confirmPostDelete(post.id)
                        }}>Delete</button>
                        </>
                    }
                ).reverse()
            }
        </>
    )
}