import * as React from 'react';
import { fetcher } from '@/utils/fetcher';
import styles from './episode.module.css';
import useSWR from 'swr';
import Spinner from '@/components/spinner/spinner';
import { useRouter } from 'next/router';

export default function PodcastEpisode() {
  const router = useRouter();
  const guid = router.query.guid;

  const { data, isValidating, error } = useSWR(`http://localhost:3010/podcasts/episode/${guid}`, fetcher);

  if (isValidating && !data) {
    return (
      <Spinner />
    );
  }

  if (error) {
    return (
      <pre>{error.toString()}</pre>
    );
  }


  return (
    <div>
      <div className={styles.title}>
        { data && data.title }
      </div>
      <audio controls
             preload="none"
             src={data && data.enclosure_url}>
        Your browser does not support the <code>audio</code> element.
      </audio>  <hr className={styles.separator} />
      <div className={styles.episode_details}>
        <div className={styles.description}
          dangerouslySetInnerHTML={{__html: data && data.description }}
        />
      </div>

    </div>
  );
}
