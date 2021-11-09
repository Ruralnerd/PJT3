from rest_framework import serializers
from django.contrib.auth import get_user_model

from articles.models import Story
from sales.models import Market

User = get_user_model()

# small Serializer

class UserSmallSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'nickname', 'profile_img']


class StorySmallSerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()

    class Meta:
        model = Story
        fields = ['id', 'title', 'thumbnail_img', 'producer']

class MarketSmallSerializer(serializers.ModelSerializer):
    seller = UserSmallSerializer()

    class Meta:
        model = Market
        fields = ['id', 'title', 'thumbnail_img', 'seller']

# User Serializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'nickname', 'password', 'address', 'phone', 'is_seller', "profile_img", "ac_number", "ac_bank"]


class GetUserSerializer(serializers.ModelSerializer):
    storys = StorySmallSerializer(many=True)
    markets = MarketSmallSerializer(many=True)
    class Meta:
        model = User
        fields = '__all__'


class UserOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'nickname', 'phone', 'address']


class UserLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password']