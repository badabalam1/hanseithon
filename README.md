#회원가입 및 로그인하기 전 
## `/register`
### POST 
**Request**
```json
{
    "data" : {
        "id" : "admin",
        "pw" : "1234",
        "profile" : "프로필 사진객체",
        "name" : "어드민",
        "phone" : "010-1234-5678",
        "email" : "asdf@nvaer.com"
    }
}
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "회원가입에 성공했습니다."
    }
}
```
> 실패했을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "이미 등록된 아이디입니다."
    }
}
```

## `/login`
### POST
**Request**
```json
{
    "id" : "admin",
    "pw" : "1234"
}
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "로그인에 성공하였습니다.",
    },
    "auth" :   {
        "token" : "{토큰 값}"
    },
    "user" :   {
        "id" : "{사용자 아이디}"
    }
}
```

> 실패했을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "아이디 혹은 비밀번호가 틀렸습니다."
    }
}
```

## `/{id}`
### PUT
**Request**
```json
{
    "data" : {
        "profile" : "프로필 사진객체",
        "pw" : "1234",
        "name" : "어드민",
        "phone" : "010-1234-5678",
        "email" : "asdf@naver.com"
    }
}
headers
    authorization: "token value"
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "정보가 수정되었습니다."
    }
}
```

> 계정이 존재하지 않을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "계정이 존재하지 않습니다."
    }
}
```

> 권한이 없을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "권한이 없습니다."
    }
}
```

## `/{id}`
### DELETE
**Request**
```json
{
    "id" : "admin"
}
headers
 authorization: "token value"
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "계정이 삭제되었습니다."
    }
}
```

 > 계정이 없을 때
 ```json
{
    "result" : {
        "success" : false,
        "message" : "계정이 존재하지 않습니다."
    }
}
```

# Home
## `/findall/{_id}`
## `/lostall/{_id}
### GET 
**Response**
> 성공했을 때
```json 
{
    "result" : [
        {
            "img" : [
                "img"
            ],
            "tag" : [
                "태그"
            ],
            "_id": "2353243",
            "id" : "admin",
            "title" : "내용",
            "content" : "제목",
            "mapX" : 1234.1234,
            "mapY" : 1234.1234,
            "CreateDate" : "날짜",
            "__v" : 0
        }
    ]
}
```
> 실패했을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "에러 메세지"
    }
}
```

## `/findSearch`
## `/lostSearch`
### POST
**Request**
```json
{
    "tag" : "태그"
}
```

**Response**
> 성공했을 때
```json
{
    "result" : [
        {
            "img" : [
                "img"
            ],
            "tag" : [
                "tag"
            ],
            "_id" : "12345432",
            "id" : "admin",
            "title" : "제목",
            "content" : "내용",
            "mapX" : 1234.1234,
            "mapY" : 1234.1234,
            "createDate" : "시간",
            "__v": 0
        }
    ]
}
```
> 실패했을 때
```json
{
    "result" : {"success" : false, "message" : "에러 메세지"}
}
```
# 내가 잃어버린 물건이나 주운 물건
## `/find`
## `/lost`
### POST
**Request**
```json 
{
    "data" : {
        "id" : "admin",
        "title" : "title",
        "content" : "content",
        "tag" : ["tag(필수는 아님)"],
        "img" : ["이미지 사진객체(필수는 아님)"],
        "mapX" : 1234.1234"(필수는 아님)",
        "mapY" : 1234.1234"(필수는 아님)"
    }
}
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "글을 정상적을 작성하였습니다."
    }
}
```

> 실패했을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "에러 메세지"
    }
}
```

## `/find/{_id}`
## `/lost/{_id}`
### GET
**Response**
> 성공했을 때
```json
{
    "result" : "글에 대한 자세한 정보"
}
```

> 실패했을 때
```json
{
    "result" : {
        "success" : false, "message" : "에러 메세지"
    }
}
```

## `/findme/{_id}`
## `/lostme/{_id}`
### GET
**Response**
> 성공했을 때
```json
{
    "result" : "내가 작성한 모든 글"
}
```

> 실패했을 때
```json
{
    "result" : {
        "success" : false, 
        "message" : "에러 메세지"
    }
}
```

## `/find/{_id}`
## `/lost/{_id}`
### PUT
**Request**
```json
{
    "data" : {
        "img" : "이미지 사진객체",
        "title": "제목",
        "content" : "내용",
        "tag" : "tag",
        "mapX" : 12345.12345,
        "mapY" : 1234.1234
    }
}
```

**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "수정되었습니다."
    }
}
```

> 실패했을 때
```json
{
    "result" : {
        "success" : false,
        "message" : "에러 메세지"
    }
}
```

## `/find/{_id}`
## `/lost/{_id}`
### DELETE
**Response**
> 성공했을 때
```json
{
    "result" : {
        "success" : true,
        "message" : "삭제되었습니다."
    }
}
```

> 실패했을 때
```json 
{
    "result" : {
        "success" : false,
        "message" : "에러 메세지"
    }
}
```
