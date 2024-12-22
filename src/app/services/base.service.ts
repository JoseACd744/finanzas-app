import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected baseUrl: string = 'https://prod-fullstack-hfckgufbhdccgecd.eastus2-01.azurewebsites.net/api/';

  constructor(protected http: HttpClient) {}
}