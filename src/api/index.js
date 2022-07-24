import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const getPlacesData = async ({ sw, ne }) => {
  try {
    return null;

    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': 'c1e913e40cmshb43bbd6ec50979ap1b0706jsn42868e8c7a83',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (e) {
    console.error(`getPlacesData error: `, e);
  }
}

export {
  getPlacesData
};