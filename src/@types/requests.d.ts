declare namespace ReqBody {
  /*
   * auth requests
   */
  type Auth = {
    email?: string;
    username: string;
    password: string;
  };

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
