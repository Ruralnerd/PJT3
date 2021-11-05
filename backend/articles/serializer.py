from rest_framework import fields, serializers

from accounts.serializer import UserSmallSerializer
from .models import Story, Comment, Img

# Comment Serializers
class CommentSerializer(serializers.ModelSerializer):
    user = UserSmallSerializer()
    class Meta:
        model = Comment
        exclude = ['story']

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content'] 


# Story Image Serializer
class ImgSerializer(serializers.ModelSerializer):

    class Meta:
        model = Img
        fields = "__all__"

# Stroy Serializers
class StorySerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()
    comments = CommentSerializer(many=True)
    imgs = ImgSerializer(many=True)

    class Meta:
        model = Story
        fields = "__all__" 

class StoryCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Story
        fields = ['title']

class StoryEditSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Story
        fields = ['title', 'content', 'thumbnail_img']


class StorySmallSerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()

    class Meta:
        model = Story
        fields = ['id', 'title', 'thumbnail_img', 'producer']