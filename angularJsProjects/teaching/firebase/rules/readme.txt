https://www.firebase.com/docs/security/quickstart.html

Typically, you'll store all of your users in a single users node whose children are the uid values for every user. If you wanted to restrict access to this data such that only the logged-in user can see their own data, your rules would look something like this:

Copy
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid"
      }
    }
  }
}