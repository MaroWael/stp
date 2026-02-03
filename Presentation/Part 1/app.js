const slides = [
    {
        title: "🚀 Session Part 1",
        content: `
<p>
Before deploying models, Docker, or Hugging Face…
we need to answer one question:
</p>
<h2>Why do we even need deployment?</h2>
        `
    },

    {
        title: "🧪 The Notebook Bubble",
        content: `
<p>
Most ML & backend beginners live inside notebooks.
</p>

<pre>
model.fit(...)
model.predict(...)
# Works fine!
</pre>

<p>
But this code lives only on <b>your machine</b>.
</p>
        `
    },

    {
        title: "❌ Why Notebooks Are Not Enough",
        content: `
<ul>
<li>No real users</li>
<li>No HTTP requests</li>
<li>No file uploads</li>
<li>No authentication</li>
<li>No versioning</li>
<li>No production environment</li>
</ul>

<p>
A notebook answers:
<b>“Can I run this?”</b><br>
Deployment answers:
<b>“Can others use this?”</b>
</p>
        `
    },

    {
        title: "🌍 Real World Expectation",
        content: `
<p>
In the real world:
</p>

<ul>
<li>A frontend sends requests</li>
<li>A mobile app uploads files</li>
<li>Another service calls your API</li>
</ul>

<p>
Your code must live behind an <b>API</b>.
</p>
        `
    },

    {
        title: "🔌 What Is Deployment?",
        content: `
<p>
Deployment means:
</p>

<ul>
<li>Your code is running on a server</li>
<li>It listens for requests</li>
<li>Anyone with permission can use it</li>
</ul>

<p>
Deployment = <b>Code → Service</b>
</p>
        `
    },

    /* 🆕 NEW SLIDES START HERE */

    {
        title: "🌐 What Is an API?",
        content: `
<p>
API = <b>Application Programming Interface</b>
</p>

<p>
It is a contract between:
</p>

<ul>
<li>A client (frontend / mobile / another service)</li>
<li>A server (your backend code)</li>
</ul>

<p>
Client sends a request → Server returns a response
</p>
        `
    },

    {
        title: "📨 API in Simple Words",
        content: `
<p>
An API is like a waiter 🍽️
</p>

<ul>
<li>You (client) order food (request)</li>
<li>Kitchen (server) prepares it</li>
<li>Waiter returns the dish (response)</li>
</ul>

<p>
You never enter the kitchen — you use the API.
</p>
        `
    },

    {
        title: "🚚 Ways to Deploy Python Apps",
        content: `
<table border="1" cellpadding="15">
<tr>
<th>Framework</th>
<th>Main Use</th>
</tr>
<tr>
<td>Streamlit</td>
<td>Quick demos & dashboards</td>
</tr>
<tr>
<td>Django</td>
<td>Full web applications</td>
</tr>
<tr>
<td>Flask</td>
<td>Lightweight APIs</td>
</tr>
<tr>
<td>FastAPI</td>
<td>Modern high-performance APIs</td>
</tr>
</table>
        `
    },

    {
        title: "⚖️ Framework Comparison",
        content: `
<table border="1" cellpadding="15">
<tr>
<th>Feature</th>
<th>Streamlit</th>
<th>Flask</th>
<th>Django</th>
<th>FastAPI</th>
</tr>
<tr>
<td>API-focused</td>
<td>❌</td>
<td>⚠️</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>Validation</td>
<td>❌</td>
<td>❌</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>Performance</td>
<td>❌</td>
<td>⚠️</td>
<td>⚠️</td>
<td>🚀</td>
</tr>
<tr>
<td>Auto Docs</td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
</table>
        `
    },

    {
        title: "⚡ Why FastAPI?",
        content: `
<ul>
<li>Built for APIs from day one</li>
<li>Uses Python type hints</li>
<li>Automatic request validation</li>
<li>Auto-generated Swagger docs</li>
<li>Very fast (async support)</li>
</ul>

<p>
FastAPI = <b>Production-ready Python APIs</b>
</p>
        `
    },

    /* 🔁 ORIGINAL CONTENT CONTINUES */

    {
        title: "🛣️ How Do Systems Talk?",
        content: `
<p>
Systems don’t call Python functions.
</p>

<p>
They talk using:
</p>

<ul>
<li>HTTP</li>
<li>JSON</li>
<li>URLs</li>
<li>Status codes</li>
</ul>

<p>
This is where <b>FastAPI</b> comes in.
</p>
        `
    },

    {
        title: "📦 From Function to API",
        content: `
<pre>
def predict(image):
    return result
</pre>

<p>⬇</p>

<pre>
POST /predict
</pre>

<p>
Now your code can be used by:
frontend • mobile • other services
</p>
        `
    },

    {
        title: "🧱 Why Start with CRUD?",
        content: `
<p>
Before deploying ML models,
we must understand:
</p>

<ul>
<li>Requests</li>
<li>Responses</li>
<li>Validation</li>
<li>Error handling</li>
<li>State</li>
</ul>

<p>
CRUD is the simplest real API.
</p>
        `
    },

    {
        title: "🗃️ This Is Our First Deployed App",
        content: `
<p>
Our FastAPI app will:
</p>

<ul>
<li>Create items</li>
<li>Read items</li>
<li>Update items</li>
<li>Delete items</li>
</ul>

<p>
Same concepts used later for ML deployment.
</p>
        `
    },

    {
        title: "🧠 Key Mindset Shift",
        content: `
<p>
You are no longer writing code for yourself.
</p>

<p>
You are writing code for:
</p>

<ul>
<li>Users</li>
<li>Systems</li>
<li>Production</li>
</ul>

<p>
This is why we leave the notebook.
</p>
        `
    },

    {
        title: "➡️ What Comes Next?",
        content: `
<p>
Now that we understand:
</p>

<ul>
<li>Why deployment exists</li>
<li>Why APIs</li>
<li>Why FastAPI</li>
</ul>

<p>
Next:
<b>Building our first real FastAPI app (CRUD)</b>
</p>
        `
    }
];
let index = 0;
const slidesEl = document.getElementById("slides");
const counter = document.getElementById("counter");

function render() {
    slidesEl.innerHTML = slides.map((s, i) => `
        <div class="slide ${i === index ? "active" : ""}">
            <h1>${s.title}</h1>
            ${s.content}
        </div>
    `).join("");

    counter.textContent = `Slide ${index + 1} / ${slides.length}`;
}

function next() {
    if (index < slides.length - 1) index++;
    render();
}

function prev() {
    if (index > 0) index--;
    render();
}

render();
