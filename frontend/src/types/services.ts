export type ResponseLogin = {
  status: boolean;
  body: {
    token: string;
    person: any;
  };
};

export type Response = {
  status: boolean;
  body: {
    sucess: boolean;
  };
};

export type ResponseUrl = {
  status: boolean;
  body: Array<Urls>;
};

interface Urls {
  visits: number;
  longURL: string;
  shortURL: string;
  shortUrlId: string;
  userId: string;
  _id: string;
}

export type UrlPost = {
  url: string;
  userId: string;
};
export type returnPostUrl = {
  status: boolean;
  body: {
    msg: string;
    shortUrl: string;
  };
};

export type UrlUser = {
  userId: string;
};

export type User = {
  email: string;
  password: string;
};
export type ReturnRgister = {
  status: boolean;
  body: {
    message: string;
  };
};

export type CheckToken = {
  token: string;
};
