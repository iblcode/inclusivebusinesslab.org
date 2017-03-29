#!/bin/bash


penguin run \
  -p ${PORT:-8080} \
  --database-driver [ penguin.js/pg --url "$DATABASE_URL" ] \
  --middleware [ \
    penguin-passwordless \
      --cookie [ --secret foobar ] \
      --failure-redirect /en/login \
      --sent-redirect /en/success \
      --pg-url "$DATABASE_URL" \
      --redis-url "$REDIS_URL" \
      --delivery [ \
        penguin-passwordless-postmark \
          --url https://website-ibl.herokuapp.com \
          --from bs@websites-smart.de \
          --apiKey "$POSTMARK_API_KEY" \
      ] \
  ] \
  --middleware [ \
    penguin-filestack/middleware \
      --api-key "$FILEPICKER_API_KEY" \
      --secret "$FILEPICKER_API_SECRET" \
  ] \
  --publish-driver [ \
    penguin.js/git --url "$GIT_REPO" --branch gh-pages \
  ]
