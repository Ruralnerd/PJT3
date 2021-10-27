from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .forms import UserCreationForm

@api_view(['POST'])
def signup(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        user = form.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(form.data, status=status.HTTP_201_CREATED)
    return Response(form.errors.as_data(), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def update(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    context = {
        "pk"          : user_pk,
        "email"       : user.email,
        "nickname"    : user.nickname,
        "phone"       : user.phone,
        "address"     : user.address,
        "profile_img" : user.profile_img,
        "create_at"   : user.create_at,
        "is_seller"   : user.is_seller,
        "id_admin"    : user.is_admin,
    }
    if request.method == 'GET':
        return JsonResponse(context, status=status.HTTP_200_OK)
