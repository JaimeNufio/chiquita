### Chiquita!

Discord bot for my server(s).

Discord Bot's Dockerfile exists in `/bot`

Build/Tag/Push with:  
> `yarn build-tag-push`

### To Run:

Be sure to set up environment variables like this:

    volumes:
      - /volume1/Projects/chiquita/config.json:/app/config.json
    environment:
      - CONFIG_FILE=/app/config.json