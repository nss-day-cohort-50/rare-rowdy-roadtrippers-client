import React, { useEffect, useState } from "react";


export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    
  
    const userId = parseInt(localStorage.getItem("token"));
  
  
    useEffect(
        () => {
             fetch (`http://localhost:8000/posts?user_id=${userId}`, {
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
  
    return (
      <>
        <h1>My Posts</h1>
  
        {posts.map((post) => (
            <div key={post.id}>
              <h2>Title: {post.title}</h2>
              <h3>Posted on: {post.publication_date}</h3>
              <h3>Content: {post.content} </h3>
            
            </div>
        ))}
      </>
    );
  };