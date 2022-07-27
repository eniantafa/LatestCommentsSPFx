export class ListItemNews {

    public comment: {
         title: string;
         commentText:string;
         dateSubmitted:Date;
         screenName:string;
         ratings:Array<Ratings>
    };


}
export class Ratings {
     public rating:number;
   };