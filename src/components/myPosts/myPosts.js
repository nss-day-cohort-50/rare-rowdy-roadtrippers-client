import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useHistory } from "react-router-dom"


export const MyPosts = () => {
  const [posts, setPosts] = useState([]);


  const userId = parseInt(localStorage.getItem("token"));


  useEffect(
    () => {
      fetch(`http://localhost:8000/posts?user_id=${userId}`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then((posts) => {
          setPosts(posts)
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
        fetch("http://localhost:8000/posts", {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        })
          .then(response => response.json())
          .then((posts) => {
            setPosts(posts)
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
      <h1>My Posts</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>Title: {post.title}</h2>
          <h3>Posted on: {post.publication_date}</h3>
          <h3>Content: {post.content} </h3>
          <Link to={`/posts/${post.id}`}>Post Details</Link>
          <button color="primary" onClick={() => {
            confirmPostDelete(post.id)
          }}>Delete</button>

        </div>
      ))}
    </>
  );
};