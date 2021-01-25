Leverage the FileMaker® 17, 18 & 19 Data API with ease!
----

fmRESTor.js is a JavaScript library developed to seamlessly interact with databases and custom apps hosted on a FileMaker Server via the new powerful FileMaker Data API from within a JavaScript code. Forget about learning FileMaker Data API in detail, just create a new object, passing it necessary parameters to connect to the database, and use our easy to understand methods to access or modify your data. fmRESTor.js will take care of authentication, exceptions, and even session preservation in order for your code to be a well-behaving client for the FileMaker Data API without you having to worry about these technical details.

**We have created fmRESTor.js as a second flavor of fmRESTor, firstly created for PHP, to make it easier and faster to interact with FileMaker databases from within custom web apps we did not want to rely on intermediate PHP scripts hosted on a web server.** Being able to easily interact with FileMaker Data API from within JavaScript makes the interaction much faster and suitable for projects like complex user interfaces used within a Web Viewer on a FileMaker layout. 

Keep in mind that credentials to access your database are exposed to the user with this approach, because JavaScript variables can be easily explored by a power user. So make sure to use credentials with highly limited rights, or consider using the PHP version of fmRESTor instead.

We at 24U believe that the whole FileMaker developers community will benefit from the FileMaker Platform not only having new powerful RESTful API, but also developers using the API nicely and efficiently, therefore we decided to make our library available as Open Source, under the GNU LGPLv3 license.

