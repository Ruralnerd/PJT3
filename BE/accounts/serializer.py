from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'nickname', 'password', 'address', 'phone', 'is_seller']


class GetUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'