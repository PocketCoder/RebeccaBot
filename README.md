# RebeccaBot
A Discord bot to help the running of a Book Club.

## Current Features
| Command | Description |
| ------- | ----------- |
| `!suggestion <book title> by <author>` | Accepts users' suggestions; 1/user; new suggestions overwrite old ones. If empty, it returns the user's current suggestion. |
| `!list` | Replies with a list of all the current suggestions made by users. |
| `!history` | Replies with a list of the books chosen in the past, on what date, by which user. |
| `!shuffle` | Selects a new book of the month. Saves that book to the history list. Increases counter of number of times a user's suggestion has been picked. |
| `!deadline` | Returns the deadline to read the month's book. |
| `!deadline <DD/MM/YY(YY)>` | Sets the new deadline. |
| `!synopsis <book title> by <author>` | Replies with an embed with a description of the book and the cover. |
| `!help` | Replies with an embed with a this list of commands. |


### Primary Functionality
- [x] Accepts users' suggestions; 1/user/month; new suggestions overwrite old ones. `!suggestion <book title> by <author>`
    - [x] Alerts user if their new suggestion has already been read.
- [x] Returns a numbered list of all the suggestions made. `!list`
- [x] Replies with the deadline to finish this month's book. `!deadline`
    - [x] Deadline can be updated. `!deadline <date> [DD/MM/YY]`
- [x] Returns a new book of the month. `!shuffle`
- [x] Returns a list of all books read in the past. `!history`

#### Future feature ideas
- [x] Reply with other books by the same author. `!also <author name>`
- [ ] Reply with author info. `!author <author name>`
- [ ] Shortended commands (`!suggestion => !sg`, `!synopsis => !sp`)
- [ ] Slash commands
- [ ] Add `!help <command>` for help with a specific command.
- [ ] Replies with links to buy the current book of the month, or the passed book. `!buy`
- [x] Replies with a synopsis of the passed book. `!synopsis <book title> by <author>`
    - [ ] Add double-checking that it's the right book (title and author match input).
- [ ] Can be set to send a book quote in a thread (daily, weekly...)
- [ ] Games to play: `!game`
    - [ ] Ad-libs... (other word related ones, I'm open to ideas.)
    - [ ] Guess the book, line by line the synopsis is revealed. Points for the earlier you get it.
- [ ] Add anticipation to the shuffling. A count down or something.
- [ ] Add an ability to add everyone's birthdays, sends a message on someone's birthday.
- [ ] ? New suggestions are replied to with a blurb of the book
- [ ] Allow for users to have two suggestions in the pile.
    - [ ] Let the number of suggestions per user be a setting set by the mod. `!set suggestions <number>`
- [ ] Bot settings for certain messages to be sent in certain channels. (e.g. book of the month reply to be sent in a specific channel)
    - [ ] `!set shuffle-reply channelId`
- [x] Mod-only commands
- [x] Regex `!deadline` command (DD/MM/(YY)YY format).
- [x] Regex `!suggestion` command (text " by " text).

## General To Do
- [ ] Create an error handler function.
    - Sends error to the mod. Records error in a database.
- [ ] Move to a SQL database (cba rn, I've started with mongoDB so I'll finish)
- [ ] Arrays of options of replies to each command.
- [ ] Special reply for if history/suggestions collections is empty.
- [x] ASAP: Move to UserIds and not usernames.
- [x] On `!suggestion` command, check against the history to see that it hasn't been chosen before.
- [x] Tidy up index.js; individual files for each command.
- [x] If `!suggestion` is empty, return the user's current suggestion.