import axios from 'axios';

const getPlacesData = async ({ sw, ne, type }) => {
  try {
    if (!sw || !ne) return [];

    const typeS = type ? `/${type}` : ``;
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com${typeS}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (e) {
    console.error(`getPlacesData error: `, e);
    return [];
  }
}

const getDefaultPlacesData = async () => {
  return await (await fetch(`https://travel-advisor-map.vercel.app/data`)).json();
}

export {
  getPlacesData,
  getDefaultPlacesData
};