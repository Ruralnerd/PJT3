from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import os

from rest_framework import views
from searches.models import Category

def story_image_path(instance, filename):
    return 'articles/storys/{}/{}'.format(instance.story.pk, filename)

def thumbnail_image_path(instance, filename):
    return 'articles/storys/thumbnail/{}/{}'.format(instance.story.pk, filename)

class Story(models.Model):
    producer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='storys')
    title = models.CharField(max_length=100)
    thumbnail_img = ProcessedImageField(
        upload_to=thumbnail_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    categorys = models.ManyToManyField(Category, related_name='storys')
    hits = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def delete(self, *args, **kwargs):
        super(Story, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.thumbnail_img.path))

class StoryComment(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='story_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class StoryContent(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='contents')
    img = ProcessedImageField(
        upload_to=story_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    content = models.TextField(blank=True)
    sequence = models.IntegerField(default=0)
    def delete(self, *args, **kwargs):
        super(StoryContent, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.img.path))

