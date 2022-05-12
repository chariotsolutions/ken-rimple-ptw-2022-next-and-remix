import React, { useState, useEffect } from 'react';
import styles from './episode.module.css';
import { FeedItem } from '@powerplayer/shared';

interface PodcastEpisodeProps {
  guid: string;
}

export default function PodcastEpisode({ guid }: PodcastEpisodeProps) {
  const [episode, setEpisode] = useState<FeedItem|undefined>(undefined);

  // TODO - get guid
  useEffect(() => {
    async function loadData() {

      const response = await fetch(`http://localhost:3010/podcasts/episode/${guid}`);
      const data = await response.json();
      setEpisode(data);
    }

    loadData();
  }, []);
  // get it const guid = router.query.guid;

  return (
    <div>
      <div className={styles.title}>
        { episode && episode.title}
      </div>
      <audio controls
             preload="none"
             src={episode && episode.enclosureUrl}>
        Your browser does not support the <code>audio</code> element.
      </audio>  <hr className={styles.separator} />
      <div className={styles.episode_details}>
        <div className={styles.description}
          dangerouslySetInnerHTML={{__html: episode && episode.description || ''}}
        />
      </div>

    </div>
  );
}
