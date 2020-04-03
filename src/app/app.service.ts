import {EventEmitter, Injectable} from '@angular/core';
import {WordListResponse} from "./extlib/cov2words-client-js/cov2words_client_js/model/wordlist.response";

@Injectable()
export class Cov2WordsService {
    public lastValue: WordListResponse;

    wordList: EventEmitter<WordListResponse>;

    constructor() {
        this.wordList = new EventEmitter<WordListResponse>();
    }

    public setWordList(res: WordListResponse) {
        this.lastValue = res;
        this.wordList.emit(res);
    }
}
