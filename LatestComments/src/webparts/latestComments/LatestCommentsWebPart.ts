import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {   
  Environment,
  EnvironmentType,
} from '@microsoft/sp-core-library';
import * as strings from 'LatestCommentsWebPartStrings';
import LatestComments from './components/LatestComments';
import { ILatestCommentsProps } from './components/ILatestCommentsProps';
import { IListService } from './../services/IListService';
//import { ListMock } from './services/ListMock';
import { ListSharePoint } from './../services/ListSharePoint';
export interface ILatestCommentsWebPartProps {
  description: string;
  slideNumber:string;
  itemNumber:string;
 slideTimer:string;
}

export default class LatestCommentsWebPart extends BaseClientSideWebPart<ILatestCommentsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    var listProvider: IListService;

    //use the mock service if running locally, otherwise use the SharePoint List Service
    if (Environment.type === EnvironmentType.Local) {
     // listProvider = new ListMock();
    }
    else if (Environment.type == EnvironmentType.SharePoint) {
      listProvider = this.context.serviceScope.consume(ListSharePoint.serviceKey);
    }
   
    const element: React.ReactElement<ILatestCommentsProps> = React.createElement(
      LatestComments,
      {
        listService: listProvider,
        description: this.properties.description,
        itemNumber: this.properties.itemNumber,
        slideTimer:this.properties.slideTimer,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        slideNumber:this.properties.slideNumber
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
          
        
            {
              groupName: 'Number of Items',
              groupFields: [
                PropertyPaneTextField('itemNumber', {
                  label: strings.itemNumberFieldLabel
                })
              ]
            },
            {
              groupName: 'Slide Timer',
              groupFields: [
                PropertyPaneTextField('slideTimer', {
                  label: strings.slideTimerFieldLabel
                })
              ]
            }
           
          ]
        }
      ]
    };
  }
}
