import { useEffect, useState } from "react";
import { sanityClient } from "sanity:client";
import Clock from "../../assets/icons/time.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Location from "../../assets/icons/event_location.svg";

const POSTS_QUERY = `*[_type == "post"]{
  _id,
  title,
    Date,
    descripcion,
    "imageUrl": image.asset->url,
    location

}`;

export default function EventsIsland() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(POSTS_QUERY)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <section
      id="events_grid"
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8"
    >
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex flex-col gap-4 p-3 max-w-[550px] border border-primary/50 text-primary hover:bg-pinkCustom/50 transition-colors duration-200"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-2xl">{post.title}</h3>
            <div class="flex gap-2 text-sm">
              <img
                src="/src/assets/icons/calendar.svg"
                class="h-4"
                alt="test"
              />
              <h4>{new Date(post.Date).toLocaleDateString()}</h4>
            </div>
            <div class="flex gap-2 text-sm">
              <img src="/src/assets/icons/time.svg" class="h-4" alt="test" />

              <h4>8:00 AM - 9:30 AM</h4>
            </div>
            <div class="flex gap-2 text-sm">
              <img
                src="/src/assets/icons/event_location.svg"
                class="h-4"
                alt="test"
              />

              <h4>{post.location}</h4>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
