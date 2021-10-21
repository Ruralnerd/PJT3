from django import forms
from .models import User
# from django.contrib.auth import get_user_model

class UserCreationForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['email', 'nickname', 'password', 'address', 'phone']
