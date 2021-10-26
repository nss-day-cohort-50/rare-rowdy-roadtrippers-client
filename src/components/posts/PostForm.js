import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const PostForm = () => {
    const [post, updatePost] = useState({
        title: "",
        content: ""
    })

    const history = useHistory()

    const submitPost = () => {

        const newPost = {
            user_id: parseInt(localStorage.getItem("lu_token")),
            category_id: post.category,
            title: post.title,
            publication_date: Date(),
            content: post.content,
            approved: Boolean
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }

        return fetch("http://localhost:8088", fetchOption)
            .then(() => {
                history.push("/posts")
            })
    };

    return (
        <form className="post__form">
            <div className="postForm">
                <h2>Post A Message</h2>
                <fieldset>
                    <div className="post-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            onChange={
                                (event) => {
                                    const copy = { ...post }
                                    copy.title = event.target.value
                                    updatePost(copy)
                                }
                            }
                            id="title"
                            name="title"
                            type="text"
                            className="title"
                            placeholder="Enter Title Here"/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="postForm">
                        <label htmlFor="content">Post Entry</label>
                        <textarea
                            onchange={
                                (event) => {
                                    const copy = { ...post }
                                    copy.content = event.target.value
                                    updatePost(copy)
                                }
                            }
                            id="content"
                            name="content"
                            type="text"
                            className="content"
                            placeholder="Enter message here"></textarea>
                    </div>
                </fieldset>

                <button className="button__submit" onClick={submitPost}>
                    Submit Post
                </button>
            </div>
        </form>
    )

}
