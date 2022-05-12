import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContainer } from '@/components/card';
import { FeedItem } from '@powerplayer/shared';
import {getFeedAndEpisodesBySlug} from '@/api/podcasts';

export async function getServerSideProps(context) {
  // get route param for slug
  const slug = context.params.slug;
  console.dir(context.query);
  const optimizeImages =
    context.query?.optimizeImages &&
    context.query?.optimizeImages === 'true';
  const data = await getFeedAndEpisodesBySlug(slug);
  return {
    props: { ...data, optimizeImages: optimizeImages || false }
  };
}

export default function PodcastEpisodes({ feedDetails, episodes, optimizeImages }) {
    let episodeCards = episodes.map((e:FeedItem) => (
        <Card
          key={e.guid}
          title={e.title}>
          <div className="grid grid-cols-2 gap-4">
            <div className="columns-1">
              {optimizeImages &&
                <Image alt="feedDetails.name" src={feedDetails.imageUrl} width={200} height={200}/>
              }
              {!optimizeImages &&
                <img alt="feedDetails.name" src={feedDetails.imageUrl} width={200} height={200}/>
              }
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
      )
    );
    return (
      <>
        <div className="container">
          <Link href={`../podcasts?optimizeImages=${optimizeImages}`} passHref>
            <button className="text-right p-4 m-4 text-white bg-blue-500 rounded-lg">
              Back to Podcasts
            </button>
          </Link>

          <CardContainer
            title={feedDetails.name}
            cols={1}
            description={
              <div dangerouslySetInnerHTML={{ __html: feedDetails.description}} />
            }
            cards={episodeCards} />
        </div>
      </>
    );
}
