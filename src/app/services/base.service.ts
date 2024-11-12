import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected baseUrl: string = 'http://localhost:3000/api/';

  constructor(protected http: HttpClient) {}
}