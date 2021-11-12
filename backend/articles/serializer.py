from rest_framework import fields, serializers

from accounts.serializer import UserSmallSerializer, StorySmallSerializer, MarketSmallSerializer
from searches.serializer import CategorySerializer
from .models import Story, StoryComment, StoryContent

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


# Story Content Serializer
class StoryContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoryContent
        fields = "__all__"

class StoryContentEditSerializer(serializers.ModelSerializer):    
    class Meta:
        model = StoryContent
        fields = ['content']

# Stroy Serializers
class StorySerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()
    comments = StoryCommentSerializer(many=True)
    contents = StoryContentSerializer(many=True)
    markets = MarketSmallSerializer(many=True)

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
        fields = ['title', 'thumbnail_img']


