# IndexNow

This directory contains the static key file required by [IndexNow](https://www.indexnow.org/),
the open submission protocol used by Bing, Yandex, Seznam.cz and several
others to discover updated URLs without waiting for a crawl.

## The key file

```
9e157ec92314db2f0278703fe2b90ffd.txt
```

The file contains the key as plain text. Search engines fetch it at
`https://virtueandpower.com/9e157ec92314db2f0278703fe2b90ffd.txt` to
verify that the key is owned by the site, then accept ping submissions
signed with the same key.

The key value is committed deliberately: rotating it requires updating
both the filename and any callers, and there is no benefit to keeping
it secret (anyone visiting the URL can see it).

## Submitting updated URLs

Send a `POST` request to `https://api.indexnow.org/IndexNow` with the
JSON body:

```json
{
  "host": "virtueandpower.com",
  "key": "9e157ec92314db2f0278703fe2b90ffd",
  "keyLocation": "https://virtueandpower.com/9e157ec92314db2f0278703fe2b90ffd.txt",
  "urlList": [
    "https://virtueandpower.com/essays/virtue-without-power",
    "https://virtueandpower.com/themes/courage"
  ]
}
```

A single URL can be submitted via `GET` to
`https://api.indexnow.org/IndexNow?url=…&key=…`.

We intentionally do not automate this in CI yet. When the editorial
team publishes a new entry, the publishing checklist can include a
one-line `curl` to the URL above. Automation is a roadmap item once
the publish cadence justifies it.
