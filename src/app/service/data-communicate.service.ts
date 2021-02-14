/**
 *  project service, dataCommunicate project.component page
 * author: Luo Teng Zhan
 * time: 2019/11/6
 * use:
 */

import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class DataCommunicateService {
  private data = new EventEmitter();
  constructor() {
  }
  getData() {
    return this.data;
  }
  emitData(value) {
    this.data.emit(value);
  }
}
