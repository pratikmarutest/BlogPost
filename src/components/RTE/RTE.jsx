// RTE :- Real - Time Editor
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { Loader } from "../index";
import conf from "../../conf/conf";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full mb-3">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : null}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            onInit={() => setLoading(false)}
            apiKey={conf.tinyMceApiKey}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "paste",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:#1f2937; color:white }",
              skin: "oxide-dark",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
