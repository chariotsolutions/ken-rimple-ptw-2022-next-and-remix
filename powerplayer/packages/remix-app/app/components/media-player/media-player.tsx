export default function MediaPlayer(props: any) {
  const {url} = props;
  return (
      <audio
        controls
        preload="none"
        className="absolute h-32 bottom-0 left-0"
        src={url}>
         Your browser does not support the <code>audio</code> element.
      </audio>
  );
}
