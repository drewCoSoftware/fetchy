
// NOTE: This thingy could be used for any of our loading components....
export interface IStatusData {
  HasError: boolean,
  IsLoading: boolean,
  Message: string
}

export interface FetchyCallOptions {
  method?: string | undefined,
  body?: any,
  headers?: {}
  credentials: RequestCredentials
}

export interface IApiResponse {
  Code: number;
  Message: string;
}

// This wraps an IApiResponse with a bit of extra data that summarizes success conditions,
// as well as any errors that may have been encountered while processing the request.
// NOTE: 'Error' data member does not pertain to things like 404, 500, etc. status codes.
export interface FetchyResponse<T extends IApiResponse> {
  Data: T | null;
  Success: boolean;
  Error: any | null;
  StatusCode: number;

  // TODO: We can care about headers, etc. later??
}

// =============================================================================
interface FetchyOptions {
  ContentType?: string,
  UserAgent?: string,
  CredentialType?: RequestCredentials
}

const _DefaultOps: FetchyOptions = {
  ContentType: 'application/json',
  UserAgent: 'fetchy/1.0',
  CredentialType: 'include'
}

// =============================================================================
export class Fetchy {

  private Options: FetchyOptions;

  // -------------------------------------------------------------------------
  constructor(ops_: FetchyOptions = _DefaultOps) {
    this.Options = ops_;
  }

  // -------------------------------------------------------------------------
  async delete(url: string) {
    const ops: FetchyCallOptions = {
      headers: this.BuildHeaders(),
      credentials: this.Options.CredentialType
    };

    const res = _fetchy(url, ops);
    return res;
  }

    // -------------------------------------------------------------------------
    async put(url: string) {
      const ops: FetchyCallOptions = {
        headers: this.BuildHeaders(),
        credentials: this.Options.CredentialType
      };
  
      const res = _fetchy(url, ops);
      return res;
    }
  
  // -------------------------------------------------------------------------
  async get<T extends IApiResponse>(url: string) {
    const ops: FetchyCallOptions = {
      headers: this.BuildHeaders(),
      credentials: this.Options.CredentialType
    };

    const res = _fetchy(url, ops);
    return res;
  }

  // -----------------------------------------------------------
  async post(url: string, data?: any) {
    const ops = this.BuildCallOptions('POST', data);
    let p = _fetchy(url, ops);
    return p;
  }

  // -----------------------------------------------------------
  // TODO: We need a way to return a named file....
  async file(url: string) {

    let p = fetch(url, {
      method: 'GET',
      credentials: this.Options.CredentialType
    });
    p.then((response) => {
      return response.blob();
    }).then((blob) => {
      var file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });

  }


  // -------------------------------------------------------------------------
  private BuildCallOptions = (method: string, data?: any) => {

    let res: FetchyCallOptions = {
      method: method,
      headers: this.BuildHeaders(),
      body: data == null ? null : JSON.stringify(data),
      credentials: this.Options.CredentialType
    }

    return res;
  }

  // -------------------------------------------------------------------------
  private BuildHeaders = () => {
    let res = {};
    if (this.Options.ContentType) {
      res['Content-Type'] = this.Options.ContentType;
    }
    if (this.Options.UserAgent) {
      res['User-Agent'] = this.Options.UserAgent;
    }

    return res;
  }
}

// ----------------------------------------------------------------------------------------------------------
async function _fetchy<T extends IApiResponse>(url: string, ops: FetchyCallOptions | null = null): Promise<FetchyResponse<T>> {

  let res: FetchyResponse<T> = {
    Success: false,
    Data: null,
    Error: null,
    StatusCode: 0
  }

  let p = fetch(url, {
    method: ops.method,
    body: ops.body,
    headers: ops.headers,
    credentials: ops.credentials
  })

  let success = true;
  let statusCode = 0;
  await p.then(response => {
    statusCode = response.status;
    success = statusCode == 200;   // OPTIONS: We could configure to pass/not other status codes.
    const res = response.json();
    return res;
  }).then(data => {

    // NOTE: This will not deserialize the date strings into proper
    // Date instances for typescript.
    // We may have to look at our intended property types from <T>
    // and find ways to convert from there.  Definitiely NOT something that
    // we want to mess with at this time.
    res.Data = <T>data;
    res.Success = success;
    res.StatusCode = statusCode;

  }).catch((error) => {

    // Errors happen when there is some kind of network issue.
    res.Success = false;
    res.Error = error
  });

  return res;
}

