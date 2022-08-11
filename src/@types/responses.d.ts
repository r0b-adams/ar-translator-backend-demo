import { ObjectId } from 'mongoose';
import { google } from '@google-cloud/vision/build/protos/protos';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';
import { UserDoc } from '../db/models/User';

declare namespace ResBody {
  /*
   * helper response types
   */
  type Result = { result: string };
  type Message = { message: string };
  type Error = { error: string } | { errors: string[] };

  /*
   * auth responses
   */
  type Profile = {
    user: UserDoc & { _id: ObjectId };
    token?: string;
  };

  type Auth = Profile | Message | Error;

  /*
   * translate reponses
   */
  type Languages = LanguageResult[] | Message | Error;
  type Translation = Result | Message | Error;

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

  type Vision =
    | AnnotationResponse
    | TranslatedAnnotationResponse
    | Message
    | Error;
}

export default ResBody;
