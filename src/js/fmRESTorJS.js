class fmRESTorJS {
    constructor(host, database, layout, user, password, options = null, fmDataSource = null) {
        this.host = host;
        this.database = database;
        this.layout = layout;
        this.user = user;
        this.password = password;
        this.fmDataSource = fmDataSource;
        this._apiToken = null;

        this._token = {
            saveTo: "localStorage",
            expire: 14,
            name: "fm-data-api"
        };

        // SET OPTIONS
        if (options !== null) {
            this.setOptions(options);
        }
    }

    setTokenExpiration(value) {
        this._token.expire = value;
    }

    setTokenName(value) {
        this._token.name = value;
    }

    setTokenSaveTo(value) {
        this._token.saveTo = value;
    }

    setAPIToken(apiToken) {
        this._apiToken = apiToken;
    }

    getAPIToken() {
        return this._apiToken;
    }

    setOptions(options) {
        if ("token" in options) {
            let token = options.token;

            if ("name" in token) {
                this.setTokenName(token.name);
            }

            if ("saveTo" in token) {
                if (["localStorage", "cookie"].includes(token.saveTo)) {
                    this.setTokenSaveTo(token.saveTo);
                }
            }
            if ("expiration" in token) {
                if (Number.isInteger(token.expiration)) {
                    this.setTokenExpiration(token.expiration);
                }
            }
        }
    }

    isLogged() {
        let fmJsonToken = undefined;

        if (this._token.saveTo === "localStorage") {
            fmJsonToken = localStorage.getItem(this._token.name) || undefined;
        } else {
            fmJsonToken = Cookies.get(this._token.name) || undefined;
        }

        if (typeof fmJsonToken !== 'undefined') {
            let fmObjectToken = JSON.parse(fmJsonToken);

            var currentDateTime = new Date();
            var expireTokenDateTime = new Date(fmObjectToken.expire);

            if (currentDateTime >= expireTokenDateTime) {
                return false;
            }
            this.setAPIToken(fmObjectToken.token);
            return true;
        }

        return false;
    }

    extendTokenExpiration() {
        var currentDateTime = new Date();
        currentDateTime.setMinutes(currentDateTime.getMinutes() + this._token.expire);
        let fmJsonToken = {
            expire: currentDateTime,
            token: this.getAPIToken()
        };

        if (this._token.saveTo === "localStorage") {
            localStorage.setItem(this._token.name, JSON.stringify(fmJsonToken));
        } else {
            Cookies.set(this._token.name, JSON.stringify(fmJsonToken));
        }
    }


    /**
     * @param successCallback
     * @param errorCallback
     */
    getProductInformation(successCallback, errorCallback) {

        this._callURL({
                endpoint: '/fmi/data/vLatest/productInfo',
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     *
     * @param successCallback
     * @param errorCallback
     */
    getDatabaseNames(successCallback, errorCallback) {

        this._callURL({
                headers: {
                    'Authorization': 'Basic ' + btoa(this.user + ":" + this.password)
                },
                endpoint: '/fmi/data/vLatest/databases',
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param successCallback
     * @param errorCallback
     */
    getScriptNames(successCallback, errorCallback) {
        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/vLatest/databases/' + this.database + '/scripts/',
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param successCallback
     * @param errorCallback
     */
    getLayoutNames(successCallback, errorCallback) {
        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/vLatest/databases/' + this.database + '/layouts/',
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param successCallback
     * @param errorCallback
     */
    getLayoutMetadata(successCallback, errorCallback) {
        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/vLatest/databases/' + this.database + '/layouts/' + this.layout,
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    createRecord(parameters, successCallback, errorCallback) {

        this._callURL({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records',
                method: 'POST'
            }, parameters
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    deleteRecord(id, parameters = null, successCallback, errorCallback) {

        let param = "";
        if (parameters !== null) {
            param = this.convertObjectToGetParameters(parameters);
        }

        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id + '?' + param,
                method: 'DELETE'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    duplicateRecord(id, parameters = null, successCallback, errorCallback) {

        this._callURL({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id,
                method: 'POST'
            }, parameters
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    editRecord(id, parameters, successCallback, errorCallback) {

        this._callURL({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id,
                method: 'PATCH'
            }, parameters
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    getRecord(id, parameters = null, successCallback, errorCallback) {

        let param = "";
        if (parameters !== null) {
            param = this.convertObjectToGetParameters(parameters);
        }

        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id + '?' + param,
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    getRecords(parameters = null, successCallback, errorCallback) {

        let param = "";
        if (parameters !== null) {
            param = this.convertObjectToGetParameters(parameters);
        }

        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + '?' + param,
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    findRecords(parameters, successCallback, errorCallback) {

        this._callURL({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/_find/',
                method: 'POST'
            }, parameters
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    setGlobalField(parameters, successCallback, errorCallback) {
        this._callURL({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/globals/',
                method: 'PATCH'
            }, parameters
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param id
     * @param containerFieldName
     * @param containerFieldRepetition
     * @param file
     * @param successCallback
     * @param errorCallback
     */
    uploadFileToContainter(id, containerFieldName, containerFieldRepetition, file, successCallback, errorCallback) {

        // PREPARE FORM DATA
        let data  = new FormData();
        data.append("upload", file);

        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + "/records/" + id + "/containers/" + containerFieldName + "/" + containerFieldRepetition,
                method: 'POST'
            }, data, true
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    /**
     * @param scriptName
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    runScript(scriptName, parameters = null, successCallback, errorCallback) {

        let param = "";
        if (parameters !== null) {
            param = this.convertObjectToGetParameters(parameters);
        }

        this._callURL({
                headers: {
                    'Authorization': 'Bearer ' + this.getAPIToken()
                },
                endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/script/' + scriptName + '?' + param,
                method: 'GET'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {
                this.extendTokenExpiration();

                return successCallback(result);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    };

    login(successCallback, errorCallback) {
        if (this.isLogged()) {
            return successCallback(true);
        }

        let parameters = null;
        if(this.fmDataSource !== null){
            parameters = {
                fmDataSource: this.fmDataSource
            }
        }

        return this._callURL({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(this.user + ":" + this.password)
            },
            endpoint: '/fmi/data/v1/databases/' + this.database + '/sessions/',
            method: 'POST'
        }, parameters).then((response) => {
            let result = this.getResultFromRequestRespnse(response);
            if (!this.isResultError(response)) {
                this.setAPIToken(result.response.token);
                this.extendTokenExpiration();
                return successCallback(true);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    logout(successCallback, errorCallback) {
        if (!this.isLogged()) {
            return successCallback(true);
        }

        this._callURL({
                endpoint: '/fmi/data/v1/databases/' + this.database + '/sessions/' + this.getAPIToken(),
                method: 'DELETE'
            }
        ).then((response) => {
            let result = this.getResultFromRequestRespnse(response);

            if (!this.isResultError(response)) {

                if (this._token.saveTo === "localStorage") {
                    localStorage.removeItem(this._token.name);
                } else {
                    Cookies.remove(this._token.name);
                }

                return successCallback(true);
            } else {
                return errorCallback(result);
            }
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    _callURL(requestSettings, data = null, isFile = false) {
        let fetchRequestOptions = {
            method: requestSettings['method']
        };

        if("headers" in requestSettings){
            fetchRequestOptions.headers = requestSettings["headers"];
        }

        if (data !== null && isFile === false) {
            fetchRequestOptions.body = JSON.stringify(data);
        }
        if (data !== null && isFile === true) {
            fetchRequestOptions.body = data;
        }
        return fetch('https://' + this.host + requestSettings["endpoint"], fetchRequestOptions)
            .then(r => r.json().then(data => ({status: r.status, result: data})))
            .then(obj => {
                return obj
            });
    }

    /**
     * Get JSON from FileMaker request result
     * @param result
     * @returns {null}
     */
    getResultFromRequestRespnse(response) {
        return response.result;
    }

    isResultError(result) {
        if ("status" in result) {
            let errorCodes = [400, 401, 403, 404, 405, 415, 500];


            if (errorCodes.includes(result.status)) {

                //let errorCode =  result.messages[0].code;

                // TODO CAUGHT UNSUPPORTED METHODS
                return true;
            }
        } else {
            return true;
        }
        return false;
    }

    /**
     * Convert object to string - get parameters
     * @param parameters
     * @returns {string}
     */
    convertObjectToGetParameters(parameters) {
        var str = "";
        for (var key in parameters) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(parameters[key]);
        }
        return str;
    }

}
