import { Link, Meta, useLoaderData } from '@remix-run/react';
import { getFeeds } from '~/shared/podcast-api.server';
import { ImageCard, CardContainer } from '~/components/card';
import type { FeedDetails } from '@powerplayer/shared/src/domains';
import { MetaFunction } from 'remix';

export const loader = async () => {
  return await getFeeds();
};

// want to change an aspect of the headers on page? How about the title?
export const meta: MetaFunction = () => {
  return {
    title: 'Remix PowerPlayer - Podcasts'
  }
}


// NOTE here's a loader using server-side fetch...
// export const loader = async () => {
//   console.log('loader is running here...')
//   const request = await fetch(`http://localhost:3010/podcasts/feed?delayResponse=true&uri=https%3A%2F%2Fchariotsolutions.com%2Fpodcasts%2Fshow%2Ftechcast%2Ffeed%2F`);
//   return await request.json();
// };

export default function Podcasts() {
  const feedData = useLoaderData();

  const cards = feedData.map((p: FeedDetails) => (
    <ImageCard
      key={p.slug}
      image={p.imageUrl}>
      <div className="
        p-6 py-4 h-auto
        overflow-clip"
        dangerouslySetInnerHTML={{ __html: p.description }} />
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
      <Link to={`/podcast/${p.slug}`}>Show Details</Link></button>
    </ImageCard>
  ));
  return (
    <CardContainer title="Your podcasts..." cards={ cards }/>
  )
};
