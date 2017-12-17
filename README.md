# TODO API

[![JS Standard Style][standard-image]][standard-url]
[![Dependency Status][depstat-image]][depstat-url]

> Todo List Task and User

## Install

```sh
git clone this repo
npm install
mongodb database = todo
```

## Examples

## TASK

### Show Task
This API can show your Task


User requests `localhost:3000/api/task` Method: GET, this API will be shown task in data JSON

You need to login first before execute this API

### Show Spesific Task
This API can show your spesific Task


User requests `localhost:3000/api/task/:idTask`Method: GET, this API will be shown task in data JSON

You need to login first before execute this API

### Create Task
This API can create your Task


User requests `localhost:3000/api/task` Method = POST,  this API will be create data task

You need to login first before execute this API

### Update Task
This API can update your Task


User requests `localhost:3000/api/task/:idTask` Method = PUT,  this API will be update data task

You need to login first before execute this API

### Delete Task
This API can delete your Task


User requests `localhost:3000/api/task/:idTask` Method = DELETE,  this API will be delete data task

You need to login first before execute this API

## USER

### Show User
This API can show your User


User requests `localhost:3000/api/user` Method: GET, this API will be shown task in data JSON

Role :
- Admin = Can take all data User
- User = only can see his data

### Show Spesific User
This API can show your spesific User


User requests `localhost:3000/api/user/:idUser`Method: GET, this API will be shown User

Role :
- Admin = Can get all data spesific User
- User = Only can get his data User

### Create User
This API can create your User


User requests `localhost:3000/api/user` Method = POST,  this API will be create data user

Role :
- Admin = can create all data User with all Role
- User = Cant User this API

### Update User
This API can update your User


User requests `localhost:3000/api/user/:idUser` Method = PUT,  this API will be update data user

Role :
- Admin = can update all data User with all role
- User = only can update his data

### Delete User
This API can delete your User


User requests `localhost:3000/api/uyser/:idUser` Method = DELETE,  this API will be delete data user

Role :
- Admin = can delete all data User with all role
- User = only can delete his data

##AUTHENTICATION

###Sign Up
This API can create new User with role User

User requests `localhost:3000/api/signup` Method = POST, this API will be create data user with role User

###Sign In
This API can sign in into API

User requests `localhost:3000/api/signin` Method = POST, this API will be login into API


## Contributing

This API was created with [hacktiv8-northernFox](https://github.com/northern-fox-2017). Please refer to there to understand the codestyle and workflow. Issues and PRs are welcome! 

## License

MIT © [Andrey Amrulloh](http://github.com/andreychuinx)

[standard-url]: http://standardjs.com
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[npm-url]: https://npmjs.org
[npm-image]: https://img.shields.io/npm/v/querymen.svg?style=flat-square


[depstat-url]: https://andreywashere.tumblr.com
[depstat-image]: https://david-dm.org/diegohaz/querymen.svg?style=flat-square