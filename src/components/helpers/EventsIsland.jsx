import { useEffect, useState } from "react";
import { sanityClient } from "sanity:client";

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
            <p className="text-sm text-primary/80">{post.location}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
