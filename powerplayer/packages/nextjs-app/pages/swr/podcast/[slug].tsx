import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { FeedItem } from '@powerplayer/shared';
import { Card, CardContainer } from '@/components/card';
import Image from 'next/image';
import Link from 'next/link';

export default function PodcastEpisodes() {
  const router = useRouter();
  const {data, error, isValidating} = useSWR(`http://localhost:3010/podcasts/feed/${router.query.slug}`, fetcher);
  const optimizeImages = router.query.optimizeImages === 'true';


  if (error) {
    return <p>{error.toString()}</p>
  }

  if (data) {
    let episodeCards = data.episodes.map((e: FeedItem) => (
      <Card
        key={e.guid}
        title={e.title}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="columns-1">
            {optimizeImages &&
              <Image src={data.feedDetails.imageUrl} alt={data.feedDetails.name} width={200} height={200}/>
            }
            {!optimizeImages &&
              <img src={data.feedDetails.imageUrl} alt={data.feedDetails.name} width={200} height={200}/>
            }
          </div>
          <div>
            <div className="pb-1"><span
              className="text-lg font-bold pr-5">Publication Date</span><span>{e.pubDate}</span></div>
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
          dangerouslySetInnerHTML={{__html: e.description}}/>
      </Card>));
    return (
      <>
        <div className="container">
          <Link href={`../podcasts?optimizeImages=${optimizeImages}`} passHref>
            <button className="text-right p-4 m-4 text-white bg-blue-500 rounded-lg">
              Back to Podcasts
            </button>
          </Link>
          <div>
            <CardContainer
              title={data.feedDetails.name}
              cols={1}
              description={
                <div dangerouslySetInnerHTML={{__html: data.feedDetails.description}}/>
              }
              cards={episodeCards}/>
          </div>
        </div>
      </>);
  } else {
    return <p>Waiting...</p>
  }
}
