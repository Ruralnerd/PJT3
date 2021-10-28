from rest_framework import serializers

from accounts.serializer import UserSmallSerializer
from .models import Story, Comment, Img

class CommentSerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()

    class Meta:
        model = Comment
        exclude = ['story'] 


class ImgSerializer(serializers.ModelSerializer):

    class Meta:
        model = Img
        exclude = ['story'] 


class StorySerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()
    comments = CommentSerializer(many=True, read_only=True)
    imgs = ImgSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = "__all__" 


class StorySmallSerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()

    class Meta:
        model = Story
        fields = ['id', 'title', 'thumbnail_img', 'producer']