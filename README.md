# RebeccaBot
A Discord bot to help the running of a Book Club.

## Current Features
| Command | Description |
| ------- | ----------- |
| `!suggestion <book title> by <author>` | Accepts users' suggestions; 1/user; new suggestions overwrite old ones. |
| `!list` | Replies with a numbered list of all the current suggestions made by users. |
| `!history` | Replies with a list of the books chosen in the past, on what date, by which user. | 


### Features to add
- [x] Accepts users' suggestions; 1/user/month; new suggestions overwrite old ones. `!suggestion <book title> by <author>`
    - [ ] Replies with a blurb of the book
    - [ ] Alerts user if their new suggestion has already been read.
- [x] Returns a numbered list of all the suggestions made. `!list`
- [ ] Replies with the deadline to finish this month's book. `!deadline`
    - [ ] Deadline can be updated. `!deadline <date> [DD/MM/YY]`
- [ ] Replies with a synopsis of the passed book. `!synopsis <!list number> || <book title> by <author>`
- [x] Returns a new book of the month. `!shuffle`
- [x] Returns a list of all books read in the past. `!history`

#### Future feature ideas
- [ ] Replies with links to buy the current book of the month. `!buy`
- [ ] Can be set to send a book quote in a thread (daily, weekly...)
- [ ] Games to play: `!game`
    - [ ] Ad-libs... (other word related ones, I'm open to ideas.)
    - [ ] Guess the book, line by line the synopsis is revealed. Points for the earlier you get it.
- [ ] Allow for users to have two suggestions in the pile.
    - [ ] Let the number of suggestions per user be a setting set by the mod. `!setting suggestions <number>`
- [ ] Move to a SQL database (cba rn, I've started so I'll finish)

## General To Do
- [ ] Tidy up index.js; individual files for each command.
    - From YouTube series by CodeLyon