import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, featuredImage, title }) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <div className="w-full mb-4 justify-center">
            <img
              className="rounded-xl w-full"
              src={service.getFilePreview(featuredImage)}
              alt={title}
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
