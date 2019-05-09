# iroun
[![npm](https://img.shields.io/npm/v/iroun.svg)](https://www.npmjs.com/package/iroun)
[![npm](https://img.shields.io/npm/dt/iroun.svg)](https://www.npmjs.com/package/iroun)
[![GitHub license](https://img.shields.io/github/license/pistis/iroun.svg)](https://github.com/pistis/iroun/blob/master/LICENSE)

A JavaScript-based name analyzer for all javascript developers in the world.  

![iroun-word-art-0.2.0](./resources/image/iroun-word-art-0.2.0.png)

## Why is it fun?

Topic Word  
1. It is easy to see which words I use a lot in my Javascript project and whether they are really characteristic words that can represent my project.  
2. You can easily identify the characteristic words of well-made open source projects as well as my project.  
3. Provides output to create a cool word cloud image.  

## Installation
```bash
$ npm install -g iroun
```

## Usage
### Features
#### 1. Analyze Topic Word
> With the help of 'iroun' you can make a nice word cloud in wordart.

##### How to
```bash
$ iroun -n "your project name" -s "your project source root directory path" -o "your output directory path"
```

##### Output Examples
Word Clouds
> It is made up of words and weights that mean weights.  
> You just copy this text and paste it at [wordclouds.com](https://www.wordclouds.com/).  

```
$ open /{your output path}/topic-{project name}-word-for-wordclouds.com.txt
40 names
23 declaration
21 program
18 parameter
16 expression
16 split
12 method
12 property
11 word
10 variable
...
```

Word Art
> It is a text file in which the word is repeated as much as the weight.  
> You just copy and paste this text into [wordart.com](https://wordart.com/).  

```bash
$ open /{your output path}/topic-{project name}-word-for-wordart.com.txt
names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration program program program program program program program program program program program program program program program program program program program .....
```

## CONTRIBUTING
The project is still in its infancy and we are constantly wondering what meaningful information we can get by analyzing well-crafted open source projects.  
If have any ideas, please feel free to register issue.  

## License

  MIT
