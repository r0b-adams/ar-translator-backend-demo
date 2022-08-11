export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UniquenessError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class QueryError extends Error {
  constructor(message: string) {
    super(message);
  }
}
