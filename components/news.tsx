const News = () => {
  return (
    <div className="bg-gray-200 pt-8 pb-8">
      <div className="flex flex-row justify-between pl-4 pr-4">
        <div className="text-black text-3xl">Exhibitions</div>
        <div className="text-black text-3xl underline cursor-pointer">Bio</div>
      </div>
      <div className="pl-4 pr-4 pt-8">
        <div className="flex flex-row max-h-72">

          <div className="flex flex-col w-1/2 mr-1">
            <div className="font-bold text-xl">Current</div>
            <ul className="space-y-1">
              <li>Group Show, The name of a current show, more info.</li>
            </ul>
            <div className="font-bold text-xl mt-2">Recent</div>
            <ul className="space-y-1">
              <li>Group Show, The name of a current show, more info.</li>
              <li>Group Show, The name of a current show, more info.</li>
            </ul>
          </div>

          <div className="flex flex-col w-1/2 ml-1">
            <div className="font-bold text-xl">Upcoming</div>
            <ul className="space-y-1">
              <li>Group Show, The name of a current show, more info.</li>
              <li>Group Show, The name of a current show, more info.</li>
              <li>Group Show, The name of a current show, more info.</li>
              <li>Group Show, The name of a current show, more info.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
