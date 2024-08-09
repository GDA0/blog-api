import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import 'dotenv/config'

export function UpdatePost() {
  const { postId } = useParams();
  const [posts] = useOutletContext();
  let post = posts.find((post) => post.id === postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`/${postId}`, {
        title,
        content,
      });

      const { post: updatedPost } = response.data;
      post = updatedPost;
      setError("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="text-center mx-auto" style={{ maxWidth: "420px" }}>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <Editor
            apiKey={process.env.API_KEY}
            value={content}
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating Post..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
