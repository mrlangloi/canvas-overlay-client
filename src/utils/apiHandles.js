import axios from 'axios';

const API_URL = "https://dearbuncanvas.xyz/media-cards";

// get all media cards
export async function getMediaCards() {
  try {
    const response = await axios.get(`${API_URL}`)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// create a new media card
export async function createMediaCard(card) {
  try {
    const response = await axios.post(`${API_URL}`, card)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// update a media card
export async function updateMediaCard(card) {
  try {
    const response = await axios.put(`${API_URL}/${card.id}`, card)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}

// delete a media card
export async function deleteMediaCard(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } 
  catch (error) {
    console.error(error)
  }
}