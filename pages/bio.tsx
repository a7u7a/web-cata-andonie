import MyFooter from "../components/my-footer";
import NavBar from "../components/nav-bar";

const Bio = () => {
  return (
    <div>
      <NavBar transparent={true} />
      <div className="w-screen bg-gray-200">
        <div className="pt-28 pb-28 ml-6 text-3xl font-bold w-2/3 text-white">
          B. 1989, Santiago de Chile. Lives and works in Santiago de Chile. Ut
          sodales felis et lectus ullamcorper, eget rhoncus massa viverra.
          Aenean volutpat mauris at ultricies porta. Nullam nec tincidunt sem.
        </div>
      </div>

      <div className="flex justify-between">

      {/* sidebar */}
        <div className="sticky top-0 w-1/4 self-start">
          <div className="flex flex-col mt-28 pl-6">
            <div className="font-bold text-xl">Index</div>
            <div className="flex flex-col space-y-4 mt-10 mb-20 text-gray-600">
              <div>Solo Exhibitions</div>
              <div>Group Exhibitions</div>
              <div>Residencies</div>
              <div>Honors and Awards</div>
              <div>Collections</div>
              <div>Auctions</div>
              <div>Art fairs</div>
              <div>Education</div>
              <div>Workshops</div>
              <div>Teaching</div>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="flex flex-row w-3/4">
          <div className="flex flex-col mb-20">
            <div className="flex items-center h-28">
              <div className="text-3xl ">Bio</div>
            </div>

            <div className="flex flex-row space-x-6 pr-6">
              <div className="text-[0.95rem] w-full">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam atque nam exercitationem, suscipit molestiae dicta
                temporibus! Dolorum porro quaerat suscipit, dolor tenetur sit
                architecto quas optio corporis, id mollitia eveniet
                reprehenderit labore ipsa quod minima consequatur autem sunt
                neque animi. Voluptate ullam iste dolor vero! Expedita commodi,
                impedit ipsum fuga culpa repudiandae quaerat fugiat nemo!
                Consequuntur eveniet voluptate eum obcaecati eaque, porro
                ducimus omnis fugiat assumenda a ipsum autem! Laudantium, qui
                accusamus? Vel, ipsam! Nobis voluptas illo numquam enim illum
                debitis excepturi obcaecati quisquam, nemo velit voluptatem
                earum, dicta aut voluptatibus quae hic. Ut reiciendis laudantium
                nemo ipsa dignissimos quod sed ratione unde, at ipsum explicabo
                atque quo aliquid nulla mollitia ex quasi amet ea inventore
                consectetur? Consectetur ipsam quod esse quaerat, expedita
                officia autem, necessitatibus alias voluptatem laboriosam illo?
                Praesentium laboriosam voluptatem deleniti consequatur minus
                similique sint maxime est modi! Illum eius mollitia vel a nulla
                illo consequuntur fugit, adipisci vero hic soluta commodi
                placeat sequi aspernatur eum eaque, obcaecati cum est incidunt.
                Corporis voluptates quam, quas, libero optio consequuntur unde
                vel eius officia tempore nostrum ab sit? Nam porro ipsa animi
                recusandae amet ab error quia? Optio id animi dignissimos
                reiciendis enim, quos accusamus totam perspiciatis nesciunt iure
                dolorum, harum voluptatibus odio omnis. Inventore quaerat harum
                voluptate excepturi distinctio, ex nisi neque, quasi provident
                velit nulla amet non aspernatur saepe voluptatum eligendi
                deserunt necessitatibus laudantium eum in nemo tempore?
                Consequuntur, dolorum? Suscipit dolore iure animi enim rerum
                quidem tenetur, reprehenderit eius molestiae quia, modi error
                nemo esse obcaecati facilis sed amet, dicta odio architecto!
                Officia at sunt quidem sint? Iure tempore amet quod at nesciunt
                eos nobis adipisci voluptatum repellat consequatur quibusdam
                nihil corrupti, error ab molestias ullam animi. Pariatur, sunt
                voluptatem velit tempore similique fugit quos quia quas magnam
                quod tempora sit unde quasi hic sed eligendi.
              </div>
              <div className="text-[0.95rem] w-full">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam atque nam exercitationem, suscipit molestiae dicta
                temporibus! Dolorum porro quaerat suscipit, dolor tenetur sit
                architecto quas optio corporis, id mollitia eveniet
                reprehenderit labore ipsa quod minima consequatur autem sunt
                neque animi. Voluptate ullam iste dolor vero! Expedita commodi,
                impedit ipsum fuga culpa repudiandae quaerat fugiat nemo!
                Consequuntur eveniet voluptate eum obcaecati eaque, porro
                ducimus omnis fugiat assumenda a ipsum autem! Laudantium, qui
                accusamus? Vel, ipsam! Nobis voluptas illo numquam enim illum
                debitis excepturi obcaecati quisquam, nemo velit voluptatem
                earum, dicta aut voluptatibus quae hic. Ut reiciendis laudantium
                nemo ipsa dignissimos quod sed ratione unde, at ipsum explicabo
                atque quo aliquid nulla mollitia ex quasi amet ea inventore
                consectetur? Consectetur ipsam quod esse quaerat, expedita
                officia autem, necessitatibus alias voluptatem laboriosam illo?
                Praesentium laboriosam voluptatem deleniti consequatur minus
                similique sint maxime est modi! Illum eius mollitia vel a nulla
                illo consequuntur fugit, adipisci vero hic soluta commodi
                placeat sequi aspernatur eum eaque, obcaecati cum est incidunt.
                Corporis voluptates quam, quas, libero optio consequuntur unde
                vel eius officia tempore nostrum ab sit? Nam porro ipsa animi
                recusandae amet ab error quia? Optio id animi dignissimos
                reiciendis enim, quos accusamus totam perspiciatis nesciunt iure
                dolorum, harum voluptatibus odio omnis. Inventore quaerat harum
                voluptate excepturi distinctio, ex nisi neque, quasi provident
                velit nulla amet non aspernatur saepe voluptatum eligendi
                deserunt necessitatibus laudantium eum in nemo tempore?
                Consequuntur, dolorum? Suscipit dolore iure animi enim rerum
                quidem tenetur, reprehenderit eius molestiae quia, modi error
                nemo esse obcaecati facilis sed amet, dicta odio architecto!
                Officia at sunt quidem sint? Iure tempore amet quod at nesciunt
                eos nobis adipisci voluptatum repellat consequatur quibusdam
                nihil corrupti, error ab molestias ullam animi. Pariatur, sunt
                voluptatem velit tempore similique fugit quos quia quas magnam
                quod tempora sit unde quasi hic sed eligendi.
              </div>
              <div className="text-[0.95rem] w-full">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam atque nam exercitationem, suscipit molestiae dicta
                temporibus! Dolorum porro quaerat suscipit, dolor tenetur sit
                architecto quas optio corporis, id mollitia eveniet
                reprehenderit labore ipsa quod minima consequatur autem sunt
                neque animi. Voluptate ullam iste dolor vero! Expedita commodi,
                impedit ipsum fuga culpa repudiandae quaerat fugiat nemo!
                Consequuntur eveniet voluptate eum obcaecati eaque, porro
                ducimus omnis fugiat assumenda a ipsum autem! Laudantium, qui
                accusamus? Vel, ipsam! Nobis voluptas illo numquam enim illum
                debitis excepturi obcaecati quisquam, nemo velit voluptatem
                earum, dicta aut voluptatibus quae hic. Ut reiciendis laudantium
                nemo ipsa dignissimos quod sed ratione unde, at ipsum explicabo
                atque quo aliquid nulla mollitia ex quasi amet ea inventore
                consectetur? Consectetur ipsam quod esse quaerat, expedita
                officia autem, necessitatibus alias voluptatem laboriosam illo?
                Praesentium laboriosam voluptatem deleniti consequatur minus
                similique sint maxime est modi! Illum eius mollitia vel a nulla
                illo consequuntur fugit, adipisci vero hic soluta commodi
                placeat sequi aspernatur eum eaque, obcaecati cum est incidunt.
                Corporis voluptates quam, quas, libero optio consequuntur unde
                vel eius officia tempore nostrum ab sit? Nam porro ipsa animi
                recusandae amet ab error quia? Optio id animi dignissimos
                reiciendis enim, quos accusamus totam perspiciatis nesciunt iure
                dolorum, harum voluptatibus odio omnis. Inventore quaerat harum
                voluptate excepturi distinctio, ex nisi neque, quasi provident
                velit nulla amet non aspernatur saepe voluptatum eligendi
                deserunt necessitatibus laudantium eum in nemo tempore?
                Consequuntur, dolorum? Suscipit dolore iure animi enim rerum
                quidem tenetur, reprehenderit eius molestiae quia, modi error
                nemo esse obcaecati facilis sed amet, dicta odio architecto!
                Officia at sunt quidem sint? Iure tempore amet quod at nesciunt
                eos nobis adipisci voluptatum repellat consequatur quibusdam
                nihil corrupti, error ab molestias ullam animi. Pariatur, sunt
                voluptatem velit tempore similique fugit quos quia quas magnam
                quod tempora sit unde quasi hic sed eligendi.
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
export default Bio;
