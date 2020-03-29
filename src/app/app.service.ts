import {EventEmitter, Injectable} from '@angular/core';
import {WordListResponse} from "./extlib/originstamp-client-js/originstamp_client_js/model/wordlist.response";

@Injectable()
export class Cov2WordsService {
    wordList: EventEmitter<WordListResponse>;

    constructor() {
        this.wordList = new EventEmitter<WordListResponse>();
    }

    public setWordList(res: WordListResponse) {
        this.wordList.emit(res);
    }
}
