from django.http import response
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import get_user_model
import requests

from decouple import config
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import GetUserSerializer, UserSerializer, UserSmallSerializer


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


@api_view(['GET'])
def kakaologin(request):
    URL = "https://kauth.kakao.com/oauth/authorize"
    client_id = config('KAKAO_RESTAPI')
    redirect_uri = "http://localhost:8000/api/v1/accounts/kakaologin/callback/"
    
    # 인가코드 받기
    return redirect(
        f'{URL}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code'
    )


def kakaologin_callback(request):
    authorization_code = request.GET.get('code')
    URL = "https://kauth.kakao.com/oauth/token"
    headers = {
        'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
    }
    params = {
        'grant_type' : 'authorization_code',
        'client_id' : config('KAKAO_RESTAPI'),
        'redirect_uri': "http://localhost:8000/api/v1/accounts/kakaologin/callback/",
        'code' : authorization_code,
        'client_secret' : config('KAKAO_CLIENT_SECRET')
    }
    # 토큰 받기
    token_res = requests.post(URL, headers= headers, params=params)

    access_token = token_res.json().get('access_token')

    user_data = requests.get(
        "https://kapi.kakao.com/v2/user/me", 
        headers={
            'Authorization' : "Bearer " + access_token
        })
    
    print(user_data.json())

    return Response(user_data.json(), status=status.HTTP_200_OK)

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
