import {RequestModel} from '../rest/request.model';
import {WordRequest} from "./word.request";

export class WordPairResponse extends RequestModel {
    constructor(public language: string,
                public answer: string,
                public words: Array<WordRequest>) {
        super()
    }
}
