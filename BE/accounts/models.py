from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class UserManger(BaseUserManager):
    def create_user(self, email, nickname, password=None):

        user = self.model(
            email = self.normalize_email(email),
            nickname = nickname
        )

        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, nickname, password):
        user = self.create_user(
            email,
            password=password,
            nickname=nickname
        )
        user.is_admin = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    nickname = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=20, null=True)
    address = models.TextField(null=True)
    profile_img = models.CharField(
        max_length=200,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_seller = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followings')

    objects = UserManger()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']



