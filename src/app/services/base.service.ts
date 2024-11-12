import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected baseUrl: string = 'http://finanzastf-h0hgfnerg9eca4ba.westus3-01.azurewebsites.net/api/';

  constructor(protected http: HttpClient) {}
}