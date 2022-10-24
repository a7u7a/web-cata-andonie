const BioIndex = () => {
  return (
    <div className="flex flex-col mt-36 pl-6 pr-6">
      {/* sidebar */}
      <div className="flex flex-col space-y-12 mt-10 mb-20 text-gray-600">
        <div className="flex flex-col space-y-4">
          <a href="#Solo_Exhibitions" className="text-xl hover:underline">
            Solo Exhibitions
          </a>
          <a href="#Group_Exhibitions" className="text-xl hover:underline">
            Group Exhibitions
          </a>
          <a href="#Residencies" className="text-xl hover:underline">
            Residencies
          </a>
          <a href="#Honors_and_Awards" className="text-xl hover:underline">
            Honors and Awards
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <a href="#Collections" className="text-xl hover:underline">
            Collections
          </a>
          <a href="#Auctions" className="text-xl hover:underline">
            Auctions
          </a>
          <a href="#Art_Fairs" className="text-xl hover:underline">
            Art Fairs
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <a href="#Education" className="text-xl hover:underline">
            Education
          </a>
          <a href="#Workshops" className="text-xl hover:underline">
            Workshops
          </a>
          <a href="#Teaching" className="text-xl hover:underline">
            Teaching
          </a>
        </div>
      </div>
    </div>
  );
};

export default BioIndex;
