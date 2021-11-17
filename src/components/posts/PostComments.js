import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const PostComments = () => {
  const [post, updatePost] = useState({});
  const { id } = useParams();
  const [comment, updateComment] = useState({
    content: "",
    created_on: "",
  });
  const history = useHistory();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        updatePost(data);
      });
  };

  const submitComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: comment.content,
      created_on: Date(),
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newComment),
    };

    return fetch(
      `http://localhost:8000/posts/${id}/createComment`,
      fetchOption
    ).then(() => {
      fetchPost();
    });
  };

  return (
    <>
      <div>{post.title}'s Comments</div>
      <div>
        <textarea
          onChange={(event) => {
            const copy = { ...comment };
            copy.content = event.target.value;
            updateComment(copy);
          }}
        ></textarea>
        <button
          onClick={(evt) => {
            submitComment(evt);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        {post.comments?.map((comment) => {
          return (
            <div>
              {comment.content} <br />-{comment.author.user.username}
            </div>
          );
        })}
      </div>
    </>
  );
};
