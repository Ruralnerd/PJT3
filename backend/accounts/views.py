from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .serializer import GetUserSerializer, UserSerializer, UserSmallSerializer

from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

@swagger_auto_schema(method='post', request_body=UserSerializer)
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors.as_data(), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def update(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    if request.method == 'GET':
        serializer = GetUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.user == user and request.method == 'PUT':
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors.as_data(),status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'errors' : '토큰과 유저정보가 일치하지 않습니다'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def follow(request, user_pk):
    person = get_object_or_404(get_user_model(), pk=user_pk)
    me = request.user
    if person.followers.filter(pk=me.pk).exists():
        person.followers.remove(me)
    else:
        person.followers.add(me)
    new = UserSmallSerializer(person)
    return Response('',status=status.HTTP_201_CREATED)