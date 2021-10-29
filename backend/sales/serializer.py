from rest_framework import serializers

from .models import Request


class RequestBuyerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'