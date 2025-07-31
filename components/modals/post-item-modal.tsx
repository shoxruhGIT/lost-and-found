import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X } from "lucide-react";
import { IItems } from "../../types/type";

interface PostItemModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PostItemModal = ({ onClose, onSuccess }: PostItemModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IItems>();

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const apiKey = "797a23a42f72155e17276a73d12881d5";
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const imgURL = response.data.data.url;

      setPreview(imgURL);
      setValue("image", imgURL);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const onPostItem = async (data: IItems) => {
    data.userId = userId;

    const promise = axios.post(
      "https://688978734c55d5c739527348.mockapi.io/api/loastandfound/items",
      data
    );

    await promise;
    toast.promise(promise, {
      loading: "Creating a new item",
      success: "Item created successfully",
      error: "Failed to create item",
    });

    onClose();
    reset();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Post a Lost or Found Item
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit(onPostItem)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                {...register("type", {
                  required: "Type is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select type</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="The name of item"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "Location is required",
                })}
                placeholder="Where was it lost/found?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
                placeholder="When was it lost/found?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...register("status", {
                  required: "Status is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="When was it lost/found?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {uploading && <p>Uploading...</p>}
              {preview && <img src={preview} alt="preview" width={150} />}
              <input type="hidden" {...register("image")} />

              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`px-4 py-2  cursor-pointer  text-white rounded-lg transition-colors duration-200 ${
                  uploading ? "bg-gray-500 hover:bg-gray-600" : "hover:bg-blue-700 bg-blue-600"
                }`}
              >
                {uploading ? "Uploading..." : "Post Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItemModal;
