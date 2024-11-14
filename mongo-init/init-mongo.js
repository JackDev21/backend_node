db.createUser({
  user: "JackDev",
  pwd: "123456",
  roles: [
    {
      role: "readWrite",
      db: "users"
    }
  ]
});