# BlendedLearning

I use this repository to place all the projects I am currently working on at the University of Amsterdam. These are mainly interactive, web-based files written in HTML and Javascript. This readme provides a list and summary of the different projects, a more extensive discription is found in the subfolders of each project.

## Interactive slideshow with audio explanation

There are several issues with using (short) video-lectures:
1. The user needs to pause the video at his/her own initiative. During lectures, the lecturer would stop and force students to think. When watching a video, it is tempting to just let the video continue. 
2. Making changes to a video is not easy after it has been recorded. 
3. Videos, especially containing detailed text, math or pictures, need to be in a large resolution. These take up a lot of bandwidth.
4. For many, presenting for camera does not come naturally.

For these reasons, I made a simple web-based tool to create slideshows with an audio explanation. Most lectures consist of (mostly) static visuals with an explanation by the lecturer, so this application provides in those two important qualities. But it also improves upon the above mentioned issues:
1. The users needs to manually go through the slides, increasing the chance that the student only continues when he/she is ready. (as a future addition, simple multiple choice question slides could be added)
2. The slides and audio files are saved seperately, so making changes is as easy as updating the relevant slides. The original link stays the same
3. The slides can be made in an arbitrarily large resolution, and since the number of slides is much less than the number of frames in a video, the bandwidth is only used for the audio files (which are simple MP3, so small). If the slides are made in a vector based format (e.g. SVG), the resolution is perfect.
4. The explanantion is audio-only, so the lecturer does not have to present for camera.

Furthermore, the tool is written in HTML and Javascript, so it works on *any* modern device.

You can see an example of the tool here: https://staff.fnwi.uva.nl/h.rutjes/InteractiveSlides/Template/index.html

## Interactive Bloch sphere

Folder: [blochsphere](/blochsphere/)

This interactive applet was made for a first-year course about Quantum Computing. It uses Javascript and the THREEJS library. The applet can be found here: https://staff.fnwi.uva.nl/h.rutjes/applets/blochsphere.htm

## Interactive BB84 Protocol

Folder: [bb84](/bb84/)

This interactive applet was made for a first-year course about Quantum Computing. It uses Javascript and CSS styling. The applet can be found here: https://staff.fnwi.uva.nl/h.rutjes/applets/BB84.html

## Interactive quantum measurement in the Two Point quantum world

Folder: [twopointworld](/twopointworld/)

This interactive applet was made for a first-year course about Quantum Computing. It uses Javascript and the jsxgraph library. The applet can be found here: https://staff.fnwi.uva.nl/h.rutjes/applets/TwoPointWorld.html

## Interactive adding of vector in 3-space

This interactive applet was made as a proof-of-concept. It uses Javascript and the THREEJS library. It shows two vectors and the result of adding them. The two initial vectors can be manipulated by the user. A virtual camera can be used to move through space. You can find the applet here: https://staff.fnwi.uva.nl/h.rutjes/applets/interactiveLA.htm
