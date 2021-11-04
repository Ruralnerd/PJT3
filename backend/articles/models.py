from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import os

from rest_framework import views

def story_image_path(instance, filename):
    return 'articles/storys/{}/{}'.format(instance.story.pk, filename)

def thumbnail_image_path(instance, filename):
    return 'articles/storys/thumbnail/{}/{}'.format(instance.story.pk, filename)

class Story(models.Model):
    producer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='stories')
    title = models.CharField(max_length=100)
    content = models.TextField()
    thumbnail_img = ProcessedImageField(
        upload_to=thumbnail_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def delete(self, *args, **kwargs):
        super(Story, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.thumbnail_img.path))

class Comment(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Img(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='imgs')
    img = ProcessedImageField(
        upload_to=story_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    def delete(self, *args, **kwargs):
        super(Img, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.img.path))


class Category(models.Model):
    name = models.CharField(max_length=50) 

    class Meta:
        db_table = 'searches_category'

class Category_story(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = 'articles_category_relation'
