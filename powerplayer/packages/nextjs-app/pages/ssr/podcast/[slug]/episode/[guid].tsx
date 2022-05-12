import React from 'react';
import styles from './episode.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getFeedInfoBySlug, getFeedItemByGuid } from '@/api/podcasts';
import { useRouter } from 'next/router';

interface Props {
  guid: string;
  imageUrl: string;
  skeleton?: boolean;
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const guid = context.query.guid;

  const feedDetails = await getFeedInfoBySlug(slug);
  const episode = await getFeedItemByGuid(guid);
  return {
    props: {feedDetails, episode}
  }
}
export default function PodcastEpisode({ feedDetails, episode }) {
  const router = useRouter();

  return (
    <>
     <h2>{feedDetails.name}</h2>
      <hr/>
      <Image src={feedDetails.imageUrl} width={200} height={200} alt={episode.name} />
    <div className={styles.title}>
      <Link href={`/ssr/podcast/${feedDetails.slug}`} passHref><a>{ episode.title }</a></Link>
    </div>
    </>
/*
  <hr className={styles.separator} />
  <div className={styles.episode_details}>
    <div className={styles.image}>
      <Image width="500" height="500" src={feedDetails.imageUrl} alt="podcast image" />
    </div>
    <div className={styles.description}
         dangerouslySetInnerHTML={{__html: episode.description}} />
  </div>
  <hr className={styles.separator}/>
  <div className={styles.mediaPlayer}>
    <MediaPlayer url ={ episode.enclosureUrl }/>
  </div>
</div>
</>

 */
);
}
