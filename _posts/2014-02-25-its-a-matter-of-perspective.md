---
layout: post
title: It's a matter of perspective
tags: unity protagonist gameplay
---

## It's a matter of perspective
After stumbling around in the confusing maze that is Unity in my spare time (which House of Cards and True Detective have laid much claim on recently) I decided that it was time to quit stalling on the sidelines, and start getting my hands dirty.

So after much ado I finally made my first shaky clicks inside the editor, and much to my amazement (and relief) nothing blew up. 

Surely and (very) slowly I made incremental progress on the basic aspects of creating a new project, and importing/creating assets which I wanted to use. In fact, everything was going so smoothly that I was sort of relieved when I ran into my first brick wall.

![Wall](/assets/images/posts/brick_wall.jpg)
<span class="image-text">In case you didn't get the reference.</span>

The particular wall in question was constructed around the question of *perspective*, and I don't mean that in a high-brow artistic kind of way, but purely technical - how would I go about creating an *isometric* game, rather than 2D or regular 3d, which Unity has plenty of tutorials for.

Luckily Google had my back and after browsing various stackexchanges I finally found the answer. A few basic tweaks of the *main camera* did the trick, and this is what I did:

![Camera](/assets/images/posts/camera_tilt.png)

By turning the camera 30&deg; relative to the x-axis and 45&deg; relative to the y-axis, I (much to my surprise) managed to create an isometric view. Of course, this was only the first of many problems to come (for instance, how would I go about creating movement in this isometric space?), but I'll save those for later.

I'll instead leave you with this amazing teaser for my project - I present to you, the very first iteration of **Tim, Walking Around on a Square** (working title)! Pay specific note to his incredibly fluid walking animation.

<video src="/assets/videos/gameplay.mov"/>

<section class="controls">
    <button class="play"><i class="fa fa-play fa-2x">&nbsp;</i></button>
</section>

<span class="image-text">The video (courtesy of QuickTime) is a **.mov** file, which means you might need <a href="http://google.com/chrome">chrome</a> in order to view it.</span>
