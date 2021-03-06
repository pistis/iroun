# iroun
[![npm](https://img.shields.io/npm/v/iroun.svg)](https://www.npmjs.com/package/iroun)
[![npm](https://img.shields.io/npm/dt/iroun.svg)](https://www.npmjs.com/package/iroun)
[![GitHub license](https://img.shields.io/github/license/pistis/iroun.svg)](https://github.com/pistis/iroun/blob/master/LICENSE)

A JavaScript-based name analyzer for all javascript developers in the world.  

![iroun-word-art-0.3.0](./resources/image/iroun-word-art-0.3.0.png)

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
```bash
$ iroun analyze
```
**step 1 : Run the interactive cli and analyze the topic-word of the project (github opensource).**
![step 1](https://user-images.githubusercontent.com/4979560/58429974-88f17300-80e2-11e9-8692-b43dd5151c00.gif)

**step 2 : Copy the topic-word file and go to wordart.com to create wordcloud.**
![step 2](https://user-images.githubusercontent.com/4979560/58429979-8ee75400-80e2-11e9-8294-15db3c08d6e6.gif)

**Output Examples**
Word Clouds
> It is made up of words and weights that mean weights.  
> You just copy this text and paste it at [wordclouds.com](https://www.wordclouds.com/).  

```
$ open {your current directory}/topic-word-for-wordclouds.com.txt
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
$ open {your current directory}/topic-word-for-wordart.com.txt
names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names names declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration declaration program program program program program program program program program program program program program program program program program program program .....
```

### Algorithm Background
#### Analyze Topic Word
> With the help of 'iroun' you can make a nice word cloud in wordart.

**Topic word extraction algorithm**  

*Word extraction*
1. After parsing all the js, vue, and ts files in the project, create an AST.
2. Extract the names of Class, Method, Variable, Parameter, Argument, and Attribute from AST.
3. Separate words from names (camelCase, PascalCase, snake_case, etc ...)
4. Filter out words whose pos(parts of speech) are nouns.
5. Filter the stopwords. (english stopwords, javascript reserved keywords)
6. Save the resulting words into a text file with a space separator.

*Topic word selection*
1. Extract feature words by applying word frequency and TF-IDF text mining algorithm based on extracted word text data.
2. Save the feature word as a text file.

*[TF-IDF comparison document dataset](dataset/words)*

## CONTRIBUTING
The project is still in its infancy and we are constantly wondering what meaningful information we can get by analyzing well-crafted open source projects.  
If have any ideas, please feel free to register issue.  

## License

  MIT
