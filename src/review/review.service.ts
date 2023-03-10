import _ from 'lodash';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ReviewService {
 
//db 연결해야된다
private articles = [];

private articlePasswords = new Map();
    
getArticles() {
  return this.articles;
}

getArticleById(id: number) {
  return this.articles.find((article) => {
  return article.id === id;
 });
}
createArticle(title: string, content: string, password: number) {
//id를 먼저 매겨야 한다
// 1번부터 시작 -> 현재 배열의 크기 +1
  const articleId = this.articles.length + 1;
  this.articles.push({ id: articleId, title, content });
  this.articlePasswords.set(articleId, password);
    return articleId;
  }

updateArticle(id: number, title: string, content: string, password: number) {
  if (this.articlePasswords.get(id) !== password) {
    throw new UnauthorizedException('password is not correct. id:' + id);
  }
    
  const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException('Artile not found. id:' +id);
    }
    
  article.title = title;
  article.content = content;
 }
     
deleteArticle(id: number, password: number) {
  if (this.articlePasswords.get(id) !== password) {
    throw new UnauthorizedException('password is not correct. id:' + id);
  }
    this.articles = this.articles.filter((article) => {
      return article.id !== id;
   });
 }
}