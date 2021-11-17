import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const PostDetails = () => {
  const [post, updatePost] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8088/posts/${id}`)
      .then((res) => res.json())
      .then(updatePost);
  }, []);

  const ReturnHome = () => {
    return (
      <button className="button__return">
        <Link to="/posts">Return to Posts List</Link>
      </button>
    );
  };

  const ManageTags = () => {
    return (
      <button className="button_tagManagement">
        <Link to={`/tags/posts/${id}`}>Manage Tags</Link>
      </button>
    );
  };

  return (
    <>
      <h1 className="post__header">Post Details</h1>
      <section className="post__details">
        <h3 className="post__heading">{post.title}</h3>
        <div className="post__item">Content: {post?.content}</div>
        <div className="post__item">Date Posted: {post?.publication_date}</div>
        <div className="post__item">
          Posted By: {post?.user?.first_name} {post?.user?.last_name}
        </div>
        <div className="button__return">
          <ManageTags />
        </div>
        <div className="button__return">
          <ReturnHome />
        </div>
      </section>
    </>
  );
};
