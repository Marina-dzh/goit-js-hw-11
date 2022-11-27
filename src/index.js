import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries'

const refs = {
    input: document.querySelector('[id="search-box"]'),
    list: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
    
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
    const name = refs.input.value.trim();
    if (name === '') {
        refs.list.innerHTML = "";
        refs.countryCard.innerHTML = "";
        return;
    };
    fetchCountries(name)
    .then(data => {
        if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        } else if (data.length === 1) {
        createMarkupCard(data);
            return;
        } else
            createMarkupList(data)
    })
        .catch(error => {
 Notiflix.Notify.failure('Oops, there is no country with that name');
    
        })
}


function createMarkupCard(arr) {
    refs.list.innerHTML = ""
    const markupCard = arr.map(({flags, name, capital, population, languages}) => `<div class= 'country-card'><img src="${flags.svg}" alt="" width='200'>
<h1 class="title">${name}</h1>
<div >
    <div class="field">
        <h2 class="label">Capital:</h2>
        <span class="value">${capital}</span>
    </div>
    <div class="field">
        <h2 class="label">Population:</h2>
        <span class="value">${population}</span>
    </div>
    <div class="field">
        <h2 class="label">Languages:</h2>
        <span class="value" >${languages.map(({name}) => `<span>${name}</span>`).join(', ') }</span>
    </div>
</div></div>`).join('')
    refs.countryCard.innerHTML = markupCard

}

function createMarkupList(arr) {
    refs.countryCard.innerHTML = ""
    const markupList = arr.map(item => `<li class="item">
        <img src="${item.flags.svg}" alt="" width='50' >
        <h2 class="title">${item.name}</h2>
    </li> ` ).join('')
    refs.list.innerHTML = markupList
}


