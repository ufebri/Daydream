export default function BreakingNews({ data }) {
  return (
    <div>
      <h2 className="font-bold mb-4">Breaking News</h2>
      <img
        className="w-full rounded-md"
        height={300}
        src={data.breaking_news_img}
      />
      <div className="text-[#A3A1A1] text-sm italic leading-[1.15rem] mt-2">
        <div
          className="space-y-2"
          dangerouslySetInnerHTML={{
            __html: data.breaking_news_content,
          }}
        ></div>
      </div>
    </div>
  );
}
