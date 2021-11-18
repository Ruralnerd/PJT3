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
        fields = ['id', 'title', 'thumbnail_img', 'price', 'seller']

# User Serializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'nickname', 'password', 'address', 'phone', 'is_seller', "profile_img", "ac_number", "ac_bank"]

class UserMarketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Market
        fields = ['id', 'title', 'thumbnail_img', 'price']

class UserListserializer(serializers.ModelSerializer):
    markets = UserMarketSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'nickname', 'profile_img', 'markets']

class UserImgserializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['profile_img']


class GetUserSerializer(serializers.ModelSerializer):
    storys = StorySmallSerializer(many=True)
    markets = MarketSmallSerializer(many=True)
    followings = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
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