We will greatly appreciate your contributions, although we cannot provide free support for the library. You may, however, hire us to help you with your projects for money by purchasing our services at [https://www.24uSoftware.com/fmRESTor](https://www.24uSoftware.com/fmRESTor#buy) or by utilizing our custom development services, available at [https://www.24uSoftware.com/custom-apps](https://www.24uSoftware.com/custom-apps).


Features
-

* One object class conveniently handles everything
* Automatically generates authentication token
* Re-uses existing token to avoid unnecessary additional connections
* Automatically re-generates expired token
* Handles exceptions and provides meaningful error results

Requirements
-

* Modern Web Browser
* FileMaker Server 17, 18 or 19



Usage ( with npm )
-
~~~
npm install fmrestor
~~~


Usage ( without npm )
-


Include downloaded library file to your project and create new class instance. 

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Project ( Basic )</title>
</head>
<body>

<script src="lib/fmRESTorJS.js"></script>
<script>
let fm = new fmRESTorJS(host, name, layout, user, password, options, fmExternalSource);

<!-- YOUR METHOD HERE (examples in DEMO) -->

</script>
</body>
</html>
~~~

 


### _Instance parameters_:


 Parameter  | Type  | Mandatory  |Description
------------- | ------------- | ------------- | -------------
host  | string  | yes | Hostname or IP address where FileMaker database is hosted
name  | string  | yes | FileMaker database name
layout  | string  | yes | Database layout name to work on
user | string  | yes | User login to database
password | string  | yes | User password to database
options  | array  | optional | Additional library configuration
fmExternalSource | array  | optional | Providing additional data sources, i.ec. if you use a separation model and the current layout needs to access data from external data sources.

### _Options parameters:_

Name | Type | Mandatory | Default value | Description
------------- | ------------- | ------------- | ------------- | -------------
token.name | string | optional | "fm-api-token" | Custom localStorage/Cookie name
token.expiration | number | optional | 14 | Expiration time in minutes. fmRESTor automatically handles database login and saves token with its expiration time (into $_SESSION var) during first request. If expired, fmRESTor automatically reconnects to database on next request.
token.saveTo | string | optional | "localStorage" | Place where is store FileMaker token. Options "Cookie" / "localStorage"
### _Example:_

~~~js
let options = {
    token: {
        name: "test-api2",
        saveTo: "cookie",
        expiration: 14
    }
};

let fmExternalSource = [
    {
        database: "fmRESTorEXTERNAL",
        username: "external",
        password: "external123456"
    }
];

let fm = new fmRESTorJS("127.0.0.1", "fmRESTor", "php_user", "api", "api123456", options, fmExternalSource);
~~~

Methods
-

### _logout_

**Supported FileMaker Server version:** 17, 18, 19

Close current session in the FileMaker database.

~~~js
/**
 * @param successCallback
 * @param errorCallback
 * @returns {*}
 */
logout(successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
fm.logout((requestSuccess) => {
    // logout - SUCCESS
}, (requestError) => {
    // logout - ERROR
});
~~~

</details>

___

### _getProductInformation:_

**Supported FileMaker Server version:** 18, 19

Returns useful information about the FileMaker Server you're connecting to, such as version or data & time formats.

~~~js
/**
 * @param successCallback
 * @param errorCallback
 */
getProductInformation(successCallback, errorCallback)
~~~


<details><summary>Usage</summary>

~~~js
fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getProductInformation((requestSuccess) => {
		// getProductInformation - SUCCESS
	}, (requestError) => {
		// getProductInformation - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "productInfo": {
      "name": "FileMaker Data API Engine",
      "buildDate": "07/05/2019",
      "version": "18.0.2.217",
      "dateFormat": "MM/dd/yyyy",
      "timeFormat": "HH:mm:ss",
      "timeStampFormat": "MM/dd/yyyy HH:mm:ss"
    }
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

[FileMaker 18 Data API Guide - Get Product Information
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#get-metadata_get-product-info) 
___

### _getDatabaseNames:_

**Supported FileMaker Server version:** 18, 19

Returns array of names of all databases hosted and enabled for access via FileMaker Data API.

~~~js
/**
 * 
 * @param successCallback
 * @param errorCallback
 */
getDatabaseNames(successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getDatabaseNames((requestSuccess) => {
		// getDatabaseNames - SUCCESS
	}, (requestError) => {
		// getDatabaseNames - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "databases": [
      {
        "name": "fmRESTor"
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

[FileMaker 18 Data API Guide - Get Database Names
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#get-metadata_get-database-names) 
___

### _getScriptNames:_

**Supported FileMaker Server version:** 18, 19

Returns array of names of all available scripts for given database.

~~~js
/**
 * @param successCallback
 * @param errorCallback
 */
getScriptNames(successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
fm.login((loginSuccess) => {
    // login - SUCCESS
    fm.getScriptNames((requestSuccess) => {
        // getScriptNames - SUCCESS
    }, (requestError) => {
        // getScriptNames - ERROR
    });
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "scripts": [
      {
        "name": "Log request",
        "isFolder": false
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

[FileMaker 18 Data API Guide - Get Script Names
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#get-metadata_get-script-names) 
___

### _getLayoutNames:_

**Supported FileMaker Server version:** 18, 19

Returns array of names of all available layouts for given database.

~~~js
/**
 * @param successCallback
 * @param errorCallback
 */
getLayoutNames(successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getLayoutNames((requestSuccess) => {
		// getLayoutNames - SUCCESS
	}, (requestError) => {
		// getLayoutNames - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~
</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "layouts": [
      {
        "name": "php",
        "isFolder": true,
        "folderLayoutNames": [
          {
            "name": "php_user"
          },
          {
            "name": "php_licence"
          }
        ]
      },
      {
        "name": "scpt",
        "isFolder": true,
        "folderLayoutNames": [
          {
            "name": "scpt_log"
          }
        ]
      },
      {
        "name": "data",
        "isFolder": true,
        "folderLayoutNames": [
          {
            "name": "data_log"
          }
        ]
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

[FileMaker 18 Data API Guide - Get Layout Names
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#get-metadata_get-layout-names) 
___

### _getLayoutMetadata:_

**Supported FileMaker Server version:** 18, 19

Returns useful information about specific layout, including fields on the layout, portals, and value list data for each field set to use a value list for data entry.

~~~js
/**
 * @param successCallback
 * @param errorCallback
 */
getLayoutMetadata(successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getLayoutMetadata((requestSuccess) => {
		// getLayoutMetadata - SUCCESS
	}, (requestError) => {
		// getLayoutMetadata - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "fieldMetaData": [
      {
        "name": "id",
        "type": "normal",
        "displayType": "editText",
        "result": "number",
        "global": false,
        "autoEnter": true,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": true,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "created",
        "type": "normal",
        "displayType": "editText",
        "result": "timeStamp",
        "global": false,
        "autoEnter": true,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "created_by",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": false,
        "autoEnter": true,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "modified",
        "type": "normal",
        "displayType": "editText",
        "result": "timeStamp",
        "global": false,
        "autoEnter": true,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "modified_by",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": false,
        "autoEnter": true,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "surname",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "email",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "birthday",
        "type": "normal",
        "displayType": "editText",
        "result": "date",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "personal_identification_number",
        "type": "normal",
        "displayType": "editText",
        "result": "number",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "address",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "c_record_id",
        "type": "calculation",
        "displayType": "editText",
        "result": "number",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "photo",
        "type": "normal",
        "displayType": "editText",
        "result": "container",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "g_one",
        "type": "normal",
        "displayType": "editText",
        "result": "number",
        "global": true,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "g_text",
        "type": "normal",
        "displayType": "editText",
        "result": "text",
        "global": true,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "",
        "type": "invalid",
        "displayType": "editText",
        "result": "invalid",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "",
        "type": "invalid",
        "displayType": "editText",
        "result": "invalid",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      },
      {
        "name": "",
        "type": "invalid",
        "displayType": "editText",
        "result": "invalid",
        "global": false,
        "autoEnter": false,
        "fourDigitYear": false,
        "maxRepeat": 1,
        "maxCharacters": 0,
        "notEmpty": false,
        "numeric": false,
        "timeOfDay": false,
        "repetitionStart": 1,
        "repetitionEnd": 1
      }
    ],
    "portalMetaData": {
      "portal_licence": [
        {
          "name": "USER_licence::product_name",
          "type": "normal",
          "displayType": "editText",
          "result": "text",
          "global": false,
          "autoEnter": false,
          "fourDigitYear": false,
          "maxRepeat": 1,
          "maxCharacters": 0,
          "notEmpty": false,
          "numeric": false,
          "timeOfDay": false,
          "repetitionStart": 1,
          "repetitionEnd": 1
        },
        {
          "name": "USER_licence::key",
          "type": "normal",
          "displayType": "editText",
          "result": "text",
          "global": false,
          "autoEnter": false,
          "fourDigitYear": false,
          "maxRepeat": 1,
          "maxCharacters": 0,
          "notEmpty": false,
          "numeric": false,
          "timeOfDay": false,
          "repetitionStart": 1,
          "repetitionEnd": 1
        },
        {
          "name": "USER_licence::version",
          "type": "normal",
          "displayType": "editText",
          "result": "text",
          "global": false,
          "autoEnter": false,
          "fourDigitYear": false,
          "maxRepeat": 1,
          "maxCharacters": 0,
          "notEmpty": false,
          "numeric": false,
          "timeOfDay": false,
          "repetitionStart": 1,
          "repetitionEnd": 1
        },
        {
          "name": "USER_licence::date_of_expiration",
          "type": "normal",
          "displayType": "editText",
          "result": "date",
          "global": false,
          "autoEnter": false,
          "fourDigitYear": false,
          "maxRepeat": 1,
          "maxCharacters": 0,
          "notEmpty": false,
          "numeric": false,
          "timeOfDay": false,
          "repetitionStart": 1,
          "repetitionEnd": 1
        }
      ]
    }
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

[FileMaker 18 Data API Guide - Get Layout Metadata
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#get-metadata_get-layout-metadata) 
___

### _createRecord:_

**Supported FileMaker Server version:** 17, 18, 19

Create a record in the primary table of the current fmRESTor instance context.

~~~js
/**
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
createRecord(parameters, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "fieldData": {
    "surname": "Create Name",
    "email": "email@email.com",
    "birthday": "1.1.2001",
    "personal_identification_number": "99",
    "address": "Street 24, City"
  }
}

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.create(parameters
	, (requestSuccess) => {
		// createRecord - SUCCESS
	}, (requestError) => {
		// createRecord - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
  "response": {
    "scriptResult.prerequest": "MyScriptPreRequestParameters",
    "scriptError.prerequest": "0",
    "scriptResult.presort": "MyScriptPreSortParameters",
    "scriptError.presort": "0",
    "scriptResult": "MyScriptParameters",
    "scriptError": "0",
    "recordId": "348",
    "modId": "0"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_create-record)
___

### _deleteRecord:_

**Supported FileMaker Server version:** 17, 18, 19

Delete a record of given ID from the primary table of the current fmRESTor instance context.

~~~js
/**
 * @param id
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
deleteRecord(id, parameters = null, successCallback, errorCallback) 
~~~


<details><summary>Usage</summary>

~~~js

let id = 1;
let parameters = {
  "script": "Log request",
  "script.param": "MyScriptParameters",
  "script.prerequest": "Log request",
  "script.prerequest.param": "MyScriptPreRequestParameters",
  "script.presort": "Log request",
  "script.presort.param": "MyScriptPreSortParameters"
}

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.deleteRecord(id, parameters, (requestSuccess) => {
		// deleteRecord - SUCCESS
	}, (requestError) => {
		// deleteRecord - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "scriptResult.prerequest": "MyScriptPreRequestParameters",
    "scriptError.prerequest": "0",
    "scriptResult.presort": "MyScriptPreSortParameters",
    "scriptError.presort": "0",
    "scriptResult": "MyScriptParameters",
    "scriptError": "0"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_delete-record)
___

### _duplicateRecord:_

**Supported FileMaker Server version:** 18, 19

Duplicate a record, specified by ID, found in the primary table of the current fmRESTor instance context.

~~~js
/**
 * @param id
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
duplicateRecord(id, parameters = null, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "script": "Log request",
  "script.param": "MyScriptParameters",
  "script.prerequest": "Log request",
  "script.prerequest.param": "MyScriptPreRequestParameters",
  "script.presort": "Log request",
  "script.presort.param": "MyScriptPreSortParameters"
}

let id = 3;

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.duplicateRecord(id, parameters
	, (requestSuccess) => {
		// duplicateRecord - SUCCESS
	}, (requestError) => {
		// duplicateRecord - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "scriptResult.prerequest": "MyScriptPreRequestParameters",
    "scriptError.prerequest": "0",
    "scriptResult.presort": "MyScriptPreSortParameters",
    "scriptError.presort": "0",
    "scriptResult": "MyScriptParameters",
    "scriptError": "0",
    "recordId": "348",
    "modId": "0"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_duplicate-record) 
___

### _editRecord:_

**Supported FileMaker Server version:** 17, 18, 19

Update a record of given ID from the primary table of the current fmRESTor instance context.

~~~js
/**
 * @param id
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
editRecord(id, parameters, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "fieldData": {
    "surname": "Surname was edited",
    "email": "emailwasedited@email.com",
    "personal_identification_number": "1"
  }
}

let id = 4;

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.editRecord(id, parameters
	, (requestSuccess) => {
		// editRecord - SUCCESS
	}, (requestError) => {
		// editRecord - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "modId": "3"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_edit-record)
___

### _getRecord:_

**Supported FileMaker Server version:** 17, 18, 19

Get a record of given ID from the primary table of the current fmRESTor instance context.

~~~js
/**
 * @param id
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
getRecord(id, parameters = null, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "script": "Log request",
  "script.param": "MyScriptParameters",
  "script.prerequest": "Log request",
  "script.prerequest.param": "MyScriptPreRequestParameters",
  "script.presort": "Log request",
  "script.presort.param": "MyScriptPreSortParameters",
  "layout.response": "php_user",
  "_limit.USER_licence": 5,
  "_offset.USER_licence": 10
}

let id = 4;

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getRecord(id, parameters
	, (requestSuccess) => {
		// getRecord - SUCCESS
	}, (requestError) => {
		// getRecord - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "scriptResult.prerequest": "MyScriptPreRequestParameters",
    "scriptError.prerequest": "0",
    "scriptResult.presort": "MyScriptPreSortParameters",
    "scriptError.presort": "0",
    "scriptResult": "MyScriptParameters",
    "scriptError": "0",
    "dataInfo": {
      "database": "fmRESTor",
      "layout": "php_user",
      "table": "USER",
      "totalRecordCount": 165,
      "foundCount": 1,
      "returnedCount": 1
    },
    "data": [
      {
        "fieldData": {
          "id": 394,
          "created": "01/26/2020 17:53:36",
          "created_by": "api",
          "modified": "01/28/2020 12:02:31",
          "modified_by": "api",
          "surname": "Surname was edited",
          "email": "emailwasedited@email.com",
          "birthday": "",
          "personal_identification_number": 1,
          "address": "",
          "c_record_id": 320,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "320",
        "modId": "3",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_get-record)
___

### _getRecords:_

**Supported FileMaker Server version:** 17, 18, 19

Get multiple records from the primary table of the current fmRESTor instance context. The function returns all records (default configuration for limit is 100 number of records) if called with no parameter or those fitting the criteria specified in its parameter.

~~~js
/**
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
getRecords(parameters = null, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "_limit": 5
}

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.getRecords(parameters
	, (requestSuccess) => {
		// getRecords - SUCCESS
	}, (requestError) => {
		// getRecords - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "dataInfo": {
      "database": "fmRESTor",
      "layout": "php_user",
      "table": "USER",
      "totalRecordCount": 165,
      "foundCount": 165,
      "returnedCount": 5
    },
    "data": [
      {
        "fieldData": {
          "id": 252,
          "created": "07/30/2019 13:34:17",
          "created_by": "api",
          "modified": "07/30/2019 13:34:17",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 178,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "125",
              "USER_licence::product_name": "Windows 10 OEM Home",
              "USER_licence::key": "NKJFK-GPHP7-G8C3J-P6JXR-HQRJR ",
              "USER_licence::version": "10",
              "USER_licence::date_of_expiration": "05/12/2020",
              "modId": "0"
            },
            {
              "recordId": "126",
              "USER_licence::product_name": "Windows 7 Ultimate 32 bit",
              "USER_licence::key": "RCGX7-P3XWP-PPPCV-Q2H7C-FCGFR",
              "USER_licence::version": "7.3",
              "USER_licence::date_of_expiration": "03/04/2018",
              "modId": "0"
            }
          ]
        },
        "recordId": "178",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 2,
            "returnedCount": 2
          }
        ]
      },
      {
        "fieldData": {
          "id": 253,
          "created": "07/30/2019 13:34:34",
          "created_by": "api",
          "modified": "07/30/2019 13:34:34",
          "modified_by": "api",
          "surname": "Deleted Name",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 179,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "127",
              "USER_licence::product_name": "product01Denis",
              "USER_licence::key": "key01Denis",
              "USER_licence::version": "ver01Denis",
              "USER_licence::date_of_expiration": "01/01/2024",
              "modId": "0"
            }
          ]
        },
        "recordId": "179",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 1,
            "returnedCount": 1
          }
        ]
      },
      {
        "fieldData": {
          "id": 254,
          "created": "07/30/2019 13:34:34",
          "created_by": "api",
          "modified": "07/30/2019 13:34:34",
          "modified_by": "api",
          "surname": "Delete Name - check",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 180,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "128",
              "USER_licence::product_name": "product01Denis",
              "USER_licence::key": "key01Denis",
              "USER_licence::version": "ver01Denis",
              "USER_licence::date_of_expiration": "01/01/2024",
              "modId": "0"
            }
          ]
        },
        "recordId": "180",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 1,
            "returnedCount": 1
          }
        ]
      },
      {
        "fieldData": {
          "id": 255,
          "created": "07/30/2019 13:34:49",
          "created_by": "api",
          "modified": "07/30/2019 13:34:49",
          "modified_by": "api",
          "surname": "Ripley",
          "email": "ripley@mail-share.com",
          "birthday": "03/23/1985",
          "personal_identification_number": 52,
          "address": "4298 Poco Mas Drive, Dallas",
          "c_record_id": 181,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "181",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 256,
          "created": "07/30/2019 13:34:49",
          "created_by": "api",
          "modified": "07/30/2019 13:34:49",
          "modified_by": "api",
          "surname": "Ripley",
          "email": "ripley@mail-share.com",
          "birthday": "03/23/1985",
          "personal_identification_number": 52,
          "address": "4298 Poco Mas Drive, Dallas",
          "c_record_id": 182,
          "photo": "",
          "g_one": 123456789,
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "182",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#work-with-records_get-records)
___

### _uploadFileToContainter:_

**Supported FileMaker Server version:** 17, 18, 19

Upload file and store into container field. 
    
~~~js
/**
 * @param id
 * @param containerFieldName
 * @param containerFieldRepetition
 * @param file
 * @param successCallback
 * @param errorCallback
 */
uploadFileToContainter(id, containerFieldName, containerFieldRepetition, file, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~html
<input type="file" id="uploadFile"><br/><br/>
~~~
~~~js
let id = 4;
let containerFieldName = "photo";
let containerFieldRepetition = 1;
let file = document.getElementById('uploadFile').files[0];

fm.login((loginSuccess) => {
    // login - SUCCESS
	fm.uploadFileToContainter(id, containerFieldName, containerFieldRepetition, file
	, (requestSuccess) => {
		// uploadFileToContainter - SUCCESS
	}, (requestError) => {
		// uploadFileToContainter - ERROR
	});
}, (loginError) => {
    // login - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "modId": "1"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

___

### _findRecord:_

**Supported FileMaker Server version:** 17, 18, 19

Returns a set of records from the primary table of the current fmRESTor instance context, fitting the find criteria specified in its parameter.

~~~js
/**
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
findRecords(parameters, successCallback, errorCallback) 
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "query": [
    {
      "email": "==email@email.com",
      "birthday": "1.1.2001",
      "personal_identification_number": "99",
      "address": "Street 24, City",
      "omit": "true"
    }
  ]
}

fm.findRecords(parameters
, (requestSuccess) => {
    // findRecords - SUCCESS
}, (requestError) => {
    // findRecords - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "dataInfo": {
      "database": "fmRESTor",
      "layout": "php_user",
      "table": "USER",
      "totalRecordCount": 165,
      "foundCount": 165,
      "returnedCount": 100
    },
    "data": [
      {
        "fieldData": {
          "id": 252,
          "created": "07/30/2019 13:34:17",
          "created_by": "api",
          "modified": "07/30/2019 13:34:17",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 178,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "125",
              "USER_licence::product_name": "Windows 10 OEM Home",
              "USER_licence::key": "NKJFK-GPHP7-G8C3J-P6JXR-HQRJR ",
              "USER_licence::version": "10",
              "USER_licence::date_of_expiration": "05/12/2020",
              "modId": "0"
            },
            {
              "recordId": "126",
              "USER_licence::product_name": "Windows 7 Ultimate 32 bit",
              "USER_licence::key": "RCGX7-P3XWP-PPPCV-Q2H7C-FCGFR",
              "USER_licence::version": "7.3",
              "USER_licence::date_of_expiration": "03/04/2018",
              "modId": "0"
            }
          ]
        },
        "recordId": "178",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 2,
            "returnedCount": 2
          }
        ]
      },
      {
        "fieldData": {
          "id": 253,
          "created": "07/30/2019 13:34:34",
          "created_by": "api",
          "modified": "07/30/2019 13:34:34",
          "modified_by": "api",
          "surname": "Deleted Name",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 179,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "127",
              "USER_licence::product_name": "product01Denis",
              "USER_licence::key": "key01Denis",
              "USER_licence::version": "ver01Denis",
              "USER_licence::date_of_expiration": "01/01/2024",
              "modId": "0"
            }
          ]
        },
        "recordId": "179",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 1,
            "returnedCount": 1
          }
        ]
      },
      {
        "fieldData": {
          "id": 254,
          "created": "07/30/2019 13:34:34",
          "created_by": "api",
          "modified": "07/30/2019 13:34:34",
          "modified_by": "api",
          "surname": "Delete Name - check",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 180,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "128",
              "USER_licence::product_name": "product01Denis",
              "USER_licence::key": "key01Denis",
              "USER_licence::version": "ver01Denis",
              "USER_licence::date_of_expiration": "01/01/2024",
              "modId": "0"
            }
          ]
        },
        "recordId": "180",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 1,
            "returnedCount": 1
          }
        ]
      },
      {
        "fieldData": {
          "id": 255,
          "created": "07/30/2019 13:34:49",
          "created_by": "api",
          "modified": "07/30/2019 13:34:49",
          "modified_by": "api",
          "surname": "Ripley",
          "email": "ripley@mail-share.com",
          "birthday": "03/23/1985",
          "personal_identification_number": 52,
          "address": "4298 Poco Mas Drive, Dallas",
          "c_record_id": 181,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "181",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 256,
          "created": "07/30/2019 13:34:49",
          "created_by": "api",
          "modified": "07/30/2019 13:34:49",
          "modified_by": "api",
          "surname": "Ripley",
          "email": "ripley@mail-share.com",
          "birthday": "03/23/1985",
          "personal_identification_number": 52,
          "address": "4298 Poco Mas Drive, Dallas",
          "c_record_id": 182,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "182",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 257,
          "created": "07/30/2019 13:34:56",
          "created_by": "api",
          "modified": "07/30/2019 13:34:56",
          "modified_by": "api",
          "surname": "Sutton G.",
          "email": "sutton.gabriel@a.edu",
          "birthday": "12/11/2020",
          "personal_identification_number": 111,
          "address": "5776 Nisi Road, Gorlitz 38197",
          "c_record_id": 183,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": [
            {
              "recordId": "131",
              "USER_licence::product_name": "",
              "USER_licence::key": "VK7JG-NPHTM",
              "USER_licence::version": "",
              "USER_licence::date_of_expiration": "",
              "modId": "0"
            },
            {
              "recordId": "132",
              "USER_licence::product_name": "",
              "USER_licence::key": "",
              "USER_licence::version": "Business OLP",
              "USER_licence::date_of_expiration": "09/01/2023",
              "modId": "0"
            },
            {
              "recordId": "129",
              "USER_licence::product_name": "Adobe Photoshop Elements",
              "USER_licence::key": "VK7JG-NPHTM-C97JM-9MPGT-3V66T",
              "USER_licence::version": "2019 MP ENG BOX",
              "USER_licence::date_of_expiration": "02/08/2024",
              "modId": "0"
            },
            {
              "recordId": "130",
              "USER_licence::product_name": "Microsoft Office 365",
              "USER_licence::key": "KTNPV-KTRK4-3RRR8-39X6W-W44T3",
              "USER_licence::version": "Business Premium OLP",
              "USER_licence::date_of_expiration": "06/04/2021",
              "modId": "0"
            }
          ]
        },
        "recordId": "183",
        "modId": "1",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 4,
            "returnedCount": 4
          }
        ]
      },
      {
        "fieldData": {
          "id": 258,
          "created": "07/30/2019 14:19:09",
          "created_by": "api",
          "modified": "07/30/2019 14:19:09",
          "modified_by": "api",
          "surname": "Load Image Name",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 184,
          "photo": "https://blinky.24u.cz/Streaming_SSL/MainDB/6497ED0EB139CA632C284D791FD475FCA622A2395B9BA3647A26316F4678B134.jpg?RCType=EmbeddedRCFileProcessor",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "184",
        "modId": "1",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 259,
          "created": "07/31/2019 11:23:27",
          "created_by": "api",
          "modified": "07/31/2019 11:23:27",
          "modified_by": "api",
          "surname": "Create Name",
          "email": "email@email.com",
          "birthday": "01/01/2001",
          "personal_identification_number": 99,
          "address": "Street 24, City",
          "c_record_id": 185,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "185",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 260,
          "created": "08/08/2019 17:52:18",
          "created_by": "api",
          "modified": "08/08/2019 17:52:18",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 186,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "186",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 261,
          "created": "08/08/2019 17:52:56",
          "created_by": "api",
          "modified": "08/08/2019 17:52:56",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 187,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "187",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 262,
          "created": "08/08/2019 21:02:31",
          "created_by": "api",
          "modified": "08/08/2019 21:02:31",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 188,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "188",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 263,
          "created": "09/21/2019 18:35:10",
          "created_by": "api",
          "modified": "09/21/2019 18:35:10",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 189,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "189",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 264,
          "created": "09/21/2019 18:36:53",
          "created_by": "api",
          "modified": "09/21/2019 18:36:53",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 190,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "190",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 265,
          "created": "09/21/2019 18:37:49",
          "created_by": "api",
          "modified": "09/21/2019 18:37:49",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 191,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "191",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 266,
          "created": "09/25/2019 20:50:36",
          "created_by": "api",
          "modified": "09/25/2019 20:50:36",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 192,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "192",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 267,
          "created": "09/25/2019 20:50:46",
          "created_by": "api",
          "modified": "09/25/2019 20:50:46",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 193,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "193",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 268,
          "created": "09/25/2019 20:52:43",
          "created_by": "api",
          "modified": "09/25/2019 20:52:43",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 194,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "194",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 269,
          "created": "09/25/2019 20:52:44",
          "created_by": "api",
          "modified": "09/25/2019 20:52:44",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 195,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "195",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 270,
          "created": "09/25/2019 20:52:46",
          "created_by": "api",
          "modified": "09/25/2019 20:52:46",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 196,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "196",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 271,
          "created": "09/25/2019 20:52:47",
          "created_by": "api",
          "modified": "09/25/2019 20:52:47",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 197,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "197",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 272,
          "created": "09/25/2019 21:25:18",
          "created_by": "api",
          "modified": "09/25/2019 21:25:18",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 198,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "198",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 273,
          "created": "09/25/2019 21:25:45",
          "created_by": "api",
          "modified": "09/25/2019 21:25:45",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 199,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "199",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 274,
          "created": "09/25/2019 22:38:51",
          "created_by": "api",
          "modified": "09/25/2019 22:38:51",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 200,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "200",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 275,
          "created": "09/25/2019 22:38:58",
          "created_by": "api",
          "modified": "09/25/2019 22:38:58",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 201,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "201",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 276,
          "created": "09/25/2019 22:40:58",
          "created_by": "api",
          "modified": "09/25/2019 22:40:58",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 202,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "202",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 277,
          "created": "09/25/2019 22:46:55",
          "created_by": "api",
          "modified": "09/25/2019 22:46:55",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 203,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "203",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 278,
          "created": "09/25/2019 22:47:16",
          "created_by": "api",
          "modified": "09/25/2019 22:47:16",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 204,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "204",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 279,
          "created": "09/25/2019 22:47:28",
          "created_by": "api",
          "modified": "09/25/2019 22:47:28",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 205,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "205",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 280,
          "created": "09/25/2019 22:47:43",
          "created_by": "api",
          "modified": "09/25/2019 22:47:43",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 206,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "206",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 281,
          "created": "09/25/2019 22:49:36",
          "created_by": "api",
          "modified": "09/25/2019 22:49:36",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 207,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "207",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 282,
          "created": "09/25/2019 22:49:48",
          "created_by": "api",
          "modified": "09/25/2019 22:49:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 208,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "208",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 283,
          "created": "09/25/2019 22:53:55",
          "created_by": "api",
          "modified": "09/25/2019 22:53:55",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 209,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "209",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 284,
          "created": "09/25/2019 22:59:59",
          "created_by": "api",
          "modified": "09/25/2019 22:59:59",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 210,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "210",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 285,
          "created": "09/25/2019 23:01:23",
          "created_by": "api",
          "modified": "09/25/2019 23:01:23",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 211,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "211",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 286,
          "created": "09/25/2019 23:02:12",
          "created_by": "api",
          "modified": "09/25/2019 23:02:12",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 212,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "212",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 287,
          "created": "09/25/2019 23:03:40",
          "created_by": "api",
          "modified": "09/25/2019 23:03:40",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 213,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "213",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 288,
          "created": "09/25/2019 23:04:38",
          "created_by": "api",
          "modified": "09/25/2019 23:04:38",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 214,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "214",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 289,
          "created": "09/25/2019 23:04:52",
          "created_by": "api",
          "modified": "09/25/2019 23:04:52",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 215,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "215",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 290,
          "created": "09/25/2019 23:05:31",
          "created_by": "api",
          "modified": "09/25/2019 23:05:31",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 216,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "216",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 291,
          "created": "09/25/2019 23:06:29",
          "created_by": "api",
          "modified": "09/25/2019 23:06:29",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 217,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "217",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 292,
          "created": "09/25/2019 23:07:57",
          "created_by": "api",
          "modified": "09/25/2019 23:07:57",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 218,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "218",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 293,
          "created": "09/25/2019 23:08:09",
          "created_by": "api",
          "modified": "09/25/2019 23:08:09",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 219,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "219",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 294,
          "created": "09/25/2019 23:08:48",
          "created_by": "api",
          "modified": "09/25/2019 23:08:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 220,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "220",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 295,
          "created": "09/25/2019 23:09:29",
          "created_by": "api",
          "modified": "09/25/2019 23:09:29",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 221,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "221",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 296,
          "created": "09/25/2019 23:09:39",
          "created_by": "api",
          "modified": "09/25/2019 23:09:39",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 222,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "222",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 297,
          "created": "09/25/2019 23:09:43",
          "created_by": "api",
          "modified": "09/25/2019 23:09:43",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 223,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "223",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 298,
          "created": "09/26/2019 09:23:28",
          "created_by": "api",
          "modified": "09/26/2019 09:23:28",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 224,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "224",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 299,
          "created": "09/26/2019 11:07:04",
          "created_by": "api",
          "modified": "09/26/2019 11:07:04",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 225,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "225",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 300,
          "created": "09/26/2019 11:07:06",
          "created_by": "api",
          "modified": "09/26/2019 11:07:06",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 226,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "226",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 301,
          "created": "09/26/2019 11:07:07",
          "created_by": "api",
          "modified": "09/26/2019 11:07:07",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 227,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "227",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 302,
          "created": "09/26/2019 11:07:07",
          "created_by": "api",
          "modified": "09/26/2019 11:07:07",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 228,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "228",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 303,
          "created": "09/26/2019 11:07:07",
          "created_by": "api",
          "modified": "09/26/2019 11:07:07",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 229,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "229",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 304,
          "created": "09/26/2019 11:07:07",
          "created_by": "api",
          "modified": "09/26/2019 11:07:07",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 230,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "230",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 305,
          "created": "09/26/2019 11:07:07",
          "created_by": "api",
          "modified": "09/26/2019 11:07:07",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 231,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "231",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 306,
          "created": "09/26/2019 11:07:18",
          "created_by": "api",
          "modified": "09/26/2019 11:07:18",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 232,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "232",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 307,
          "created": "09/26/2019 11:07:18",
          "created_by": "api",
          "modified": "09/26/2019 11:07:18",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 233,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "233",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 308,
          "created": "09/26/2019 11:07:18",
          "created_by": "api",
          "modified": "09/26/2019 11:07:18",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 234,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "234",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 309,
          "created": "09/26/2019 11:07:47",
          "created_by": "api",
          "modified": "01/27/2020 14:54:30",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 235,
          "photo": "https://blinky.24u.cz/Streaming_SSL/MainDB/A8EF0D013DD66C3886BBB43909B73A961A192793DF6DB09B21CC2051EFA8A669.pdf?RCType=EmbeddedRCFileProcessor",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "235",
        "modId": "3",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 310,
          "created": "09/26/2019 11:07:47",
          "created_by": "api",
          "modified": "09/26/2019 11:07:47",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 236,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "236",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 311,
          "created": "09/26/2019 11:07:48",
          "created_by": "api",
          "modified": "09/26/2019 11:07:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 237,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "237",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 312,
          "created": "09/26/2019 11:07:48",
          "created_by": "api",
          "modified": "09/26/2019 11:07:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 238,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "238",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 313,
          "created": "09/26/2019 11:07:48",
          "created_by": "api",
          "modified": "09/26/2019 11:07:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 239,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "239",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 314,
          "created": "09/26/2019 11:07:48",
          "created_by": "api",
          "modified": "09/26/2019 11:07:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 240,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "240",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 315,
          "created": "09/26/2019 11:07:48",
          "created_by": "api",
          "modified": "09/26/2019 11:07:48",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 241,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "241",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 316,
          "created": "09/26/2019 11:09:42",
          "created_by": "api",
          "modified": "09/26/2019 11:09:42",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 242,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "242",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 317,
          "created": "09/26/2019 11:09:44",
          "created_by": "api",
          "modified": "09/26/2019 11:09:44",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 243,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "243",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 318,
          "created": "09/26/2019 11:09:44",
          "created_by": "api",
          "modified": "09/26/2019 11:09:44",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 244,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "244",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 319,
          "created": "09/26/2019 11:09:44",
          "created_by": "api",
          "modified": "09/26/2019 11:09:44",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 245,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "245",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 320,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 246,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "246",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 321,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 247,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "247",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 322,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 248,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "248",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 323,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 249,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "249",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 324,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 250,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "250",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 325,
          "created": "09/26/2019 11:10:33",
          "created_by": "api",
          "modified": "09/26/2019 11:10:33",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 251,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "251",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 326,
          "created": "09/26/2019 11:21:37",
          "created_by": "api",
          "modified": "09/26/2019 11:21:37",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 252,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "252",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 327,
          "created": "09/26/2019 11:21:37",
          "created_by": "api",
          "modified": "09/26/2019 11:21:37",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 253,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "253",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 328,
          "created": "09/26/2019 11:21:37",
          "created_by": "api",
          "modified": "09/26/2019 11:21:37",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 254,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "254",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 329,
          "created": "09/26/2019 11:21:37",
          "created_by": "api",
          "modified": "09/26/2019 11:21:37",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 255,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "255",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 330,
          "created": "09/26/2019 11:36:14",
          "created_by": "api",
          "modified": "09/26/2019 11:36:14",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 256,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "256",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 331,
          "created": "09/26/2019 11:36:15",
          "created_by": "api",
          "modified": "09/26/2019 11:36:15",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 257,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "257",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 332,
          "created": "09/26/2019 11:38:50",
          "created_by": "api",
          "modified": "09/26/2019 11:38:50",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 258,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "258",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 333,
          "created": "09/26/2019 12:23:00",
          "created_by": "api",
          "modified": "09/26/2019 12:23:00",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 259,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "259",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 334,
          "created": "09/26/2019 12:23:22",
          "created_by": "api",
          "modified": "09/26/2019 12:23:22",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 260,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "260",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 335,
          "created": "09/26/2019 12:23:23",
          "created_by": "api",
          "modified": "09/26/2019 12:23:23",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 261,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "261",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 336,
          "created": "09/26/2019 12:23:24",
          "created_by": "api",
          "modified": "09/26/2019 12:23:24",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 262,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "262",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 337,
          "created": "09/26/2019 12:23:24",
          "created_by": "api",
          "modified": "09/26/2019 12:23:24",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 263,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "263",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 338,
          "created": "09/26/2019 12:23:24",
          "created_by": "api",
          "modified": "09/26/2019 12:23:24",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 264,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "264",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 339,
          "created": "09/26/2019 12:23:26",
          "created_by": "api",
          "modified": "09/26/2019 12:23:26",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 265,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "265",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 340,
          "created": "09/26/2019 12:23:26",
          "created_by": "api",
          "modified": "09/26/2019 12:23:26",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 266,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "266",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 341,
          "created": "09/26/2019 12:23:27",
          "created_by": "api",
          "modified": "09/26/2019 12:23:27",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 267,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "267",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 342,
          "created": "09/26/2019 12:24:37",
          "created_by": "api",
          "modified": "09/26/2019 12:24:37",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 268,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "268",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 343,
          "created": "09/26/2019 12:24:55",
          "created_by": "api",
          "modified": "09/26/2019 12:24:55",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 269,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "269",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 344,
          "created": "09/26/2019 12:24:55",
          "created_by": "api",
          "modified": "09/26/2019 12:24:55",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 270,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "270",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 345,
          "created": "09/26/2019 12:24:56",
          "created_by": "api",
          "modified": "09/26/2019 12:24:56",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 271,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "271",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 346,
          "created": "09/26/2019 12:24:56",
          "created_by": "api",
          "modified": "09/26/2019 12:24:56",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 272,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "272",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 347,
          "created": "09/26/2019 12:24:56",
          "created_by": "api",
          "modified": "09/26/2019 12:24:56",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 273,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "273",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 348,
          "created": "09/26/2019 12:24:57",
          "created_by": "api",
          "modified": "09/26/2019 12:24:57",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 274,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "274",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 349,
          "created": "09/26/2019 12:24:57",
          "created_by": "api",
          "modified": "09/26/2019 12:24:57",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 275,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "275",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 350,
          "created": "09/26/2019 12:24:57",
          "created_by": "api",
          "modified": "09/26/2019 12:24:57",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 276,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "276",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      },
      {
        "fieldData": {
          "id": 351,
          "created": "09/26/2019 12:24:58",
          "created_by": "api",
          "modified": "09/26/2019 12:24:58",
          "modified_by": "api",
          "surname": "Lawrence",
          "email": "lawrence@lectus.ca",
          "birthday": "03/12/2020",
          "personal_identification_number": 398,
          "address": "7399 Lobortis Rd., Görlitz 38197",
          "c_record_id": 277,
          "photo": "",
          "g_one": "",
          "g_text": "",
          "": ""
        },
        "portalData": {
          "portal_licence": []
        },
        "recordId": "277",
        "modId": "0",
        "portalDataInfo": [
          {
            "portalObjectName": "portal_licence",
            "database": "fmRESTor",
            "table": "USER_licence",
            "foundCount": 0,
            "returnedCount": 0
          }
        ]
      }
    ]
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#perform-a-find-request)
___

### _setGlobalField:_

**Supported FileMaker Server version:** 17, 18, 19

Sets the values for global fields specified in its parameter. Set global field value is available only during same login session.

~~~js
/**
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
setGlobalField(parameters, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "globalFields": {
    "USER::g_one": "Global g_one is set up",
    "USER::g_text": "Global g_text is set up"
  }
}

fm.setGlobalField(parameters
, (requestSuccess) => {
    // setGlobalField - SUCCESS
}, (requestError) => {
    // setGlobalField - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {},
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

Complete list of optional parameters is available at [FileMaker 18 Data API Guide
](https://fmhelp.filemaker.com/docs/18/en/dataapi/#set-global-fields)
___

### _runScript:_

**Supported FileMaker Server version:** 18, 19

Simply run a script in the given database without performing any other actions.

**Important:** This methods waits for the script to finish and **is** able to return script result in the response.

~~~js
/**
 * @param scriptName
 * @param parameters
 * @param successCallback
 * @param errorCallback
 */
runScript(scriptName, parameters = null, successCallback, errorCallback)
~~~

<details><summary>Usage</summary>

~~~js
let parameters = {
  "script.param": "MyScriptParameters"
}

let scriptName = "Log request";

fm.runScript(scriptName, parameters
, (requestSuccess) => {
    // runScript - SUCCESS
}, (requestError) => {
    // runScript - ERROR
});
~~~

</details>

<details><summary>Sample Response</summary>

~~~json
{
  "response": {
    "scriptResult": "MyScriptParameters",
    "scriptError": "0"
  },
  "messages": [
    {
      "code": "0",
      "message": "OK"
    }
  ]
}
~~~

</details>

___

License
-
fmRESTor is licensed under the "GNU LGPLv3" License.








