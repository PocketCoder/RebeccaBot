<img src="https://i.imgur.com/BJ51QrD.jpg" width="40" height="131">

# RebeccaBot
A Discord bot to help the running of a Book Club.

## Current Features
| Command | Description |
| ------- | ----------- |
| `!suggestion <book title> by <author>` | Accepts users' suggestions; 1/user; new suggestions overwrite old ones. |
| `!list` | Returns a numbered list of all the current suggestions made by users |


### Features to add
- [x] Accepts users' suggestions; 1/user/month; new suggestions overwrite old ones. `!suggestion <book title> by <author>`
    - [ ] Replies with a blurb of the book
- [x] Returns a numbered list of all the suggestions made. `!list`
- [ ] Keeps track of the deadline to finish this month's book. `!deadline`
    - [ ] Deadline can be updated. `!deadline <date> [DD/MM/YY]`
- [ ] Replies with a synopsis of the passed book. `!synopsis <!list number> || <book title> by <author>`
- [x] Returns a new book of the month. `!shuffle`
- [ ] Alerts user if their new suggestion has already been read.
- [ ] Returns a list of all books read in the past. `!history`
- [ ] Replies with links to buy the current book of the month. `!buy`

#### Future feature ideas
- [ ] Can be set to send a book quote in a thread (daily, weekly...)
- [ ] Games to play: `!game`
    - [ ] Ad-libs... (other word related ones, I'm open to ideas.)
    - [ ] Guess the book, line by line the synopsis is revealed. Points for the earlier you get it.
- [ ] Allow for users to have two suggestions in the pile.
    - [ ] Let the number of suggestions per user be a setting set by the mod. `!setting suggestions <number>`
    - How to decide which gets overwritten if they pass more than allowed?
    - ("Limit reached! Which would you like to replace? (Followed by a numbered list of their suggestions.)" DM from the bot?)