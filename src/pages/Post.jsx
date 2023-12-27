import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postSlice";
import databasesService from "../Appwrite_Services/databases_services";
import storageService from "../Appwrite_Services/bucket_service";
import parse from "html-react-parser";

const Post = () => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    navigate("/");
  }
  const userData = useSelector((state) => state.auth);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePostFunc = () => {
    dispatch(deletePost(post.$id));
    databasesService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.imageId);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getFilePreview(post.imageId)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePostFunc}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
