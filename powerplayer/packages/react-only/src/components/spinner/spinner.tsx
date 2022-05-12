import React from 'react';
import { useEffect, useState } from 'react';

/** The silliest component I've written... */
export default function Spinner () {
  const [timerTicks, setTimerTicks] = useState(0);

  useEffect(() => {
    /**
     * do count-up logic
     * n.b. if I use setInterval, I just keep creating intervalic timers that then
     * get cleaned up each time. (I'm watching timerTicks to render the value)
     * So setTimeout means the timer gets cleaned up once it detects the change,
     * which at worst results in no harm, but doesn't yell at me to deal with the
     * dangling timer in a cleanup return - see below.
     */
     const timerHandle = setTimeout(() => {
       setTimerTicks(timerTicks + 1);
     }, 1000);

     // don't forget to nuke the timer on component unload
     return function cleanup() {
      console.log(`Clearing timer interval for ${timerHandle}`);
      clearInterval(timerHandle);
     };
  }, [timerTicks]);

  return (
    <>
      You&apos;ve been waiting {timerTicks} second(s).
    </>
  );
}
