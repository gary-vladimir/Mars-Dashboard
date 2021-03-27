let store = {
    user: { name: 'Student' },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = async (root, state) => {
    root.innerHTML = App(state);
};

// create content
const App = (state) => {
    return `
    <div class="card"><div class="name">${state.rovers[2]}</div></div>
    <div class="card"><div class="name">${state.rovers[1]}</div></div>
    <div class="card"><div class="name">${state.rovers[0]}</div></div>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
});
