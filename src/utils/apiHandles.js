import axios from 'axios';

const env = process.env;
const API_URL = env.REACT_APP_ENV === 'production' ? env.REACT_APP_API_URL : env.REACT_APP_API_URL2;
const MEDIA_CARDS_URL = `${API_URL}/media-cards`;

// get all media cards
export async function getMediaCards() {
  try {
    const response = await axios.get(`${MEDIA_CARDS_URL}`)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// create a new media card
export async function createMediaCard(card) {
  try {
    const response = await axios.post(`${MEDIA_CARDS_URL}`, card)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// update a media card
export async function updateMediaCard(card) {
  try {
    const response = await axios.put(`${MEDIA_CARDS_URL}/${card.id}`, card)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// delete a media card
export async function deleteMediaCard(id) {
  try {
    const response = await axios.delete(`${MEDIA_CARDS_URL}/${id}`)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}