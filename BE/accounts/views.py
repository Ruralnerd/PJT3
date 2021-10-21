from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
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


@api_view(['POST'])
def login(request):
    pass