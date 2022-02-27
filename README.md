# RebeccaBot
A Discord bot to help the running of a Book Club.

## Features
- [x] Accepts users' suggestions; 1/user/month; new suggestions overwrite old ones. `!suggestion <book title> by <author>`
    - [ ] Replies with a blurb of the book
- [ ] Returns a numbered list of all the suggestions made. `!list`
- [ ] Keeps track of the deadline to finish this month's book. `!deadline`
    - [ ] Deadline can be updated. `!deadline <date> [DD/MM/YY]`
- [ ] Replies with a synopsis of the passed book. `!synopsis <!list number> || <book title> by <author>`
- [ ] Returns a new book of the month. `!shuffle`
- [ ] Alerts user if their new suggestion has already been read.
- [ ] Returns a list of all books read in the past. `!history`
- [ ] Replies with links to buy the current book of the month. `!buy`

### Future feature ideas
- [ ] Can be set to send a book quote in a thread (daily, weekly...)
