var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _DefaultOps = {
    ContentType: 'application/json',
    UserAgent: 'fetchy/1.0',
    CredentialType: 'include'
};
// =============================================================================
var Fetchy = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function Fetchy(ops_) {
        if (ops_ === void 0) { ops_ = _DefaultOps; }
        var _this = this;
        // -------------------------------------------------------------------------
        this.BuildCallOptions = function (method, data) {
            var res = {
                method: method,
                headers: _this.BuildHeaders(),
                body: data == null ? null : JSON.stringify(data),
                credentials: _this.Options.CredentialType
            };
            return res;
        };
        // -------------------------------------------------------------------------
        this.BuildHeaders = function () {
            var res = {};
            if (_this.Options.ContentType) {
                res['Content-Type'] = _this.Options.ContentType;
            }
            if (_this.Options.UserAgent) {
                res['User-Agent'] = _this.Options.UserAgent;
            }
            return res;
        };
        this.Options = ops_;
    }
    // -------------------------------------------------------------------------
    Fetchy.prototype["delete"] = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, res;
            return __generator(this, function (_a) {
                ops = {
                    headers: this.BuildHeaders(),
                    credentials: this.Options.CredentialType
                };
                res = _fetchy(url, ops);
                return [2 /*return*/, res];
            });
        });
    };
    // -------------------------------------------------------------------------
    Fetchy.prototype.put = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, res;
            return __generator(this, function (_a) {
                ops = {
                    headers: this.BuildHeaders(),
                    credentials: this.Options.CredentialType
                };
                res = _fetchy(url, ops);
                return [2 /*return*/, res];
            });
        });
    };
    // -------------------------------------------------------------------------
    Fetchy.prototype.get = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, res;
            return __generator(this, function (_a) {
                ops = {
                    headers: this.BuildHeaders(),
                    credentials: this.Options.CredentialType
                };
                res = _fetchy(url, ops);
                return [2 /*return*/, res];
            });
        });
    };
    // -----------------------------------------------------------
    Fetchy.prototype.post = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, p;
            return __generator(this, function (_a) {
                ops = this.BuildCallOptions('POST', data);
                p = _fetchy(url, ops);
                return [2 /*return*/, p];
            });
        });
    };
    // -----------------------------------------------------------
    // TODO: We need a way to return a named file....
    Fetchy.prototype.file = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                p = fetch(url, {
                    method: 'GET',
                    credentials: this.Options.CredentialType
                });
                p.then(function (response) {
                    return response.blob();
                }).then(function (blob) {
                    var file = window.URL.createObjectURL(blob);
                    window.location.assign(file);
                });
                return [2 /*return*/];
            });
        });
    };
    return Fetchy;
}());
export { Fetchy };
// ----------------------------------------------------------------------------------------------------------
function _fetchy(url, ops) {
    if (ops === void 0) { ops = null; }
    return __awaiter(this, void 0, void 0, function () {
        var res, p, success, statusCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = {
                        Success: false,
                        Data: null,
                        Error: null,
                        StatusCode: 0
                    };
                    p = fetch(url, {
                        method: ops.method,
                        body: ops.body,
                        headers: ops.headers,
                        credentials: ops.credentials
                    });
                    success = true;
                    statusCode = 0;
                    return [4 /*yield*/, p.then(function (response) {
                            statusCode = response.status;
                            success = statusCode == 200; // OPTIONS: We could configure to pass/not other status codes.
                            var res = response.json();
                            return res;
                        }).then(function (data) {
                            // NOTE: This will not deserialize the date strings into proper
                            // Date instances for typescript.
                            // We may have to look at our intended property types from <T>
                            // and find ways to convert from there.  Definitiely NOT something that
                            // we want to mess with at this time.
                            res.Data = data;
                            res.Success = success;
                            res.StatusCode = statusCode;
                        })["catch"](function (error) {
                            // Errors happen when there is some kind of network issue.
                            res.Success = false;
                            res.Error = error;
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
