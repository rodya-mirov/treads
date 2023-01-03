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

    [x] Routine Running Flow
        [x]  Routine steps are rendered, not running
        [x]  There is a play/pause button to start/stop the routine
        [x]  Play/pause button starts/pauses the routine (basically just start/stop the interval)

    [ ] Pick Flow
        [ ]  List of available routines is rendered (firebase?)
        [ ]  Pick a routine with click
        [ ]  Routine is rendered, not running (paused)
    
    [ ] Better data summary
        [ ] Time so far
        [ ] Time remaining (total)
    
    [ ] Phone somehow not going to sleep during the routine
    
    Note these two flows are "nice to have" since you can just refresh the page to achieve the purpose

    [x] reset Flow
        [x] Should have a reset button
        [x] Clicking pauses routine & launches a modal "this will start over the routine"
        [x] On confirm, routine goes back to start (paused, no elapsed time)
        [x] On cancel, modal drops, nothing else happens (still paused)
    
    [ ] Re-pick flow
        [ ] Should have a "pick new routine" button/link/etc.
        [ ] Clicking pauses routine & launches a modal "this will clear your progress"
        [ ] On confirm, routine is cleared, go back to routine picker
        [ ] On cancel, modal drops, nothing else happens (still paused)

4.  Hosting

  [x] Webpage should be visible, somewhere
  [x] I really don't want to have a deploy script if i can avoid it
  [x] looks like gh-pages is a good solution here, since it's all just static files