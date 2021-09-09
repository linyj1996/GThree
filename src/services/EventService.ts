import { injectable } from "inversify";
import { IEventService, IFlexible } from "../interface";
import { default as mitt, Emitter, Handler } from "mitt";
@injectable()
export class EventService implements IEventService {
  public dispatch:Emitter<any>
  constructor(){
    this.dispatch = mitt()
  }
  public on(event:string,handler:Handler){
    this.dispatch.on(event,handler)
  }
  public off(event:string,handler:Handler){
    this.dispatch.off(event,handler)
  }
  public fire(type:string,params?:IFlexible){
    this.dispatch.emit(type,params)
  }
}