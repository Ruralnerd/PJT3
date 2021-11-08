from rest_framework import fields, serializers

from accounts.serializer import UserSmallSerializer, StorySmallSerializer, MarketSmallSerializer
from .models import Story, StoryComment, StoryImg

# Comment Serializers
class StoryCommentSerializer(serializers.ModelSerializer):
    user = UserSmallSerializer()
    class Meta:
        model = StoryComment
        exclude = ['story']

class StoryCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryComment
        fields = ['content'] 


# Story Image Serializer
class StoryImgSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoryImg
        fields = "__all__"

# Stroy Serializers
class StorySerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()
    comments = StoryCommentSerializer(many=True)
    imgs = StoryImgSerializer(many=True)

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


