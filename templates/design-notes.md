# Design Notes

## Pattern

This is a cinematic canvas narrative:

- A large HTML5 canvas handles the animated globe, stars, route, plane, and ambient timeline ribbon.
- HTML handles the readable story, controls, and timeline labels.
- The page is designed for presentation mode and works without external dependencies.

## Inspiration

- Canvas timelines: smooth playback and sequenced milestones.
- Travel route animations: great-circle arcs and moving aircraft.
- Executive keynote visuals: low text density, high contrast, restrained motion.

## Good Practices

- Keep the story data in one editable array.
- Use canvas for visuals and HTML for text.
- Avoid fast motion during live speaking.
- Keep controls visible but quiet.
- Use real location coordinates for the flight path.
