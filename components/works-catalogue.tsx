import Image from "next/image";

const getImages = () => {
  const filenames = [];
  for (let i = 0; i < 19; i++) {
    const name = `/imgs/works/${i + 1}.jpg`;
    console.log("name", name);
    filenames.push(name);
  }
  return filenames;
};

const WorksCatalogue = () => {
  const filenames = getImages();
  return (
    <div className="ml-2 mr-2 mb-2">
      <div className="pl-4 pt-8 pb-8 text-3xl">All Works</div>
      <div className="grid grid-cols-8 gap-x-2 gap-y-2">
        {filenames.map((p, i) => (
          <div key={p} className="relative h-44 w-full cursor-pointer">
            <Image src={p} objectFit="cover" layout="fill" alt="imagen" />
            <div className="absolute opacity-0 hover:opacity-100 left-0 top-0 inset-0 font-bold">
              <div className="text-lg p-3 text-white">Title</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WorksCatalogue;
