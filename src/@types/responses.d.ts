import { Types } from 'mongoose';
import { User } from '../db/models';
import { google } from '@google-cloud/vision/build/protos/protos';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';

declare namespace ResBody {
  /*
   * helper response types
   */
  type Result = { result: string };
  type Message = { message: string };
  type Error = { error: string | unknown };

  /*
   * auth responses
   */
  type Profile = {
    user: User & { _id: Types.ObjectId };
    token?: string;
  };

  export type Auth = Profile | Message | Error;

  /*
   * translate reponses
   */
  export type Languages = LanguageResult[] | Message | Error;
  export type Translation = Result | Message | Error;

  /*
   * vision responses
   */
  type LocalizedObjectAnnotation =
    google.cloud.vision.v1.ILocalizedObjectAnnotation;

  type AnnotationResponse = LocalizedObjectAnnotation[];
  type TranslatedAnnotationResponse = (AnnotationResponse & {
    trgLangCode: string;
    translatedName: string;
  })[];

  export type Vision =
    | AnnotationResponse
    | TranslatedAnnotationResponse
    | Message
    | Error;
}

export default ResBody;
