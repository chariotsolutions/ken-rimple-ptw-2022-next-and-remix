import React from 'react';
import Image from 'next/image';
import MediaPlayer from '@/components/media-player/media-player';
import {
  getFeedItemByGuid, getFeedInfoBySlug, getSlugAndGuidsForPodcasts
} from '@/api/podcasts';
import styles from './episode.module.css';


export async function getStaticPaths() {
  const slugsAndGuids = await getSlugAndGuidsForPodcasts();
  const guidPaths = slugsAndGuids.map(s => ({ params: {slug: s.slug, guid: s.guid}}));

  return {
    paths: guidPaths,
    fallback: 'blocking'   // will fall back to SSR if not found
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const guid = context.params.guid;
  const feedDetails = await getFeedInfoBySlug(slug);


  const episode = await getFeedItemByGuid(guid);
  return {
    props: {feedDetails: feedDetails, episode: episode}
  }
}

export default function PodcastEpisode({ feedDetails, episode }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        { episode.title }
      </div>
      <hr className={styles.separator} />
      <div className={styles.episode_details}>
        <div className={styles.image}>
          <Image src={feedDetails.imageUrl} width={200} height={200} alt="podcast image" />
        </div>
        <div className={styles.description}
        dangerouslySetInnerHTML={{__html: episode.description}}/>
      </div>
      <hr className={styles.separator}/>
       <div className={styles.mediaPlayer}>
        <MediaPlayer url ={ episode.enclosureUrl }/>
      </div>
    </div>
  );
}
