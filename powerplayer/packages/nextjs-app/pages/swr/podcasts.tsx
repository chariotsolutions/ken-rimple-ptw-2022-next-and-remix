import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '@/utils/fetcher';
import Spinner from '@/components/spinner/spinner';
import { ImageCard, CardContainer } from '@/components/card';
import Link from 'next/link';
import Head from 'next/head';
import React, { useState } from 'react';

/**
 * Create skeletons on the server side before loading component
 */
export function getStaticProps(context) {

  return {
    props: {
      podcastSkeletons: [
        {
          guid: 'aaa-bbb-cc1',
          title: 'loading podcasts...',
          description: 'loading podcasts...',
          audioFile: 'http://dev.null'
        },
        {
          guid: 'aaa-bbb-cc2',
          title: 'loading podcasts...',
          description: 'loading podcasts...',
          audioFile: 'http://dev.null'
        },
        {
          guid: 'aaa-bbb-cc3',
          title: 'loading podcasts...',
          description: 'loading podcasts...',
          audioFile: 'http://dev.null'
        },
        {
          guid: 'aaa-bbb-cc4',
          title: 'loading podcasts...',
          description: 'loading podcasts...',
          audioFile: 'http://dev.null'
        }
      ]
    }
  }
}

export default function Podcasts({defaultNumRows}) {
  function handleResultSizeChange(event) {
    console.log('GOT IT', event.target.value);
    console.log(typeof event.target.value);
    setNumRows(event.target.value);
    mutate();
  }
  const [numRows, setNumRows] = useState(defaultNumRows);
  const {data, error, isValidating, mutate} =
    useSWR(`http://localhost:3010/podcasts/feeds?numRows=${numRows}`, fetcher);
  const router = useRouter();
  const optimizeImages = router.query.optimizeImages == 'true';

  if (error) {
    return <pre>{ JSON.stringify(error) }</pre>
  }

  if (isValidating) {
    return <Spinner/>;
  }

  const cards = data?.map((p:any) =>
    <ImageCard
      key={p.slug}
      image={p.image_url} optimizeImages={optimizeImages}>
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
        <Link href={`podcast/${p.slug}?optimizeImages=${optimizeImages}`}>Show Details</Link>
      </button>
    </ImageCard>);
  return (
    <>
      <Head>
        <title>Next.js PowerPlayer - SWR Podcasts</title>
      </Head>
      <select
        defaultValue={defaultNumRows}
        value={numRows || defaultNumRows}
        onChange={handleResultSizeChange}
      >
        <option value={0}>ALL</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <br/>
      <CardContainer title={`Client-fetched Podcasts using SWR - Image Optimization? ${optimizeImages ? "Yes" : "No"}`}
                     cards={cards} cols={3}/>
    </>
  );
}
