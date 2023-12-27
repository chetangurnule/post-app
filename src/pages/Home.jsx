import { useState, useEffect } from "react";
import { PostCard } from "../components/index";
import databasesService from "../Appwrite_Services/databases_services";
import { useSelector, useDistpatch } from "react-redux";
import { Container } from "../components/index";
import { fetchPosts } from "../features/posts/postSlice";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.auth.status);
  const dispatch = useDistpatch();

  useEffect(() => {
    try {
      databasesService.getPosts([]).then((response) => {
        if (response) {
          setPosts(response.documents);
          dispatch(fetchPosts(response.documents));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (posts.length === 0) {
    console.log("No posts found", userStatus);
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          {userStatus ? (
            <div className="flex flex-col items-center justify-center my-9">
              <h2 className="text-2xl font-bold mb-4">No Posts Yet......</h2>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center  my-9">
              <h2 className="text-2xl font-bold mb-4">
                Please Login First......
              </h2>
            </div>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        {posts.map((post) => {
          return (
            <div key={post.$id} className="mb-4">
              <PostCard {...post} />
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Home;
