Start with docker:

```
docker compose up -d
```

Setup within caddy like so:

geo.example.com {
  import hub.caddy
}   

or, without a domain or HTTPS, like so:

:80 {
  import hub.caddy
}

Keep it updated with:

```
git pull origin master && docker compose pull && docker compose build && docker compose up -d
```