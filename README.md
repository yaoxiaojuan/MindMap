# MindMap
读取简单的JSON数据，以思维导图的方式展示这些数据。简单易用，支持无限极延伸。

[MindMap](https://luckyyao.github.io/MindMap/)

## 数据结构

```
{
  "root":{
    "data": {
      "id": "d9f0899f4fdf",
      "text": "1"
    },
    "children":[
      {
        "data":{
          "id": "bj8epyt42400",
          "text":"1-1"
        },
        "children":[
          {
            "data":{
              "id":"bj8eq0q5x9c0",
              "text":"2-1"
            },
            "children":[...]
          }
        ]
      },
      {
        "data":{
          "id": "bj8epyt42400",
          "text":"1-2"
        },
        "children":[
          {
            "data":{
              "id":"bj8eq0q5x9c0",
              "text":"2-1"
            },
            "children":[...]
          }
        ]
      },
    ]
  }
}
```