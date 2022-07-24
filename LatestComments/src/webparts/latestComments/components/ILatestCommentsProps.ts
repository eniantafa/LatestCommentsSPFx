import { IListService } from "../../services/IListService";
export interface ILatestCommentsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listService: IListService;
  slideNumber:string;
  itemNumber:string;
  slideTimer:string;
  webpartName:string;
}
