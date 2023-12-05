import { YoutubeFormDataType } from "@/app/lib/definitions";
import { FormEvent, useState } from "react";
import Alert from "../alert";
import Checkbox from "../checkbox";

const youtubeRegex =
  /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}(?:\?si=[a-zA-Z0-9_-]+)?$/;

const YoutubeForm = ({
  onSubmit,
  closeForm,
}: {
  onSubmit: (data: YoutubeFormDataType) => void;
  closeForm: () => void;
}) => {
  const [formData, setFormData] = useState<YoutubeFormDataType>({
    description: "",
    youtubeLink: "",
    public: false,
    timestamp: 0, // this property is only used to render list
  });

  const [formError, setFormError] = useState<{
    errorAt: "youtubeLink" | "description";
    warnType?: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: any) => {
    // React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    const { name, value } = e.target;
    if (name === "description" && value.length >= 300) {
      setFormError({
        errorAt: name,
        warnType: true,
        message: "Maximum characters of description must be 300!",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.type === "checkbox" ? e.target.checked : value,
        timestamp: new Date().valueOf(),
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.youtubeLink) {
      setFormError({
        errorAt: "youtubeLink",
        message: "Please fill out youtube link!",
      });
      return;
    }

    const { youtubeLink } = formData;
    if (youtubeLink && !youtubeRegex.test(youtubeLink)) {
      setFormError({
        errorAt: "youtubeLink",
        message: "Please fill out youtube link in the correct format!",
      });
    }
    if (youtubeRegex.test(formData.youtubeLink)) {
      onSubmit(formData);
    }
  };

  const handleYoutubeLinkFieldBlur = () => {
    const { youtubeLink } = formData;
    if (youtubeLink) {
      const match = youtubeRegex.test(youtubeLink);
      if (!match) {
        setFormError({
          errorAt: "youtubeLink",
          message: "Please fill out youtube link in the correct format!",
        });
      } else if (match && formError?.errorAt === "youtubeLink") {
        setFormError(null);
      }
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <Alert
        show={!!formError}
        warnType={formError?.warnType}
        message={formError?.message || ""}
      />
      <input
        type="text"
        name="youtubeLink"
        id="youtubeLink"
        placeholder="Enter youtube link *"
        className="px-5 py-4 w-full outline-none rounded-xl bg-white text-lg font-medium placeholder:text-black/40 placeholder:font-medium"
        value={formData.youtubeLink}
        onChange={handleChange}
        onBlur={handleYoutubeLinkFieldBlur}
      />
      <textarea
        name="description"
        id="description"
        rows={3}
        placeholder="Tell me how it relate to this video..."
        className="px-5 py-4 w-full outline-none rounded-xl bg-white text-lg font-medium placeholder:text-black/40 placeholder:font-medium"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <Checkbox
        id="public"
        name="public"
        checked={formData.public}
        label="Make this video visible to others."
        onChange={handleChange}
      />
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={closeForm}
          className="flex-1 text-lg font-medium active:scale-95 duration-200 text-orange-600 bg-white border border-orange-600 py-2 rounded-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 text-lg font-medium active:scale-95 duration-200 flex items-center justify-center space-x-1 py-2 text-white border border-transparent bg-black rounded-xl"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default YoutubeForm;
