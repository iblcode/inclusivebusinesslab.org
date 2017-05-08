#!/bin/bash

if [[ $NODE_ENV != production ]]; then
  echo 'start: This is intended for production, use `npm run serve` instead'
  exit 1
fi
test -f .env && source .env
penguin run \
        --port "${PORT=3000}" \
        --database-driver [ penguin.js/pg --url "$DATABASE_URL" ] \
        --publish-driver \
        [ penguin.js/git \
            --url "$GIT_REPO" \
            --branch gh-pages ] \
        --middleware \
        [ penguin-passwordless \
            --delivery \
            [ penguin-passwordless-postmark \
                --apiKey "$POSTMARK_API_KEY" \
                --from bs@websites-smart.de \
                --subject 'Penguin says: Login Website' \
                --url "https://penguin.inclusivebusinesslab.org" ] \
            --pg-url "$DATABASE_URL" \
            --redis-url "$REDIS_URL" \
            --cookie [ --secret "$COOKIE_SECRET" ] \
            --failure-redirect '/en/login' \
            --sent-redirect '/en/login?success=1' ] \
        --middleware [ \
          penguin-filestack/middleware \
            --api-key "$FILEPICKER_API_KEY" \
            --secret "$FILEPICKER_API_SECRET" \
        ]

# https://penguin.inclusivebusinesslab.org || http://localhost:3000
