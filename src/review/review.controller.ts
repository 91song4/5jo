import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { ReviewService } from './review.service';
import { UpdateArticleDto } from './update-article.dto';
import { Injectable } from "@nestjs/common";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService : ReviewService) {}

    
 // 리뷰조회 API
 @Get('/articles')
 getArticles() {
    return this.reviewService.getArticles();
 }

 // 리뷰 상세보기 ->  id 로 확인
 @Get('/articles/:id')
 getArticleById(@Param('id') articleId: number) {
   //number 는 원래 string 이여야한다
   // class-validator, class-transformer
    return this.reviewService.getArticleById(articleId);
 }

 // 리뷰 작성
 @Post('/articles')
 createArticle(@Body() data: CreateArticleDto) {
    return this.reviewService.createArticle(
   data.title,
   data.content, 
   data.password,
  );
 }

// 리뷰 수정
@Put('/articles/:id')
 updateArticle(
   @Param('id') articleId: number,
   @Body() data: UpdateArticleDto
) {
   return this.reviewService.updateArticle(
   articleId,
   data.title,
   data.content,
   data.password,
   );
 }

// 리뷰 삭제
@Delete('/articles/:id')
 deleteArticle(
   @Param('id') articleId: number,
   @Body() data: DeleteArticleDto
) {
   return this.reviewService.deleteArticle(articleId, data.password);
 }
}

