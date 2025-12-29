# The Ground Rules

1. every blog should be a directory in the naming format `{number}.*` (where `number` can be start with 0s)
2. Pages will be ordered according to the ascending sorting order of the `number` portion of dir name
3. Each directory should contain the following structure
```sh
- a.name-of-the-blog/
    - meta.yml          # contain the metadata
    - main.md           # the blog content
    - - -               # other optional files and dir

```
4. The metadata should maintain the following config structure.
```yml
# example meta.yml file

# required fields
title: <title of the blog>
tag: <tag to classify>
shortDescription: <a short description (1 sentence or so)>
longDescription: <A long description (may be 3 sentences)>
keyWords:
    - some
    - keywords
    - for
    - seo
shareImage: <https link of publically accessible image card for og title>
# optional fields
# last edit overide in YYYY/MM/DD fmt (if not provided will using git commit)
lastEdit: 2001/10/28

```

That's it happy blogging..
