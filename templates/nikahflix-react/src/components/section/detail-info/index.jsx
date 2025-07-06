import TitleInfo from "../title-info";
import BreakingNews from "../breaking-news";
import Bridegroom from "../bride-groom";
import LoveStory from "../love-story";
import OurGallery from "../our-gallery";
import WishSection from "../wish";
import Footer from "../footer";
import SongButton from "../../ui/song-button";

export default function DetailInfo({ data }) {
  return (
    <div className="space-y-5 pb-10">
      <video className="w-full" autoPlay loop muted playsInline>
        <source src={data.url_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="px-4 space-y-4">
        <TitleInfo data={data} />
        {data.show_menu.breaking_news && <BreakingNews data={data} />}
        {data.show_menu.bride_and_groom && <Bridegroom data={data} />}
        {data.show_menu.love_story && <LoveStory data={data} />}
        {data.show_menu.gallery && (
          <OurGallery
            gallery={data.gallery}
            show_menu={data.show_menu}
            data={data}
          />
        )}
        <div className="text-center pb-4">
          <div className="mb-2">
            <iframe
              src={data.mapEmbedUrl}
              style={{
                border: 0,
                width: "100%",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a
            className="text-center underline"
            href={data.gmap_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Lokasi
          </a>
        </div>
        {data.show_menu.wish && import.meta.env.VITE_APP_TABLE_NAME ? (
          <WishSection />
        ) : null}
      </div>
      <Footer />
      <SongButton data={data} />
    </div>
  );
}
