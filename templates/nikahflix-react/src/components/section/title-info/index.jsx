import { useMemo } from "react";

export default function TitleInfo({ data }) {
  const weddingDay = useMemo(() => {
    // Ubah "20 Juli 2025" → format Date JS
    const [tgl, bulan, tahun] = data.tanggal_pernikahan.split(" ");
    const bulanMap = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };
    const date = new Date(tahun, bulanMap[bulan], parseInt(tgl));
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  }, [data.tanggal_pernikahan]);

  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-center">
        <img src="/favicon.ico" alt="logo" width={18} height={18} />
        <span className="text-[#A3A1A1] text-xs mt-0.5 tracking-widest">
          DOCUMENTER
        </span>
      </div>
      <h2 className="text-lg leading-5 text-white font-bold">
        {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}:
        Sebelum Hari H
      </h2>
      <div className="flex gap-1 items-center">
        <span className="text-green-500 mr-2">100% match</span>
        <span className="bg-[#4D4D4D] text-white text-xs px-1 py-0 mr-2 rounded-sm">
          SU
        </span>
        <span className="text-white mr-2">
          {data.tanggal_pernikahan.split("-")[0]}
        </span>
        <span className="text-white mr-2">1h 26m</span>
        <span>
          <img src="./images/4k-icon.png" width={16} height={16} alt="4k" />
        </span>
        <span>
          <img src="./images/hd-icon.png" width={16} height={16} alt="hd" />
        </span>
      </div>
      <div className="bg-[#E50913] py-1 px-2 rounded text-xs text-white font-bold w-fit">
        Coming Soon {weddingDay}, {data.tanggal_pernikahan}
      </div>
      <div className="pt-2">
        <p className="text-white text-sm leading-[1.15rem] mb-2">
          {data.intro}
        </p>
        <p className="text-[#A3A1A1] text-[10px] leading-[1rem]">
          {data.surah}
        </p>
      </div>
    </div>
  );
}
