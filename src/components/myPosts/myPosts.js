import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useHistory } from "react-router-dom"


export const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory()




  useEffect(
    () => {
      fetch(`http://localhost:8000/posts?get_posts_by_user`, {
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
      <div>
        <button className="createPost" onClick={() => history.push("/posts/create")}>New Post</button>
      </div>

      {posts.map((post) => (
        <div key={post.id}>
          <h2 className="item__postList">{post.title}</h2>
          <div className="item__postList">Posted by: {post.rare_user.user.username}</div>
          <div className="item__postList">Category: {post.category.label}</div>
          <Link to={`/posts/${post.id}`}>Post Details</Link>
          <button color="primary" onClick={() => {
            confirmPostDelete(post.id)
          }}>Delete</button>

        </div>
      )).reverse()}
    </>
  );
};