Start with docker:

```
docker compose up -d
```

Setup within caddy like so:

```
geo.example.com {
  reverse_proxy http://localhost:3000
}   
```

or, without a domain or HTTPS, like so:

```
:80 {
  reverse_proxy http://localhost:3000
}
```

Keep it updated with:

```
git pull origin master && docker compose pull && docker compose build && docker compose up -d
```
