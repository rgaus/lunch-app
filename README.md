# Get Lunch api

`GET /:handle/fields` - get the choices that can be used for the given lunch menu
`POST /:handle/pick` - get a choice, given a json object in the body of contraints. '\*' is a wildcard,
and means anything goes.
`POST /:handle/settings` - change the settings for the given handle. Must be authenticated. Body:

```json
{
  "spreadsheet": "spreadsheet id",
  "color": "color in hex without a hash",
  "picture": "profile picture url"
}
```
