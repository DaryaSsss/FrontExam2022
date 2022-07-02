import axios from 'axios';
import { configure, makeAutoObservable } from 'mobx';

configure({
  enforceActions: 'never',
});

export interface ICommentModel {
  id: number;
  username: string;
  user_id: string;
  text: string;
  date: string;
  place: string;
}

class CommentsStore {
  commentsList: ICommentModel[] = [];
  comment: ICommentModel = this.resetCommentData();

  resetCommentData() {
    return {
      id: Math.max(0, Math.max(...this.commentsList.map(({ id }) => id))) + 1,
      text: '',
      username: 'Guest',
      date: '',
      user_id: '',
      place: '',
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

  addComment() {
    this.commentsList.push(this.comment);
    this.comment = this.resetCommentData();
  }

  getCommentsFromApi = async (place: number | string) => {
    try {
      const url = `http://127.0.0.1:8000/api/places/${place}/comments/`;
      const commentsFromApi = await axios({
        method: 'get',
        url,
        withCredentials: false,
      });
      this.commentsList = commentsFromApi.data;
    } catch (e) {
        console.log(`error ${e}`);
    }
  };

  addCommentsToApi = async (place: number | string, text: string) => {
    try {
      const url = `http://127.0.0.1:8000/api/places/${place}/create_comment/`;
      const commentsFromApi = await axios({
        method: 'post',
        url,
        withCredentials: false,
        data: {
          place: +place,
          text,
        },
      });
      this.commentsList = commentsFromApi.data;
      this.comment = this.resetCommentData();
    } catch (e) {
        console.log(`error ${e}`);
    }
  };
}

const commentsStore = new CommentsStore();
export default commentsStore;
