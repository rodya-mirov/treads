Buncha stuff I guess. Could divide into categories:

1. Real Routine Data, not canned sample

    Firebase -- get it up, figure out if it can solve any real problem
    CLI to edit firebase (??? maybe just a UI, idk)
    Fetch routine from firebase and render that

2. Styling

    This all looks like ass, idk, get a user workflow
    Some colors too
    Maybe some font sizes?
    Draw a couple pictures before you write any more code you fuckin donkey, you know this, you do this for a living
  
3. QOL

    Pause / play / restart?
    Routine picker

    Pick Flow
      List of available routines is rendered (firebase?)
      Pick a routine with click
      Routine is rendered, not running
      There is a play/pause button to start/stop the routine

      Play/pause button starts/pauses the routine (basically just start/stop the interval)
    
    Restart Flow
      Should have a restart button
      Clicking pauses routine & launches a modal "this will start over the routine"
      On confirm, routine goes back to start (paused, no elapsed time)
      On cancel, modal drops, nothing else happens (still paused)
    
    Re-pick flow
      Should have a "pick new routine" button/link/etc.
      Clicking pauses routine & launches a modal "this will clear your progress"
      On confirm, routine is cleared, go back to routine picker
      On cancel, modal drops, nothing else happens (still paused)

      jquery frameworks maybe support a modal?
        https://jquerymodal.com/?

4.  Hosting

  Webpage should be visible, somewhere
  I really don't want to have a deploy script if i can avoid it