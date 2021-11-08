from rest_framework import serializers

from accounts.serializer import UserOrderSerializer, UserSmallSerializer
from .models import Request, MarketComment, MarketImg, Market

# Comment Serializers
class MarketCommentSerializer(serializers.ModelSerializer):
    user = UserSmallSerializer()
    class Meta:
        model = MarketComment
        exclude = ['market']

class MarketCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketComment
        fields = ['content'] 

# Story Image Serializer
class MarketImgSerializer(serializers.ModelSerializer):

    class Meta:
        model = MarketImg
        fields = "__all__"

# Stroy Serializers
class MarketSerializer(serializers.ModelSerializer):
    producer = UserSmallSerializer()
    comments = MarketCommentSerializer(many=True)
    imgs = MarketImgSerializer(many=True)

    class Meta:
        model = Market
        fields = "__all__" 

class MarketCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Market
        fields = ['title','price','period','unit','quantity']

class MarketEditSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Market
        fields = ['title','price','period','unit','quantity', 'thumbnail_img']


class MarketSmallSerializer(serializers.ModelSerializer):
    seller = UserSmallSerializer()

    class Meta:
        model = Market
        fields = ['id', 'title', 'thumbnail_img', 'seller']

# Request Serializers
class RequestBuyerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    buyer = UserOrderSerializer()

    class Meta:
        model = Request
        fields = '__all__'


class RequestSellerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = ['state', 'waybill', 'comp_date']