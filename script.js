const notes = {
  feedback: {
    category: '01 / Engineering', title: 'The shortest path is a feedback loop.',
    body: `<p>There is a peculiar comfort in a plan. The pieces fit. The arrows point in the right direction. Nothing has had the chance to go wrong yet.</p><p>A working thing is less comfortable. It has awkward edges. It does something you didn’t intend. Someone tries it and immediately asks a question your plan never considered.</p><p>That is where the useful information begins.</p><h3>Make the question smaller.</h3><p>Instead of asking whether the whole idea will work, ask what you can learn by the end of the afternoon. Can a person understand the first screen? Can the simplest version complete one real task? Does the slow part stay slow when you measure it?</p><p>A small experiment gives you something the plan cannot: resistance from the world. It turns a vague possibility into a specific next decision.</p><h3>Shorten the distance.</h3><p>The loop is simple: make something, observe what happens, change it. The challenge is keeping the distance between those steps short enough that you remember why you made the decision in the first place.</p><p>A compiler error is feedback. A confusing interface is feedback. A person using your tool in a way you hadn’t imagined is especially good feedback.</p><p>It helps to write down what you expected before you test. Otherwise, it is remarkably easy to convince yourself that the result was obvious all along.</p><p>The aim is to build something worth using. A short feedback loop helps you find out whether you are getting closer.</p>`
  },
  systems: {
    category: '02 / First principles', title: 'What happens between the boxes?',
    body: `<p>A system diagram makes the world look wonderfully tidy. There is a client, a service, a database. A few arrows. Perhaps a queue if the problem seems sufficiently serious.</p><p>Then a request times out. The client retries. The first request was actually successful. Now there are two payments, or two emails, or two seats that were promised to different people.</p><p>The arrow was hiding quite a lot.</p><h3>Follow one request.</h3><p>Take a single action and follow it all the way through. What information exists at each step? Who owns it? What happens if the process stops just after the write and just before the response?</p><p>These questions often reveal more than adding another component to the diagram. They force you to describe the actual behavior rather than the intended shape.</p><h3>Give the failure a name.</h3><p>“The service might fail” is too vague to design around. “The database commits, but the client never receives the response” gives you something concrete. You can discuss request identifiers, repeated operations, and how to return the same result safely.</p><p>The same habit applies to ordinary code. When does a value become valid? Who can change it? What assumptions survive a retry, a second user, or an unexpected input?</p><p>A good diagram is a useful starting point. The engineering happens when you can explain what crosses the arrows, what can interrupt it, and how the system finds its way back.</p>`
  },
  wonder: {
    category: '03 / Curiosity', title: 'Leave a little room for the unexpected.',
    body: `<p>Some questions arrive with a clear purpose. How do I fix this bug? Why is this query slow? What is the simplest way to make this work?</p><p>Others arrive sideways. Why does a word mean two apparently different things? How did someone decide that a particular shape was beautiful? What did people believe before they had an explanation?</p><p>I like the second kind, too.</p><h3>A question can be enough.</h3><p>You don’t always need to know what a discovery will be useful for before you let yourself explore it. Sometimes the interesting connection appears much later, in a problem that seemed unrelated.</p><p>A story can change the way you explain an idea. A little history can reveal why a technical choice exists. A strange mathematical fact can become the missing step in an algorithm.</p><p>There is a practical limit, of course. An afternoon has only so many hours. But leaving a little space for wandering is different from never choosing a direction.</p><p>Follow the question for a while. Write down what surprised you. Return to the thing you were making.</p><p>You might find that you brought something back.</p>`
  }
};
const reader = document.querySelector('#reader');
let trigger;
function openNote(id, source) {
  const note = notes[id]; if (!note) return;
  trigger = source || document.activeElement;
  document.querySelector('#reader-title').textContent = note.title;
  document.querySelector('#reader-category').textContent = note.category;
  document.querySelector('#reader-body').innerHTML = note.body;
  if (!reader.open) reader.showModal();
  reader.scrollTop = 0;
  document.title = `${note.title} — The Siddharth Gazette`;
}
document.querySelectorAll('[data-note]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); history.pushState(null, '', link.getAttribute('href')); openNote(link.dataset.note, link);
}));
function closeNote() {
  if (reader.open) reader.close();
  if (location.hash.startsWith('#note-')) history.replaceState(null, '', location.pathname + location.search + '#notes');
  document.title = 'The Siddharth Gazette';
  if (trigger) trigger.focus({preventScroll:true});
}
document.querySelector('#close-reader').addEventListener('click', closeNote);
document.querySelector('#reader-done').addEventListener('click', closeNote);
reader.addEventListener('cancel', event => {event.preventDefault(); closeNote();});
function syncNote() { const id = location.hash.replace('#note-', ''); if (notes[id]) openNote(id); else if (reader.open) closeNote(); }
window.addEventListener('popstate', syncNote); syncNote();
const motion = document.querySelector('#motion');
let still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion() { document.body.classList.toggle('still', still); motion.setAttribute('aria-pressed', String(still)); motion.textContent = still ? 'Moving edition' : 'Still edition'; }
motion.addEventListener('click', () => {still = !still; setMotion();}); setMotion();
const theme = document.querySelector('#theme');
theme.addEventListener('click', () => {const dark = document.body.classList.toggle('dark'); theme.setAttribute('aria-pressed', String(dark)); theme.textContent = dark ? 'Light the lamps' : 'Dim the lamps';});
const owl = document.querySelector('#owl'); let owlTimer;
owl.addEventListener('click', () => {clearTimeout(owlTimer); owl.classList.remove('awake'); void owl.offsetWidth; owl.classList.add('awake'); owl.querySelector('.owl-speech').textContent = 'Oh, hello.'; owlTimer = setTimeout(() => {owl.classList.remove('awake'); owl.querySelector('.owl-speech').textContent = '';}, 2500);});
document.querySelector('#back-top').addEventListener('click', event => {event.preventDefault(); window.scrollTo({top:0, behavior:still ? 'instant' : 'smooth'}); document.querySelector('.wordmark').focus({preventScroll:true});});
