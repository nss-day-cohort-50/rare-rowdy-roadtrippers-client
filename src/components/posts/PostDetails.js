import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"


export const PostDetails = () => {
    const [post, updatePost] = useState({})
    const [postList, syncPostList] = useState([])
    const { id } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8000/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(syncPostList)
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8000/posts/${id}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    updatePost(data)
                })
        },
        [id]
    )

    const deletePost = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                fetch("http://localhost:8000/posts", {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                    .then(response => response.json())
                    .then((posts) => {
                        syncPostList(posts)
                    })
                    .then(() => {
                        history.push("/myPosts")
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


    const ReturnHome = () => {
        return <button className="button__return">
            <Link to="/posts">Return to Posts List</Link>
        </button>
    }

    const ManageTags = () => {
        return <button className="button_tagManagement">
            <Link to={`/tags/posts/${id}`}>Manage Tags</Link>
        </button>
    }

    return (
        <>
            <h1 className="post__header">Post Details</h1>
            <section className="post__details">
                <h3 className="post__heading">{post.title}</h3>
                <div className="post__item">Content: {post?.content}</div>
                <div className="post__item">Date Posted: {post?.publication_date}</div>
                <div className="post__item">Posted By: {post?.rare_user?.user.first_name} {post?.rare_user?.user.last_name}</div>
                <div className="button__return"><ManageTags /></div>
                <div className="button__return"><ReturnHome /></div>
                <button color="primary" onClick={() => {
                    confirmPostDelete(post.id)
                }}>Delete</button>
            </section>
        </>
    )

}