from django.http import response, JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import base_user, get_user_model
from django.contrib.auth.hashers import check_password
import random
from requests.api import request

import jwt
from decouple import config
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.settings import api_settings 
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import GetUserSerializer,UserSerializer, UserLoginSerializer, UserListserializer, UserImgserializer, UserMarketSerializer
from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
BASE_URL = "http://k5d201.p.ssafy.io/api/v1/"
# BASE_URL = "http://localhost:8000/api/v1/"

@swagger_auto_schema(
    method='post',
    request_body=UserLoginSerializer,
    responses={
        status.HTTP_404_NOT_FOUND:'존재하지 않는 이메일입니다',
        status.HTTP_401_UNAUTHORIZED:'비밀번호가 잘못되었습니다'
    }
)
@api_view(['POST'])
def login(request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email = email)
    if user:
        user = User.objects.get(email = email)
        if check_password(password, user.password):
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({'id': user.id, 'token': token}, status=status.HTTP_200_OK)

        else:
            return Response({'errors': '비밀번호가 잘못되었습니다'}, status=status.HTTP_401_UNAUTHORIZED) 
    else:
        return Response({'errors': '존재하지 않는 이메일입니다'}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('num', openapi.IN_QUERY, description="list num", type=openapi.TYPE_INTEGER),
    ], 
    responses={status.HTTP_200_OK: UserListserializer(many=True), status.HTTP_400_BAD_REQUEST : "'errors' : 'num값을 잘못입력했습니다.'"}
)
@swagger_auto_schema(method='post', request_body=UserSerializer)
@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'GET':
        users = User.objects.all()
        try:
            count = int(request.GET['num'])
            user_data = []
            for user in users:
                markets = user.markets.all()[:count]
                markets = UserMarketSerializer(markets, many=True).data
                config = {
                    "id" : user.id,
                    "nickname" : user.nickname,
                    "profile_img" : UserImgserializer(user).data.get('profile_img'),
                    "markets" : markets
                }
                user_data.append(config)
            return Response(user_data,status=status.HTTP_200_OK)
        except:
            return Response({'errors' : 'num값을 잘못입력했습니다.'},status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'POST':
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        error_data = {}
        for error in serializer.errors:
            if error == 'email':
                error_data['email'] = '이미 존재하는 email입니다.'
            elif error == 'nickname':
                error_data['nickname'] = '이미 존재하는 nickname입니다.'
            elif error == 'password':
                error_data['password'] = 'password를 입력해주세요.'
        return Response(error_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def kakaologin(request):
    URL = "https://kauth.kakao.com/oauth/authorize"
    client_id = config('KAKAO_RESTAPI')
    redirect_uri = BASE_URL + "accounts/kakao/callback/"
    
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
        'redirect_uri': BASE_URL + "accounts/kakao/callback/",
        'code' : authorization_code,
        'client_secret' : config('KAKAO_CLIENT_SECRET')
    }
    # 토큰 받기
    token_res = requests.post(URL, headers= headers, params=params)

    access_token = token_res.json().get('access_token')
    kakao_data = requests.get(
        "https://kapi.kakao.com/v2/user/me", 
        headers={
            'Authorization' : "Bearer " + access_token
        }
    )
    
    kakao_account = kakao_data.json().get('kakao_account')
    kakao_email = kakao_account.get('email')
    kakao_nickname = kakao_account.get('profile').get('nickname')
    kakao_profile_img = kakao_account.get('profile').get('thumbnail_image_url')
    
    try:
        user = User.objects.get(email = kakao_email)
        if user.provider == 'kakao':
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return JsonResponse({"token" : token}, status=status.HTTP_200_OK)
        return JsonResponse({'errors' : '이미 다른방식으로 가입된 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        user = User.objects.filter(nickname=kakao_nickname)
        while user:
            kakao_nickname = kakao_nickname + f'{random.randrange(1, 99999)}'
            user = User.objects.filter(nickname=kakao_nickname)

        user = User(
                    email = kakao_email,
                    nickname = kakao_nickname,
                    profile_img = kakao_profile_img,
                    provider = 'kakao'
                ).save()
        user = User.objects.get(email = kakao_email)

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return JsonResponse({"id" : user.id, "token" : token}, status=status.HTTP_200_OK)

@api_view(['GET'])
def googlelogin(request):
    URL = "https://accounts.google.com/o/oauth2/v2/auth"
    scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile "
    redirect_uri = BASE_URL + "accounts/google/callback/"
    client_id = config('GOOGLE_CLIENT_ID')
    
    # 인가코드 받기
    return redirect(
        f'{URL}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}'
    )

def googlelogin_callback(request):
    authorization_code = request.GET.get('code')
    URL = "https://oauth2.googleapis.com/token"
    headers = {
        'Host': "oauth2.googleapis.com",
        'Content-Type': "application/x-www-form-urlencoded"
    }
    params = {
        'grant_type' : 'authorization_code',
        'client_id' : config('GOOGLE_CLIENT_ID'),
        'redirect_uri': BASE_URL + "accounts/google/callback/",
        'code' : authorization_code,
        'client_secret' : config('GOOGLE_SECRET_KEY')
    }

    token_res = requests.post(URL, headers= headers, params=params)
    access_token = token_res.json().get('access_token')
    google_data = requests.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        headers={
            'Authorization' : "Bearer " + access_token
        }
    )
    google_email = google_data.json().get('email')
    google_nickname = google_data.json().get('name')
    google_profile_img = google_data.json().get('picture')
    
    try:
        user = User.objects.get(email = google_email)
        if user.provider == 'google':
            token = jwt.encode({"user_id": user.pk, "email":user.email}, config('SECRET_KEY'), algorithm="HS256")
            token = token.decode("utf-8")
            return JsonResponse({"token" : token}, status=status.HTTP_200_OK)
        return JsonResponse({'errors' : '이미 다른방식으로 가입된 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        user = User.objects.filter(nickname=google_nickname)
        while user:
            google_nickname = google_nickname + f'{random.randrange(1, 99999)}'
            user = User.objects.filter(nickname=google_nickname)
        
        user = User(
                    email = google_email,
                    nickname = google_nickname,
                    profile_img = google_profile_img,
                    provider = 'google'
                ).save()
        user = User.objects.get(email = google_email)

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return JsonResponse({"id" : user.id, "token" : token}, status=status.HTTP_200_OK)


@swagger_auto_schema(method='put', request_body=UserSerializer,  responses={status.HTTP_200_OK: UserSerializer})
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def update(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    if request.user == user:
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors.as_data(),status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'errors' : '토큰과 유저정보가 일치하지 않습니다'}, status=status.HTTP_403_FORBIDDEN)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: GetUserSerializer})
@api_view(['GET'])
def user_detail(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    serializer = GetUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: UserSerializer})
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
    new = GetUserSerializer(person)
    return Response(new.data,status=status.HTTP_201_CREATED)
