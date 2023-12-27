import React from "react";
import { AddPostForm, Container } from "../components/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const id = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts).find(
    (post) => post.id === id
  );
  if (!post) {
    navigate("/");
  }
  return (
    <div className="py-8">
      <Container>
        <AddPostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
