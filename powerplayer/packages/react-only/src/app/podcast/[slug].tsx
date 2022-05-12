import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FeedItem } from '@powerplayer/shared';
import { Card, CardContainer } from 'components/card';

interface PodcastEpisodeProps {
  slug?: string;
}

export default function PodcastEpisodes({slug}: PodcastEpisodeProps) {
  const params = useParams();

  const [data, setEpisodes]: [ data: any, setEpisodes: Function ] = useState(undefined);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`/api/podcasts/feed/${params.slug}`);
      const data = await response.json();
      setEpisodes(data);
    }
    loadData();
  }, [params.slug]);

  if (data) {
    let episodeCards = data.episodes.map((e: FeedItem) => (
      <Card
        key={e.guid}
        title={e.title}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="columns-1">
            <img src={data.feedDetails.imageUrl} alt={data.feedDetails.name} width={200} height={200}/>
          </div>
          <div>
            <div className="pb-1"><span
              className="text-lg font-bold pr-5">Publication Date</span><span>{e.pubDate.toString()}</span></div>
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
          <Link to="/">
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
