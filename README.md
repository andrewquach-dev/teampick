# teampick
Tool that makes it easier to decide teams randomly.

**Link to project:** https://ndrwquach.github.io/teampick/

![Screenshot of website](https://i.imgur.com/kU6N3ZF.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

User is first shown the add player option which allows you to add players but has certain checks that pops up an error message such as when empty or if player exists already.

Players that are successfully added will appear in the second card layout labled "Players". In this section, the user is able to select which player(s) should be deleted or have the option of deleting all players.

In the last card layout, the user is able to randomize the players into 2 teams as many times as needed. The logic behind the randomizing function was based on Fisher-Yates (aka Knuth) Shuffle. After randomizing, the user can share the results with the share button.

## Optimizations

I tried to break my app several times and implemented error checks to the add player section. Further testing and debugging is needed for the Players sectiona and Teams section. I can already think of a few ways that it can be broken.

## Lessons Learned:

When initially working on a webapp, sometimes a developer can be tunneled in on the stylistic part of the project. I noticed I was spending large hours trying to find the perfect colors, font and images. After changing everything to black and white, I was able to focus more on the features that I envisioned and also got more work done. 

In addition, there are many randomizing algorithms out there that I'd like to learn and implement in this webapp.