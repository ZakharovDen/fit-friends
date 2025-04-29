import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationServiceURL } from '../app.config';

interface TransformImageOptions {
  fields: string | string[];
}

@Injectable()
export class PathInterceptor implements NestInterceptor {
  constructor(private readonly options: TransformImageOptions) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const fieldsToTransform = Array.isArray(this.options.fields)
      ? this.options.fields
      : [this.options.fields];

    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return data;
        }

        // Check if data is an array
        if (Array.isArray(data)) {
          return data.map((item: any) => transformObject(item, fieldsToTransform));
        }

        // Обработка объекта FitTrainingWithPaginationRdo (или похожего)
        if (data && data.entities && Array.isArray(data.entities)) {
          return {
            ...data,
            entities: data.entities.map((entity: any) => transformObject(entity, fieldsToTransform)),
          };
        }

        // If it's a single training object
        return transformObject(data, fieldsToTransform);
      })
    );
  }
}

// Helper function to transform the object
function transformObject(obj: any, fieldsToTransform: string[]): any {
  let transformedObj = { ...obj };
  fieldsToTransform.forEach((field) => {
    if (field.includes('.')) { // Check for nested field
      const [nestedObj, nestedField] = field.split('.');
      if (transformedObj[nestedObj] && transformedObj[nestedObj][nestedField]) {
        transformedObj[nestedObj] = {
          ...transformedObj[nestedObj],
          [nestedField]: `${ApplicationServiceURL.File}/static${transformedObj[nestedObj][nestedField]}`,
        };
      }
    } else if (transformedObj && transformedObj[field]) {
      transformedObj = {
        ...transformedObj,
        [field]: `${ApplicationServiceURL.File}/static${transformedObj[field]}`,
      };
    }
  });
  return transformedObj;
}