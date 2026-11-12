# Interview Corner: React Fundamentals

### 1. What is the virtual DOM, and what does reconciliation do?
The Virtual DOM is a lightweight JavaScript object representation of the actual browser DOM kept in memory. When a component's state changes, React builds a new Virtual DOM tree. Reconciliation is React's "diffing" process that compares the new Virtual DOM with the previous one. It determines the minimum set of changes needed and updates only those specific nodes in the real DOM, making UI updates fast and efficient.

*(68 words)*

---

### 2. Why do lists need keys, and what goes wrong with the index as a key? What does JSX compile to?
Keys provide stable identities for elements across renders so React can track which items changed, were added, or were removed. Using array indices as keys causes bugs when list items are reordered, inserted, or deleted, because indices shift and React confuses component states. JSX compiles down to plain JavaScript function calls—historically `React.createElement()`, or `jsx()` in modern React—which produce plain JavaScript objects.

*(68 words)*

---

### 3. Why must state be treated as immutable in React?
React relies on shallow reference equality (`Object.is`) to detect state changes. If you mutate state directly (e.g., `apps.push(x)`), the memory reference remains identical, so React assumes nothing changed and skips re-rendering. Producing a new state object or array creates a fresh reference, signaling React to trigger a re-render. Immutability also ensures predictable data flow, prevents side effects, and enables debugging features.

*(64 words)*
