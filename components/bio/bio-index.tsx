const BioIndex = () => {
  return (
    <div className="sticky top-0 w-1/4 self-start">
      {/* sidebar */}
      <div className="flex flex-col mt-36 pl-6">
        <div className="font-bold text-xl">Index</div>
        <div className="flex flex-col space-y-4 mt-10 mb-20 text-gray-600">
          <div className="text-xl">Solo Exhibitions</div>
          <div className="text-xl">Group Exhibitions</div>
          <div className="text-xl">Residencies</div>
          <div className="text-xl">Honors and Awards</div>
          <div className="text-xl">Collections</div>
          <div className="text-xl">Auctions</div>
          <div className="text-xl">Art fairs</div>
          <div className="text-xl">Education</div>
          <div className="text-xl">Workshops</div>
          <div className="text-xl">Teaching</div>
        </div>
      </div>
    </div>
  );
};

export default BioIndex;
