# retroman

This project is intended to serve as a playground for myself fiddling around with [vue.js](https://vuejs.org/). I just don't wanted to make another TODO list app and came up with the idea of making an app which allows distributed teams to perform simple retrospectives. This basic principle is inspired by doodle - everybody is able to create a retrospective and share the link to invite others.

This app should be driven by simplicity by all means - I'll start with the simplest approach adding more sophisticated stuff as required. Furthermore, the focus here is more on the functionality than on the style. The latter should be as simple as possible, yet not hurting usability.

Findings so far:
- Consider dedicated state management like vuex. Even in this very early stage the direct approach begins to look awkward. The bus component isn't much of a help here either.
- More tests both for the client and the server part. How about a simple end-to-end test?
