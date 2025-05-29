# whats a template anyway

//todo make allot more verbose and clear, and get beta readers who dont understand templates

In cooking theres a difference between a techique and a recipe. A `Betty Crocker yellow cake (americain edition)` reads differently from a description of a `stirfry`. Likewise Stepanov ranting about math is different from plain old c. 


https://youtu.be/KbC4jvGPFs0?si=8OdMfCIJAMAnUAKI&t=155 //todo look up video embeding //todo consider making my own cut/upload

//todo summerize with d code translations

Where c is very close to thin layer over a finished program and is therefore like repeating a packaged cake recipe, templates are where Stepanov can put his ideas as a techique.

You dont need to have betty crooker and her yellow number 7, her alumium powder, too hold your hand to stirfry pork and leeks; it will be fine, pinkie promise. Likewise functions like `swap` don't need to be complex things, they just need a little gap where a type can go. You dont need a "class that extends swapable" or some other dynamatic type thoery with strong opinions, you need a hole and a bit of text replacement. Where `T` can be a `int` or `float`, the `meat of your choice` could be `pork` or `beef`.

`template stirfry(alias Meat, Vegibles...)` and `stirfry!(pork,leek)`; you replace specail tokens to generate your recipe on the fly. Which is fine because `pork` and `beef` are culiarily very simuliar, handling the list of vegibles may take some getting used to, to say nothing of how to express "seasoning". But all of that is possible.


//todo consider extending examples for vegetables and seasoning

However take note, `a meat of your choosing` is *wildly* underspecified; `stirfry of crocodile` is technically a phase that has syntactic meaning but ancient china probably did not define the seasoning profile for a Floridian delicacy. You have two choices, either a) Refuse to work for all choices or b) let it play out and let the user beware. Unlike a cookbook, an api can be opinionated and controlling, I think this is a mistake, the goal should be to attempt to compile everything. Let the user have their food. **It will be less work and have more product.**




















