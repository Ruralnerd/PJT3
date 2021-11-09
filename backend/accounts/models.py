from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

def profile_image_path(instance, filename):
    return 'accounts/{}/{}'.format(instance.pk, filename)

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
    profile_img  = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(150, 150)],
        format='PNG',
        blank=True,
        default='default_profile.jpeg'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_seller = models.BooleanField(default=False)
    ac_number = models.CharField(max_length=50, null=True)
    ac_bank = models.CharField(max_length=20, null=True)
    is_admin = models.BooleanField(default=False)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followings')
    provider = models.CharField(max_length=50, null=True)

    objects = UserManger()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']



