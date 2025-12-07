

Tools Used:** Which AI assistants did you use? (Claude, ChatGPT, Copilot, etc.)
- I used Chat GPT 4





Learning Moments:** 3-5 key things AI taught you
- AI taught me how to create border shapes for photos
- I learned how to make interactive pie charts, this expanded on my knowledge of localStorage
- AI also taught me how to create more than one theme mode, expanding on my CSS skill from project 3




Challenges:** What didn't work? When did AI mislead you?
- AI reccomeneded API comments, which based on my test run I thought worked, but upon a later test run the API was not backing up in server, making it seem like the post button wasn't working. I then reverted the KPI back to localstorage. I did this change after I wrote the rest of thus collaboartion. 





Process Evolution:** How did your prompting improve over the project?
- As mentioned above, I learned how to be specfifc, sometimes even overly specific if need be, so AI would understand my request. It is important to remeber that Artificle Intellegence is really just matching up words, so even if it doesn't full undertsand what your asking of it, it will still give you an answer or suggest code. It needs to constantly be checked by human oversight and regulated through good clear communication. In the beggining of the project I found myself saying "Do this", but as the project went on I narrowed my requests by highlighting specific files and lines of code. 







Sample Conversations: Include 3-5 significant AI conversations (paste prompts + responses)

At least one debugging session
I didn't have any issues with my website, but I asked AI if there were was anything to debug. this was it's response: 
One area to debug is the comment system’s localStorage usage. If multiple users use the site on different devices, their comments won’t sync—comments are only saved locally. You could debug and improve this by adding server-side storage or checking for issues with comment persistence after page reloads.

Another area to check is the voting and pie chart system. If users vote multiple times, the chart updates, but there’s no limit or user tracking. Debugging could involve preventing duplicate votes or adding user feedback for voting errors

Let me know if you want to focus on a specific feature or see a list of possible bugs to investigate!

my reply: Yes I would like to try adding side by side server storage to the comment sections.

what AI taught me to do: Great idea! To add server-side storage for comments, you’ll need a backend (like Node.js/Express, Python/Flask, etc.) and update your frontend to send and fetch comments via HTTP requests.

Here’s a plan:

Set up a simple backend API for comments (e.g., using Express and a JSON file or database).
Update your frontend JS to POST new comments and GET all comments from the server.
Optionally, keep localStorage as a fallback for offline use.

My thought process: Based on this I decided to take my code one step further and use Node.js to make my comments avaliable on multiple servers. 








At least one "teach me a concept" conversation
my question: can you explain to me how node.js and express work in my browser
AI reply: Node.js and Express do not run directly in your browser—they run on your computer (or a server) as a backend. Here’s how they work with your browser:

Node.js is a runtime that lets you run JavaScript code outside the browser, usually on a server or your local machine.
Express is a Node.js framework for building web servers and APIs. It listens for HTTP requests (like GET, POST, PUT, DELETE) and sends back responses.
How it works with your site:

Your browser (the frontend) sends HTTP requests (using fetch or AJAX) to the Express server (the backend).
The Express server receives these requests, processes them (e.g., saves or retrieves comments), and sends back data (usually JSON).
Your frontend JavaScript updates the page with the data from the server.
So, Node.js/Express handle the data and logic, while your browser displays the site and interacts with the server via HTTP requests.








At least one code review or refactoring session

My prompt: can you review my index.html code to see if there is anything I can clean up code wise besides my holiday pie chart.

AI Reply: 
Your index.html is well-structured and readable! Here are a few suggestions for code cleanup and best practices (excluding the holiday pie chart):

Semantic HTML:
Move the <p>Click your favorite character to see a surprise!</p> outside the <h2> for better semantics.
Consistent Indentation:
Ensure consistent indentation (2 or 4 spaces) throughout for readability.
Alt Text:
Your image alt attributes are good—just double-check for typos in filenames (e.g., "michealscott.png" should be "michaelscott.png" if that's the correct spelling).
Sectioning:
All main content is inside <main>, which is great.
Closing Tags:
All tags are properly closed.
Script Placement:
Scripts are at the end, which is best for performance.
Accessibility:
Consider adding aria-labels or roles to interactive elements for improved accessibility.
Unused Classes/IDs:
Remove any unused classes or IDs if you add/remove features in the future.
Overall, your code is clean and organized! If you want, I can auto-format the file for indentation and minor semantic improvements. Let me know if you’d like that or want to focus on a specific area!





How you modified AI-generated code to fit your needs
Ai provided the "meet the charcters section" idea but I was the one who had the idea of using each chaarcter as a theme button! 

In my favorite-character.js file, I built out a characterColors object that connects each character (Michael, Jim, Dwight, etc.) to their own color. When someone clicks a character card, my code grabs the character’s name from the data-character attribute and updates the header color to match. It also highlights the backgound with a lower opcity of chosen character's color. 

I also added a fun touch that wasn’t in the original AI version: a quote pop-up. So when you pick your favorite character, the site gives you a little personality moment from them. Overall, the AI gave me the foundation, but I reworked it to make the themes feel more interactive, personal, and tied to The Office instead of just being random colors.





Concepts you researched after AI introduced them
In my comments.js file, I now have functions like fetchComments, postComment, updateComment, and deleteComment — all of which talk to http://localhost:3001/api/comments. To make that possible, I researched how Node.js and Express handle routes, JSON data, and different request types. 

I also learned why the frontend needs to send things like Content-Type: application/json, and why each comment needs a unique id so the server knows exactly which one I’m trying to update. Understanding Node helped me see how the frontend and backend actually “talk” to each other: my JavaScript controls what the user sees, and Node.js handles storing and updating data behind the scenes.






Code you wrote entirely yourself vs. AI-assisted code

INDEX
what I wrote myself: Header, meet the charcters, iconic episodes, quotes, footer
AI assisited: pie chart, and comment container 

CSS
What I wrote myself/* Comment dropdown. inspired by Project 2 */, /* Comment Section Styles */

Ai assisited: /* Highlight favorite character card */, Christmas Party section */

JavaScript
chirtsmas vote:
What I wrote myself: const episodes, const colors
Ai Assisted: function draw pie chart and event listener

comments: 
What I wrote myself: All, at first
AI Assisted: making comments live on multiple browsers using node. 

favorite chartcter: 
What I wrote: The quotes and color styling
AI Assisted: popup elements

server.js 
AI assisted: ALL


