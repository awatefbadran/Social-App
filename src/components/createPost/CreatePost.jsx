import { Avatar, Button, Input, Select, SelectItem } from "@heroui/react";
import { FiImage } from "react-icons/fi";
import { LuSmile } from "react-icons/lu";
import { IoSendOutline } from "react-icons/io5";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LuEarth } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { createPost } from "../../Services/postServices";
import { MdScheduleSend } from "react-icons/md";
import { toast } from "react-toastify";
export default function CreatePost({ refetchPosts }) {
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [displayPhoto, setDisplayPhoto] = useState(null)
  const [sendPhoto, setSendPhoto] = useState("")
  const { userData } = useContext(AuthContext);
  const [postLoading, setPostLoading] = useState(false)

  const emojiRef = useRef(null);
  const inputphoto = useRef()
  function handelUploadPhoto() {
    inputphoto.current.click()
  }
  function handelselectedImg() {
    // console.log(inputphoto.current.files[0])
    setSendPhoto(inputphoto.current.files[0])
    setDisplayPhoto(URL.createObjectURL(inputphoto.current.files[0]))
  }
  useEffect(() => {
    const picker = emojiRef.current;
    if (!picker) return;

    const handleEmoji = (event) => {
      setContent((prev) => prev + event.detail.emoji);
    };

    picker.addEventListener("emoji-pick", handleEmoji);

    return () => {
      picker.removeEventListener("emoji-pick", handleEmoji);
    };
  }, [showEmoji]);
  async function handelfetchingPost() {
    try {
      const formData = new FormData();
      formData.append("body", content)
      if (sendPhoto) {
        formData.append("image", sendPhoto)
      }
   
      setPostLoading(true)
      const res = await createPost(formData)
      toast.success(res.data.message)
      setContent("")
      setDisplayPhoto(null)
      setSendPhoto(null)
      refetchPosts()
      refetchPosts();

      console.log(res)
    } catch (error) {
      toast.error("faild to create post")

    } finally {
      setPostLoading(false)
    }

  }
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar
          size="md"
          src={
            userData?.photo ||
            "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
          }
        />

        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold text-lg">
            {userData?.username || "Guest"}
          </h3>


          <Select
            size="lg"
          defaultSelectedKeys={["public"]}
            className="w-40"
            classNames={{
              trigger: "bg-gray-200 text-gray-700 rounded-xl px-4 py-2 flex items-center gap-2",
              content: "bg-white rounded-xl shadow-md",
            }}
          >
            <SelectItem key="public" startContent={<LuEarth size={18} />}>
              Public
            </SelectItem>

            <SelectItem key="friends" startContent={<LuUsers size={18} />}>
              Friends
            </SelectItem>

            <SelectItem key="onlyMe" startContent={<LuLock size={18} />}>
              Only Me
            </SelectItem>
          </Select>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`What's on your mind, ${userData?.username || "Guest"}?`}
        className={`w-full bg-gray-100 rounded-xl p-4 outline-none resize-none ${displayPhoto ? "min-h-[30px]" : "min-h-[120px]"
          } text-gray-700`}
      />
      {displayPhoto && (
        <div className="relative ">

          <img
            className=" rounded-lg"
            src={displayPhoto}
            alt="preview"
          />

          <button
            onClick={() => {
              setDisplayPhoto(null)
              setSendPhoto(null)
            }}
            className="absolute top-1 right-1 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
          >
            <IoClose />
          </button>

        </div>
      )}
      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-gray-600">

          <button onClick={() => { setDisplayPhoto(null); handelUploadPhoto(); }} className="flex items-center gap-2  transition cursor-pointer">
            <FiImage size={20} className="text-green-600 " />
            Photo/video
          </button>
          <Input onInput={() => handelselectedImg()} className="hidden" ref={inputphoto} type="file" />

          {/* Emoji */}
          <div className="relative">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="flex items-center gap-2  transition cursor-pointer"
            >
              <LuSmile size={20} className="text-yellow-500 " />
              Feeling/activity           </button>

            {showEmoji && (
              <div className="absolute top-full mt-2 z-50">
                <unicode-emoji-picker
                  ref={emojiRef}
                  skin-tone="3"
                  style={{ width: "240px", height: "300px" }}
                ></unicode-emoji-picker>
              </div>
            )}
          </div>

        </div>

        <Button
          onPress={handelfetchingPost}
          className="bg-blue-500 text-white px-6"
          endContent={postLoading ? <MdScheduleSend size={18} /> : <IoSendOutline size={18} />}
          isDisabled={!content.trim() && !sendPhoto}
        >
          Post
        </Button>
      </div>
    </div>
  );
}