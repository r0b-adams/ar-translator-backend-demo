declare namespace ReqBody {
  /*
   * auth requests
   */
  interface Login {
    username: string;
    password: string;
    email?: string;
  }

  interface Register extends Login {
    email: string;
  }

  /*
   * Translate requests
   */
  type Translate = {
    text: string;
    from: string;
    to: string;
  };

  /*
   * Vision requests
   */
  type Vision = {
    img: string;
    to: string;
  };
}

export default ReqBody;
