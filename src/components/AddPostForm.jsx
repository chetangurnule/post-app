import { Input, Button, Select, RTE } from "./index";
import { useForm } from "react-hook-form";
import storageService from "../Appwrite_Services/bucket_service";

const AddPostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || false,
      },
    });

  const submit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Title"
          type="text"
          placeholder="Enter the Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          type="text"
          placeholder="Enter the slug"
          {...register("slug", { required: true })}
        />
        <Input
          label="Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {/* {post && (
        <div className="w-full mb-4">
          <img
            src={storageService.getFilePreview(post.imageId)}
            alt={post.title}
            className=" rounded-lg"
          />
        </div>
      )} */}
        {/* <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        /> */}

        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddPostForm;
