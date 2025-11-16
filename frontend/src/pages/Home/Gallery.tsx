import React from "react";

const images = [
  {src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb9Mh4xLlPD8IO-FrhP6NQEH_1lFJsfWWZVA&s", span: "row-span-2" },
  {src:"https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=1152/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy83NmJhZjFlYS0zODVhLTQwOGMtODQ2Yi01OTIxMTA4NjE5NmMucG5n", span: "" },
  {src:"https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=1152/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NjRkZDNkMS05NGU3LTQ4MWUtYjI4Yy0wOGQ1OTM1M2I5ZTAucG5n", span: "" },
  {src:"https://assets.cms.bolt.eu/Index_DT_Media_09_ccefa13eaa.webp", span: "" },
  {src:"https://assets.cms.bolt.eu/Index_DT_Media_11_b77b49fd7d.webp",span:"row-span-2"},
  {src:"https://assets.cms.bolt.eu/Index_DT_Media_01_1_681eb62877.webp", span: "col-span-2" },
];

function Gallery() {
  return (
     <section id="gallery" className="py-12 px-4 md:px-12 ">
      <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-4 
        auto-rows-[200px] md:auto-rows-[250px]
      ">
        {images.map((image, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl shadow ${image.span}`}
          >
            <img
              src={image.src}
              className="w-full h-full object-cover hover:scale-110 transition duration-300"
              alt="Gallery item"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
