import axios from 'axios';
import { configure, makeAutoObservable } from 'mobx';

configure({
  enforceActions: 'never',
});
export interface IPLaceModel {
  id: number;
  name: string,
  free: boolean;
  place_type: string;
  desc: string;
  url: string;
}
export interface IPLaceBookingModel {
  id: number;
  username: string;
  user_id: string;
  paid: boolean;
  date: string;
  place_id: string;
  timeInterval: string[];
  email: string;
}

class PlacesStore {
  placesList: IPLaceModel[] = [];
  place: IPLaceModel = this.resetPlaceData();

  bookingsList: IPLaceBookingModel[] = [];
  booking: IPLaceBookingModel = this.resetBookingData();

  resetPlaceData() {
    return {
      id: Math.max(0, Math.max(...this.placesList.map(({ id }) => id))) + 1,
      name: '',
      place_type: '',
      free: true,
      desc: '',
      url: '',
    };
  }

  resetBookingData() {
    return {
      id: Math.max(0, Math.max(...this.placesList.map(({ id }) => id))) + 1,
      username: '',
      user_id: '',
      paid: false,
      date: '',
      place_id: '',
      timeInterval: ['', ''],
      email: '',
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

  getPlacesFromApi = async () => {
    try {
      const url = 'http://127.0.0.1:8000/api/places/';
      const places = await axios({
        method: 'get',
        url,
        withCredentials: false,
      });
      console.log(places);
      this.placesList = places.data;
      return places.data;
    } catch (e) {
        console.log(`error ${e}`);
        return e;
    }
  };

  getPlaceFromApi = async ({ place } : { place: string | number }) => {
    try {
      const url = `http://127.0.0.1:8000/api/places/${place}/`;
      const placeFromApi = await axios({
        method: 'get',
        url,
        withCredentials: false,
      });
      console.log(placeFromApi);
      this.placesList = placeFromApi.data;
      return placeFromApi.data;
    } catch (e) {
      console.log(`error ${e}`);
        return e;
    }
  };
  // place: number | string, username: string, email: string
  addPlaceBookingToApi = async ({
    place,
    username,
    email,
    _in,
    out,
  }: {
    place: number | string;
    username: string;
    email: string;
    _in: string;
    out: string;
  }) => {
    try {
      const url = `http://127.0.0.1:8000/api/bookings/${place}/create_booking/`;
      const bookingToApi = await axios({
        method: 'post',
        url,
        withCredentials: false,
        data: {
          place: +place,
          username,
          email,
          paid: true,
          _in,
          out,
        },
      });
      this.placesList = bookingToApi.data;
      this.booking = this.resetBookingData();
      this.place = this.resetPlaceData();
    } catch (e) {
        console.log(`error ${e}`);
    }
  };
}

const placesStore = new PlacesStore();
export default placesStore;
