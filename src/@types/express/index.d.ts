// use declaration merging so TS can expect
// a userID that gets attached to req object
declare namespace Express {
  export interface Request {
    userID?: string;
  }
}
