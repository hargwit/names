# Names in a hat [![Netlify Status](https://api.netlify.com/api/v1/badges/8104f18f-08d6-4711-8322-0c9cca733bfc/deploy-status)](https://app.netlify.com/sites/namesinahat/deploys)

Names in a hat game! Play in person or over a video call!

[namesinahat.co.uk](https://namesinahat.co.uk)

## Motiviation

I built this game during my weekends in the first Covid lockdown in the UK so
that I could play the game "Names in a hat" with my friends and family over
video call.

It was an old family favourite game and we had tried playing with bits of paper
but to be really successful all players need to have access to a single hat of
names.

I decided it would be a fun little project to throw together a serverless React
app that uses [Firebase](https://firebase.google.com/) to persist data.

## How it works

The first player creates a new game, this essentially creates a "room" for the
players to join. The first player can then share the game code or a link that
will automatically join the player to the game.

Each player then adds 5 well known names to the hat.

Once everyone has submitted their 5 names, the game starts and players take it
in turns to describe as many names as possible to their team mates in 30s. The
other team can time each turn using the built in 30s timer.

## Technology

### Frontend

The frontend is a `create-react-app` React application. It uses `@reach/router`
for routing and `bootstrap` for styling.

### Backend

The frontend is backed by
[Firebase Firestore](https://firebase.google.com/docs/firestore) a real-time,
NoSQL hosted database solution. The frontend uses hooks that subscribe to
changes made to the firestore collections. This way players see changes to the
game happening in real-time on their screens.

### Hosting

The application is deployed to Netlify and the domain was acquired from google
domains.
