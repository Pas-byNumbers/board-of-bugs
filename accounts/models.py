from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.


class CustomUserManager(BaseUserManager):

    def _create_user(self, username, email, password, **privileges):
        if username is None:
            raise TypeError('All users must have a username')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **privileges
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **privileges):
        privileges.setdefault("is_superuser", False)
        privileges.setdefault("is_staff", False)

        if email is None:
            raise TypeError('Users must have an email')

        return self._create_user(username, email, password, **privileges)

    def create_superuser(self, username, email, password, **privileges):
        privileges.setdefault("is_superuser", True)
        privileges.setdefault("is_staff", True)

        if password is None:
            raise TypeError('Superusers must have a password')

        return self._create_user(username, email, password, **privileges)
    
class CustomUser(AbstractUser):
    username = models.CharField(
        null=False,
        unique=True,
        max_length=255
        )
    email = models.EmailField(
        blank=True,
        unique=True
    )
    
    objects = CustomUserManager()
    
    def __str__(self):
        return f"{self.id} - {self.username} - {self.email}"
