# The Ground Rules

1. every blog should be a directory in the naming format `{number}.*`
2. Pages will be ordered in the numerical order of the directory names
3. Each directory should contain the following structure
```sh
- a.name-of-the-blog/
    - meta.json         # contain the metadata 
    - main.md           # the blog content
    - - -               # other optional files and dir

```
4. The metadata should contain `title`, `shortDescription`, `longDescription`, and `keyWords`. 
```json
// example meta.json file
{
    "title": "<title of the blog>",
    "shortDescription": "<a short description (1 sentence or so)>",
    "longDescription": "<A long description (may be 3 sentences)>",
    "keyWords": [
        "some", "keywords", "for", "seo"
    ]
}
```
5. Blog directories contains starts with `1*.` will be considered as pinned bloggs 

That's it happy blogging..
