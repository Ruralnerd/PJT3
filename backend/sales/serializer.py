from rest_framework import serializers

from accounts.serializer import UserOrderSerializer
from .models import Request


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