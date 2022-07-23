import {
  ServiceKey,
  ServiceScope,
  Text
} from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';

import { ListItem } from "./ListItem";
import { IListService } from "./IListService";

export class ListSharePoint implements IListService {

  public static readonly serviceKey: ServiceKey<IListService> = ServiceKey.create<IListService>('vrd:IListService', ListSharePoint);
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

      this._pageContext = serviceScope.consume(PageContext.serviceKey);

      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }
  // public getAllC() {

  //   return fetch("https://howling-crypt-47129.herokuapp.com/https://api.nhs.uk/comments/Comments?odsCode=S6Z6X",
  //     {
  //       method: "GET",
  //       headers: {
  //         "subscription-key": "ba6392dcbb7a44b484c20b5bde2e180e"
  //       }
  //     })
  //     .then((res) => res.json())
  //     .then((json) => {

  //       console.log(json);
  //     })
  // }

  public getAll(): Promise<ListItem[]> {
    return fetch("https://howling-crypt-47129.herokuapp.com/https://api.nhs.uk/comments/Comments?odsCode=S6Z6X",
      {
        method: "GET",
        headers: {
          "subscription-key": "ba6392dcbb7a44b484c20b5bde2e180e"
        }
      })
      .then((response) => {
        return response.json()
      });
  }

}
