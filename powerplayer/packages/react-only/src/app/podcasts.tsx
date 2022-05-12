import { ImageCard, CardContainer } from 'components/card';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Podcasts() {

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('/api/podcasts/feeds');
      const json = await response.json();
      setPodcasts(json);
    }
    loadData();
  }, []);

  const cards = podcasts
    .map((p:any) =>
    <ImageCard
      key={p.slug}
      image={p.image_url}>

      <div
        className="
           p-6 py-4
           h-auto

           overflow-clip"
        dangerouslySetInnerHTML={{__html: p.description}} />
      <button className="
        absolute
        bottom-2
        right-2
        rounded-lg
        float-right
        align-bottom
        bg-blue-500
        h-auto
        p-3
        text-white
      ">
        <Link to={`/podcast/${p.slug}`}>Show Details</Link>
      </button>
    </ImageCard>);
  return (
    <CardContainer title="Client-fetched Podcasts using fetch()" cards={cards} cols={3}/>
  );
}
