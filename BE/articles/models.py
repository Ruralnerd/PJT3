from django.db import models
from django.conf import settings


class Story(models.Model):
    producer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='stories')
    title = models.CharField(max_length=100)
    content = models.TextField()
    thumbnail_img = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='comments')
    producer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'articles_story_comment'


class Img(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='imgs')
    name = models.CharField(max_length=50)
    dir = models.CharField(max_length=200)


class Category(models.Model):
    name = models.CharField(max_length=50) 

    class Meta:
        db_table = 'searches_category'

class Category_story(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = 'articles_category_relation'
