# RebeccaBot
A Discord bot to help the running of a Book Club.

## Current Features
| Command | Description | Response |
| ------- | ----------- | -------- |
| `!suggestion <book title> by <author>` | Accepts users' suggestions; 1/user; new suggestions overwrite old ones. | `What a wonderful choice! Let me just make a note of that.` |
| `!list` | Replies with a numbered list of all the current suggestions made by users. | `Well, from what I can see we have: <book title> by <author>, suggested by <username>` |
| `!history` | Replies with a list of the books chosen in the past, on what date, by which user. | `So far we've read: <book title> by <author> (<MM/YYYY read> | <username>)` |
| `!shuffle` | Selects a new book of the month. Saves that book to the history list. Increases counter of number of times a user's suggestion has been picked. | `This month's book is <username>'s choice: <book title> by <author>!` |


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
- [ ] 

## General To Do
- [ ] On `!suggestion` command, check against the history to see that it hasn't been chosen before.
- [ ] Tidy up index.js; individual files for each command.
    - From YouTube series by CodeLyon
- [ ] Move to UserIds and not usernames.
- [ ] Create an error handler function.
    - Sends error to the mod. Records error in a database.
- [ ] Move to a SQL database (cba rn, I've started so I'll finish)
- [ ] Arrays of options of replies to each command.