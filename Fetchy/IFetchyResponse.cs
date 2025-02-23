namespace drewCo.Fetchy;

// ===================================================================================================
public interface IFetchyResponse
{
  int Code { get; set; }
  string? Message { get; set; }
}

// ===================================================================================================
// TODO: Is there some kind of scriptable way that we can define + export these to javascript?
// Some kind of CLI tool would be rad!
// --> dhll?
public static class ResponseCodes
{
  public const int OK = 0;

  /// <summary>
  /// The data in question does not exist.
  /// </summary>
  public const int DOES_NOT_EXIST = 1;

  /// <summary>
  /// The data already exists.
  /// </summary>
  public const int ALREADY_EXISTS = 2;

  /// <summary>
  /// Data passed to the API did not pass validation.
  /// </summary>
  public const int INVALID_DATA = 3;

  /// <summary>
  /// The current process/request is already in progress.
  /// </summary>
  public const int IN_PROGRESS = 4;

  /// <summary>
  /// User is not authorized to perform the specified action!
  /// </summary>
  public const int NOT_AUTHORIZED = 5;

  /// <summary>
  /// The user is not currently logged in.  This is like that of 'NOT_AUTHORIZED' but helps
  /// applications redirect the user to an appropriate login interface.
  /// </summary>
  public const int NOT_LOGGED_IN = 6;
}

// ===================================================================================================
public class BasicResponse : IFetchyResponse
{
  public static IFetchyResponse OK
  {
    get
    {
      var res = new BasicResponse()
      {
        Code = 0,
        Message = "OK"
      };
      return res;
    }
  }
  public int Code { get; set; } = ResponseCodes.OK;
  public string? Message { get; set; } = null;
}
