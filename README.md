# Furrl-Backend

Backend Task for Creation/Updation of Software requirement ticket

## Set Up .env file

    PORT=3000
    MONGO_URI=mongodb://localhost:27017
    SECRET_KEY=car

## Install

    npm install

## Run the app

    npm start

# REST API

The REST API to the example app is described below.

## Sign Up User

### Request

`POST /users/new`

    {
    "email": "a@gmail.com",
    "role": "admin",
    "password": "123"
    }

### Response

    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwidWlkIjoiUEUzcHRrcUZqIiwiaWF0IjoxNjY5OTA3NDAwfQ.RCwjOBlLVLDemBiPfm_cwSVCmagejbpckzlfrs47CMk"
    }

## Login User using Token

### Request

`POST /users/login`

    {
    "email": "b@gmail.com",
    "password": "123"
    }

### Response

    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJAZ21haWwuY29tIiwidWlkIjoiM3NmdjhBYzA2IiwiaWF0IjoxNjY5OTA3NDU4fQ.Qtp1eiB6YYoqFTZIS3G2c5RjioBlvGC3BWEPBFEdw4w"
    }

## Create New Ticket

### Request

`POST /tickets/new`

    {
    "title": "new",
    "description": "asdasdasdasdasd"
    }

### Response

    {
    "status": "ToDo",
    "_id": "6388c45fc6cc0cbad084ea95",
    "uid": "N_KEkiywN",
    "title": "new",
    "description": "asdasdasdasdasd",
    "createdAt": "2022-12-01T15:12:31.446Z",
    "updatedAt": "2022-12-01T15:12:31.446Z",
    "__v": 0
    }

## Assign Ticket to user

### Request

`POST /tickets/assign/:id`

    {
    "assignedTo": "b@gmail.com"
    }

### Response

    {
    "Message": "Ticket successfully assigned to: b@gmail.com"
    }

## Mark Ticket as Done

### Request

`POST /tickets/done/:id`

### Response

    {
    "Messege": "6388b14a0bbdb90498e866b5 marked as Done"
    }

## Get list of All Tickets

### Request

`GET /tickets/`

### Response

    [
    {
        "_id": "6388b14a0bbdb90498e866b5",
        "status": "Done",
        "uid": "Uo5RiWXgZ",
        "title": "new",
        "description": "asdasdasdasdasd",
        "createdAt": "2022-12-01T13:51:06.229Z",
        "updatedAt": "2022-12-01T14:04:48.440Z",
        "__v": 0
    }
    ]

## Update Ticket

### Request

`PATCH /tickets/:id`

{
"title": "old",
"description": "neggar",
"status": "InProgress"
}

### Response

    {
    "Messege": "Uo5RiWXgZ updated"
    }

## Get changed Thing

### Request

`DELETE /users/delete`

### Response

    {
    "Message": "User deleted Successfully"
    }
