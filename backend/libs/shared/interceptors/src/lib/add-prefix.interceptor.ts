import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

const addPrefixToField = (obj: any, fieldName: string, prefix: string): any => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (key === fieldName && typeof obj[key] === 'string') {
        obj[key] = `${prefix}/${obj[key]}`;
      } else if (typeof obj[key] === 'object') {
        addPrefixToField(obj[key], fieldName, prefix);
      }
    }
  }
  return obj;
};

@Injectable()
export class AddPrefixInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.dir(this.configService);
    const host = this.configService.get<string>('application.host');
    const port = this.configService.get<number>('application.port');
    const serveRoot = this.configService.get<number>('application.fileUploader.serveRoot');
    const prefix = `http://${host}:${port}${serveRoot}`;
    return next.handle().pipe(
      map((data) => addPrefixToField(data, 'avatar', prefix)),
    );
  }
}
