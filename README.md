# Vanilla text analyzer

텍스트를 입력하면 빈도수로 분류해 시각적으로 보여주는 텍스트 분석 어플리케이션입니다.

<img src="./1st-test-choinashil.gif" alt="example">

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn dev (or npm run dev)
# visit http://localhost:8080
```


## Features

1. 영문만 지원합니다. 영문 이외의 글자가 입력될 경우 동작하지 않습니다.
2. 텍스트는 5000자(영문 기준) 이하만 입력가능합니다. 5000자를 초과할 경우 동작하지 않습니다.
3. 텍스트를 입력하면 단어수가 하단에 표시됩니다.
4. 타이틀 옆 그래프 이미지를 클릭하면 상위 5위의 텍스트와 빈도수를 볼 수 있습니다.
5. 결과창의 글자 크기와 글자 색깔은 빈도수와 관련되며, 사용자가 텍스트를 입력할 때마다 지속적으로 업데이트됩니다.
6. 결과창의 글자 위에 마우스를 올리면 해당 글자의 빈도수를 볼 수 있습니다.
7. 반응형은 지원하지 않습니다.
