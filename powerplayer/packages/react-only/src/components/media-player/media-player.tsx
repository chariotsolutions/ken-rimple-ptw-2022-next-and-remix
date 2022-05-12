import React from 'react';
import styles from './media-player.module.css';

export default function MediaPlayer(props: any) {
  const {url} = props;
  return (
    <div className={styles.mediaPlayer}>

      <audio className={styles.mediaPlayer}
        controls
        preload="none"
        src={url}>
         Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  );
}
