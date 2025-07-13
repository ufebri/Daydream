import React, { forwardRef, useEffect, useRef, useState } from "react";
import supabase from "../../../lib/supabaseClient";
import badwords from "indonesian-badwords";
import data from "@/data"; // ✅ gunakan import static

const WishItem = forwardRef(({ name, message, color }, ref) => (
  <div ref={ref} className="flex gap-2">
    <div>
      <img
        width={24}
        height={24}
        src="images/face.png"
        style={{
          backgroundColor: color,
          minWidth: 24,
          minHeight: 24,
        }}
        className="rounded-sm"
      />
    </div>
    <div>
      <p className="text-white text-md -mt-1">{name}</p>
      <p className="text-xs text-[#A3A1A1]">{message}</p>
    </div>
  </div>
));

const colorList = [
  "#ff6b6b",
  "#ffa94d",
  "#ffd43b",
  "#69db7c",
  "#38d9a9",
  "#4dabf7",
  "#9775fa",
  "#f783ac",
  "#fab005",
  "#63e6be",
  "#a9e34b",
  "#748ffc",
];

export default function WishSection() {
  const lastChildRef = useRef(null);
  const [dataList, setDataList] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const slug = data.slug || "unknown"; // ✅ langsung ambil dari static data

  useEffect(() => {
    fetchData(slug);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) return setError("Nama minimal 3 karakter!");
    if (message.length < 10) return setError("Pesan minimal 10 karakter!");
    if (badwords.flag(name)) return setError("Gabolah kata kasar!");

    setLoading(true);
    setError(null);

    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    const newmessage = badwords.censor(message);

    const { error } = await supabase
      .from(import.meta.env.VITE_APP_TABLE_NAME)
      .insert([{ slug, name, message: newmessage, color: randomColor }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      fetchData(slug);
      setTimeout(scrollToLastChild, 500);
      setName("");
      setMessage("");
    }
  };

  const fetchData = async (slug) => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_APP_TABLE_NAME)
      .select("name, message, color")
      .eq("slug", slug);

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setDataList(data);
    }
  };

  const scrollToLastChild = () => {
    if (lastChildRef.current) {
      lastChildRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-5">
        Wish for the couple
      </h2>
      <div className="max-h-[20rem] overflow-auto space-y-4 wish-container">
        {dataList.map((item, index) => (
          <WishItem
            key={index}
            name={item.name}
            message={item.message}
            color={item.color}
            ref={index === dataList.length - 1 ? lastChildRef : null}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="space-y-1">
          <label>Name</label>
          <input
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black"
          />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            required
            minLength={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-white text-black rounded-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
