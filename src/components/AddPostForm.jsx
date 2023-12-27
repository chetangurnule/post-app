/**
 * Transforms a string into a slug.
 * @param {string} value - The input string to be transformed.
 * @returns {string} The resulting slug.
 */

import { Input, Button, Select, RTE } from "./index";
import { useForm } from "react-hook-form";
import storageService from "../Appwrite_Services/bucket_service";
import databasesService from "../Appwrite_Services/databases_services";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

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
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deleteFile(data.imageId);
      }
      const dbPost = await databasesService.updatePost(post.$id, {
        ...data,
        imageId: file ? file.$id : undefined,
      });

      if (dbPost) {
        Navigate("/post/${dbPost.$id}");
      }
    } else {
      const file = await storageService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.imageId = fileId;
        const dbPost = await databasesService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          Navigate("/post/${dbPost.$id}");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch(
      (value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
        return () => subscription.unsubscribe();
      },
      [watch, slugTransform, setValue]
    );
  });
  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg flex">
      <div className="w-2/3 pr-4">
        <Input
          label="Title"
          type="text"
          placeholder="Enter the Title"
          {...register("title", { required: true })}
          className="mb-4"
        />
        <Input
          label="Slug"
          type="text"
          placeholder="Enter the slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          className="mb-4"
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="mb-4"
        />
      </div>
      <div className="w-1/3 pl-4">
        <Input
          label="Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.imageId)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
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
      </div>
    </div>
  );
};

export default AddPostForm;
