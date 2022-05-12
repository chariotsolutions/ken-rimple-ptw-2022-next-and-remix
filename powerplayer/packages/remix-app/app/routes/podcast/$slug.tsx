import React from 'react';
import { Link } from "@remix-run/react";

import { Card, CardContainer } from '~/components/card';
import { MetaFunction, useLoaderData } from 'remix';
import { getFeedAndEpisodesBySlug } from '~/shared/podcast-api.server';

// want to change an aspect of the headers on page? How about the title?
export const meta: MetaFunction = () => {
  return {
    title: `Remix PowerPlayer - Episodes`
  }
}

// @ts-ignore
export const loader = async ({params, req, res}) => {
  // get route param for slug
  return await getFeedAndEpisodesBySlug(params.slug);
}

export default function PodcastEpisodes() {
  const loader = useLoaderData();
  const { feedDetails, episodes } = loader;
  const episodeCards = episodes.map((e:any) => (
     <Card
       key={e.guid}
       title={e.title}>
       <div className="grid grid-cols-2 gap-4">
         <div className="columns-1">
           <img src={feedDetails.imageUrl} alt={e.title} width={200} height={200}/>
         </div>
         <div>
           <div className="pb-1"><span className="text-lg font-bold pr-5">Publication Date</span><span>{e.pubDate}</span></div>
           <audio
             controls
             preload="none"
             src={e.enclosureUrl}>
             Your browser does not support the <code>audio</code> element.
           </audio>
         </div>
       </div>

       <h4 className="
        font-bold sans
       ">
         Show Notes
       </h4>
       <div
         className="
          h-4/5
          overflow-clip
          overflow-y-scroll
          box-border
          pb-2
          ml-2
          mr-2
          w-full
          "
          dangerouslySetInnerHTML={{ __html: e.description}} />
     </Card>
  ));

  return (
    <>
      <div className="container">
        <Link to={"/podcasts"}>
          <button className="text-right p-4 m-4 text-white bg-blue-500 rounded-lg">
            Back to Podcasts
          </button>
        </Link>

        <CardContainer
          title={feedDetails.name}
          description={
            <div dangerouslySetInnerHTML={{ __html: feedDetails.description}} />
          }
          cards={episodeCards} />
      </div>
    </>
  );
}
