import TwitterStrategy from 'passport-twitter';

export default function strategy(User) {
  return new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:8000/callback/twitter",
    },
    function(token, tokenSecret, profile, cb) {
      User.findOne({handle: profile.username}, (err, model) => {
        if (err) {
          return cb(err);
        } else if (model) {
          return cb(null, model);
        } else {
          return new User({
            token, tokenSecret,
            handle: profile.username,
            picture: profile.photos[0].value,
            spreadsheet: null,
            color: profile._json.profile_background_color,
          }).save(cb.bind(null, null));
        }
      });
    }
  );
}
