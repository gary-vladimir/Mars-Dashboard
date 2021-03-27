let store = {
    user: { name: 'Student' },
    //Launch Date, Landing Date, Status,
    //Most recently available photos Date ,
    //the most recent photos were taken
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
    if (state.apod) {
        return `
        <div class="card"><div class="name">status: ${
            state.apod.status
        }</div></div>
        <div class="card"><div class="name">LaunchDate: ${
            state.apod.LaunchDate
        }</div></div>
        <div class="card"><div class="name">LandingDate: ${
            state.apod.LandingDate
        }</div></div>
        <div class="card"><div class="name">MostRecentPhotoDate: ${
            state.apod.MostRecentPhotoDate
        }</div></div>
        ${imageTiles(state)}
        `;
    } else {
        return `
        <div class="card" id="spirit"><div class="name">${state.rovers[2]}</div></div>
        <div class="card" id="opportunity"><div class="name">${state.rovers[1]}</div></div>
        <div class="card" id="curiosity"><div class="name">${state.rovers[0]}</div></div>
        `;
    }
};

function imageTiles(state) {
    let html = '';
    const arr = state.apod.photosArray;
    arr.forEach((element) => {
        html += `<div class="card"><img src="${element}"></div>`;
    });
    // return `<div class="card"><img src="${state.apod.photosArray[0]}"></div>`;
    return html;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
    let spiritButton = document.getElementById('spirit');
    let opportunityButton = document.getElementById('opportunity');
    let curiosityButton = document.getElementById('curiosity');
    spiritButton.addEventListener('click', () => getServerData('Spirit'));
    opportunityButton.addEventListener('click', () =>
        getServerData('Opportunity')
    );
    curiosityButton.addEventListener('click', () => getServerData('Curiosity'));
});

async function getServerData(roverName) {
    const response = await fetch(`/get${roverName}Data`);
    const latestEntry = await response.json();
    console.log(latestEntry);
    const LandingDate = latestEntry.latest_photos[0].rover.landing_date;
    const LaunchDate = latestEntry.latest_photos[0].rover.launch_date;
    const status = latestEntry.latest_photos[0].rover.status;
    const MostRecentPhotoDate = latestEntry.latest_photos[0].earth_date;
    const recentPhoto = latestEntry.latest_photos;
    const photosArray = recentPhoto.map(function (obj) {
        return obj.img_src;
    });
    console.log(MostRecentPhotoDate);
    console.log(status);
    console.log(LaunchDate);
    console.log(LandingDate);
    console.log(photosArray[0]);
    updateStore(store, {
        apod: {
            status: status,
            LaunchDate: LaunchDate,
            LandingDate: LandingDate,
            MostRecentPhotoDate: MostRecentPhotoDate,
            photosArray: photosArray,
        },
    });
    console.log(store);
}
